def allocate_seats(students, rooms, seats_per_room):

    students = sorted(
        students,
        key=lambda student: student["department"]
    )

    total_seats = rooms * seats_per_room

    if len(students) > total_seats:
        return None

    allocation = []

    for index, student in enumerate(students):

        room_number = (index // seats_per_room) + 101

        seat_number = (index % seats_per_room) + 1

        allocation.append({
            "student_id": student["student_id"],
            "name": student["name"],
            "department": student["department"],
            "year": student["year"],
            "room": room_number,
            "seat": seat_number
        })

    return allocation