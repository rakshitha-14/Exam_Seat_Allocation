from flask import Flask, render_template, request, jsonify
from firebase_config import db
from allocation import allocate_seats

app = Flask(__name__)


@app.route("/")
def dashboard():
    return render_template("dashboard.html")


@app.route("/students")
def students_page():
    return render_template("students.html")


@app.route("/rooms")
def rooms_page():
    return render_template("rooms.html")


@app.route("/allocation")
def allocation_page():
    return render_template("allocation.html")


@app.route("/search")
def search_page():
    return render_template("search.html")


@app.route("/results")
def results_page():
    return render_template("results.html")


@app.route("/api/students", methods=["GET"])
def get_students():
    try:
        students = []

        student_docs = db.collection("students").stream()

        for document in student_docs:
            student = document.to_dict()
            students.append(student)

        students.sort(key=lambda x: x.get("student_id", ""))

        return jsonify({
            "success": True,
            "students": students
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/students", methods=["POST"])
def add_student():
    try:
        data = request.get_json()

        student_id = data.get("student_id", "").strip()
        name = data.get("name", "").strip()
        department = data.get("department", "").strip()
        year = data.get("year", "").strip()

        if not student_id or not name or not department or not year:
            return jsonify({
                "success": False,
                "message": "Please fill all fields."
            }), 400

        student_ref = db.collection("students").document(student_id)
        existing_student = student_ref.get()

        if existing_student.exists:
            return jsonify({
                "success": False,
                "message": "Student ID already exists."
            }), 400

        student_data = {
            "student_id": student_id,
            "name": name,
            "department": department,
            "year": year
        }

        student_ref.set(student_data)

        return jsonify({
            "success": True,
            "message": "Student added successfully.",
            "student": student_data
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/students/<student_id>", methods=["DELETE"])
def delete_student(student_id):
    try:
        student_ref = db.collection("students").document(student_id)
        student = student_ref.get()

        if not student.exists:
            return jsonify({
                "success": False,
                "message": "Student not found."
            }), 404

        student_ref.delete()

        allocation_ref = db.collection("allocations").document(student_id)
        allocation = allocation_ref.get()

        if allocation.exists:
            allocation_ref.delete()

        return jsonify({
            "success": True,
            "message": "Student deleted successfully."
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/rooms", methods=["GET"])
def get_rooms():
    try:
        settings_ref = db.collection("settings").document("exam")
        document = settings_ref.get()

        if document.exists:
            return jsonify({
                "success": True,
                "settings": document.to_dict()
            })

        return jsonify({
            "success": True,
            "settings": {
                "rooms": 0,
                "seats_per_room": 0
            }
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/rooms", methods=["POST"])
def save_rooms():
    try:
        data = request.get_json()

        rooms = int(data.get("rooms", 0))
        seats_per_room = int(data.get("seats_per_room", 0))

        if rooms <= 0 or seats_per_room <= 0:
            return jsonify({
                "success": False,
                "message": "Enter valid room and seat values."
            }), 400

        settings = {
            "rooms": rooms,
            "seats_per_room": seats_per_room,
            "total_seats": rooms * seats_per_room
        }

        db.collection("settings").document("exam").set(settings)

        return jsonify({
            "success": True,
            "message": "Room settings saved successfully.",
            "settings": settings
        })

    except ValueError:
        return jsonify({
            "success": False,
            "message": "Please enter valid numbers."
        }), 400

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/allocate", methods=["POST"])
def allocate():
    try:
        settings_ref = db.collection("settings").document("exam")
        settings_document = settings_ref.get()

        if not settings_document.exists:
            return jsonify({
                "success": False,
                "message": "Please configure rooms first."
            }), 400

        settings = settings_document.to_dict()

        rooms = int(settings.get("rooms", 0))
        seats_per_room = int(settings.get("seats_per_room", 0))

        student_docs = db.collection("students").stream()

        students = []

        for document in student_docs:
            students.append(document.to_dict())

        if len(students) == 0:
            return jsonify({
                "success": False,
                "message": "Please add students first."
            }), 400

        allocation = allocate_seats(
            students,
            rooms,
            seats_per_room
        )

        if allocation is None:
            return jsonify({
                "success": False,
                "message": "Not enough seats for all students."
            }), 400

        allocation_collection = db.collection("allocations")

        old_allocations = allocation_collection.stream()

        for document in old_allocations:
            document.reference.delete()

        for student in allocation:
            allocation_collection \
                .document(student["student_id"]) \
                .set(student)

        return jsonify({
            "success": True,
            "message": "Seats allocated successfully.",
            "allocation": allocation
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/allocations", methods=["GET"])
def get_allocations():
    try:
        allocations = []

        allocation_docs = db.collection("allocations").stream()

        for document in allocation_docs:
            allocations.append(document.to_dict())

        allocations.sort(
            key=lambda x: (
                int(x.get("room", 0)),
                int(x.get("seat", 0))
            )
        )

        return jsonify({
            "success": True,
            "allocations": allocations
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/search", methods=["GET"])
def search_student():
    try:
        student_id = request.args.get("student_id", "").strip()

        if not student_id:
            return jsonify({
                "success": False,
                "message": "Enter a student ID."
            }), 400

        student_ref = db.collection("allocations").document(student_id)
        document = student_ref.get()

        if document.exists:
            return jsonify({
                "success": True,
                "student": document.to_dict()
            })

        return jsonify({
            "success": False,
            "message": "No seat allocation found for this student."
        }), 404

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/stats", methods=["GET"])
def get_stats():
    try:
        students = list(db.collection("students").stream())
        allocations = list(db.collection("allocations").stream())

        settings_ref = db.collection("settings").document("exam")
        settings_document = settings_ref.get()

        rooms = 0
        total_seats = 0

        if settings_document.exists:
            settings = settings_document.to_dict()
            rooms = int(settings.get("rooms", 0))
            total_seats = int(settings.get("total_seats", 0))

        return jsonify({
            "success": True,
            "total_students": len(students),
            "total_rooms": rooms,
            "total_seats": total_seats,
            "allocated": len(allocations)
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


@app.route("/api/clear", methods=["POST"])
def clear_data():
    try:
        students = db.collection("students").stream()

        for student in students:
            student.reference.delete()

        allocations = db.collection("allocations").stream()

        for allocation in allocations:
            allocation.reference.delete()

        return jsonify({
            "success": True,
            "message": "Student and allocation data cleared."
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "message": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)

if __name__ == "__main__":
    import os
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))    