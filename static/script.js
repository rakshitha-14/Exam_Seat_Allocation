function showToast(message, type = "success") {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.className = "toast show " + type;

    setTimeout(() => {
        toast.className = "toast";
    }, 3000);
}


function toggleSidebar() {

    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.toggle("open");
    }
}


async function loadDashboardStats() {

    try {

        const response = await fetch("/api/stats");

        const data = await response.json();

        if (!data.success) {
            return;
        }

        const totalStudents =
            document.getElementById("totalStudents");

        const totalRooms =
            document.getElementById("totalRooms");

        const totalSeats =
            document.getElementById("totalSeats");

        const allocatedStudents =
            document.getElementById("allocatedStudents");


        if (totalStudents) {
            totalStudents.textContent =
                data.total_students;
        }

        if (totalRooms) {
            totalRooms.textContent =
                data.total_rooms;
        }

        if (totalSeats) {
            totalSeats.textContent =
                data.total_seats;
        }

        if (allocatedStudents) {
            allocatedStudents.textContent =
                data.allocated;
        }

    } catch (error) {

        console.error(error);

    }
}


async function addStudent(event) {

    event.preventDefault();

    const studentId =
        document.getElementById("studentId").value.trim();

    const name =
        document.getElementById("studentName").value.trim();

    const department =
        document.getElementById("department").value;

    const year =
        document.getElementById("year").value;


    try {

        const response = await fetch("/api/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                student_id: studentId,
                name: name,
                department: department,
                year: year
            })

        });


        const data = await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        showToast(
            "Student added successfully."
        );


        document
            .getElementById("studentForm")
            .reset();


        loadStudents();

    } catch (error) {

        showToast(
            "Unable to connect to server.",
            "error"
        );

    }
}


async function loadStudents() {

    const tableBody =
        document.getElementById("studentTableBody");

    if (!tableBody) {
        return;
    }


    try {

        const response =
            await fetch("/api/students");

        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        tableBody.innerHTML = "";


        if (data.students.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="empty-state">
                        <i class="fa-solid fa-users"></i>
                        <span>No students registered yet.</span>
                    </td>
                </tr>
            `;

        } else {

            data.students.forEach(student => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        <span class="id-badge">
                            ${student.student_id}
                        </span>
                    </td>

                    <td>
                        <strong>
                            ${student.name}
                        </strong>
                    </td>

                    <td>
                        <span class="department-badge">
                            ${student.department}
                        </span>
                    </td>

                    <td>
                        Year ${student.year}
                    </td>

                    <td>

                        <button
                            class="icon-danger"
                            onclick="deleteStudent('${student.student_id}')">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </td>
                `;

                tableBody.appendChild(row);

            });

        }


        const countText =
            document.getElementById("studentCountText");


        if (countText) {

            countText.textContent =
                `${data.students.length} student(s) registered`;

        }

    } catch (error) {

        console.error(error);

    }
}


async function deleteStudent(studentId) {

    const confirmed =
        confirm(
            `Delete student ${studentId}?`
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/students/${encodeURIComponent(studentId)}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        showToast(
            "Student deleted successfully."
        );


        loadStudents();

    } catch (error) {

        showToast(
            "Unable to delete student.",
            "error"
        );

    }
}


function calculateCapacity() {

    const rooms =
        parseInt(
            document.getElementById("rooms").value
        ) || 0;


    const seats =
        parseInt(
            document.getElementById("seatsPerRoom").value
        ) || 0;


    const capacity =
        rooms * seats;


    const capacityValue =
        document.getElementById("capacityValue");


    if (capacityValue) {

        capacityValue.textContent =
            capacity;

    }
}


async function loadRoomSettings() {

    try {

        const response =
            await fetch("/api/rooms");

        const data =
            await response.json();


        if (!data.success) {
            return;
        }


        const settings =
            data.settings;


        const rooms =
            document.getElementById("rooms");

        const seats =
            document.getElementById("seatsPerRoom");


        if (rooms) {
            rooms.value =
                settings.rooms || "";
        }

        if (seats) {
            seats.value =
                settings.seats_per_room || "";
        }


        calculateCapacity();

    } catch (error) {

        console.error(error);

    }
}


async function saveRoomSettings(event) {

    event.preventDefault();


    const rooms =
        parseInt(
            document.getElementById("rooms").value
        );


    const seatsPerRoom =
        parseInt(
            document.getElementById("seatsPerRoom").value
        );


    try {

        const response =
            await fetch("/api/rooms", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    rooms: rooms,
                    seats_per_room: seatsPerRoom
                })

            });


        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        showToast(
            "Room configuration saved successfully."
        );


        calculateCapacity();

    } catch (error) {

        showToast(
            "Unable to save room settings.",
            "error"
        );

    }
}


async function loadAllocationSetup() {

    try {

        const settingsResponse =
            await fetch("/api/rooms");

        const settingsData =
            await settingsResponse.json();


        const studentsResponse =
            await fetch("/api/students");

        const studentsData =
            await studentsResponse.json();


        if (
            !settingsData.success ||
            !studentsData.success
        ) {
            return;
        }


        const settings =
            settingsData.settings;


        const rooms =
            settings.rooms || 0;

        const seats =
            settings.seats_per_room || 0;

        const capacity =
            settings.total_seats ||
            rooms * seats;

        const students =
            studentsData.students.length;


        setText(
            "allocationRooms",
            rooms
        );

        setText(
            "allocationSeats",
            seats
        );

        setText(
            "allocationCapacity",
            capacity
        );

        setText(
            "allocationStudents",
            students
        );


    } catch (error) {

        console.error(error);

    }
}


async function runAllocation() {

    try {

        const response =
            await fetch("/api/allocate", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({})
            });


        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        showToast(
            "Seats allocated successfully."
        );


        displayAllocation(
            data.allocation
        );


        const message =
            document.getElementById(
                "allocationMessage"
            );


        if (message) {

            message.textContent =
                `${data.allocation.length} students have been assigned seats.`;

        }


    } catch (error) {

        showToast(
            "Unable to generate allocation.",
            "error"
        );

    }
}


function displayAllocation(allocation) {

    const tableBody =
        document.getElementById(
            "allocationTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    allocation.forEach(student => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <span class="id-badge">
                    ${student.student_id}
                </span>
            </td>

            <td>
                <strong>
                    ${student.name}
                </strong>
            </td>

            <td>
                <span class="department-badge">
                    ${student.department}
                </span>
            </td>

            <td>
                Year ${student.year}
            </td>

            <td>
                <span class="room-badge">
                    Room ${student.room}
                </span>
            </td>

            <td>
                <span class="seat-badge">
                    Seat ${student.seat}
                </span>
            </td>

        `;

        tableBody.appendChild(row);

    });
}


async function searchStudent() {

    const input =
        document.getElementById(
            "searchStudentId"
        );


    const result =
        document.getElementById(
            "searchResult"
        );


    if (!input || !result) {
        return;
    }


    const studentId =
        input.value.trim();


    if (!studentId) {

        showToast(
            "Enter a student ID.",
            "error"
        );

        return;
    }


    try {

        const response =
            await fetch(
                `/api/search?student_id=${encodeURIComponent(studentId)}`
            );


        const data =
            await response.json();


        if (!data.success) {

            result.innerHTML = `

                <div class="search-error">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <div>

                        <strong>
                            Student not found
                        </strong>

                        <span>
                            ${data.message}
                        </span>

                    </div>

                </div>

            `;

            return;
        }


        const student =
            data.student;


        result.innerHTML = `

            <div class="student-seat-result">

                <div class="result-avatar">

                    <i class="fa-solid fa-user-graduate"></i>

                </div>


                <div class="result-main">

                    <span class="result-label">
                        SEAT ALLOCATION
                    </span>

                    <h3>
                        ${student.name}
                    </h3>

                    <p>
                        ${student.student_id}
                        ·
                        ${student.department}
                    </p>

                </div>


                <div class="seat-result">

                    <span>ROOM</span>

                    <strong>
                        ${student.room}
                    </strong>

                </div>


                <div class="seat-result">

                    <span>SEAT</span>

                    <strong>
                        ${student.seat}
                    </strong>

                </div>

            </div>

        `;

    } catch (error) {

        showToast(
            "Unable to search student.",
            "error"
        );

    }
}


async function loadResults() {

    const tableBody =
        document.getElementById(
            "resultsTableBody"
        );


    if (!tableBody) {
        return;
    }


    try {

        const response =
            await fetch("/api/allocations");

        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        tableBody.innerHTML = "";


        if (data.allocations.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="empty-state">

                        <i class="fa-solid fa-chair"></i>

                        <span>
                            No seat allocations available.
                        </span>

                    </td>

                </tr>

            `;

        } else {

            data.allocations.forEach(student => {

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        <span class="id-badge">
                            ${student.student_id}
                        </span>
                    </td>

                    <td>
                        <strong>
                            ${student.name}
                        </strong>
                    </td>

                    <td>
                        <span class="department-badge">
                            ${student.department}
                        </span>
                    </td>

                    <td>
                        Year ${student.year}
                    </td>

                    <td>
                        <span class="room-badge">
                            Room ${student.room}
                        </span>
                    </td>

                    <td>
                        <span class="seat-badge">
                            Seat ${student.seat}
                        </span>
                    </td>

                `;

                tableBody.appendChild(row);

            });

        }


        const count =
            document.getElementById(
                "resultsCount"
            );


        if (count) {

            count.textContent =
                `${data.allocations.length} seat allocation(s)`;

        }

    } catch (error) {

        console.error(error);

    }
}


async function clearData() {

    const confirmed =
        confirm(
            "Are you sure you want to delete all student and allocation data?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch("/api/clear", {

                method: "POST"

            });


        const data =
            await response.json();


        if (!data.success) {

            showToast(
                data.message,
                "error"
            );

            return;
        }


        showToast(
            "Student and allocation data cleared."
        );


        loadResults();

    } catch (error) {

        showToast(
            "Unable to clear data.",
            "error"
        );

    }
}


function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value;

    }
}


document.addEventListener(
    "click",
    function(event) {

        const sidebar =
            document.getElementById("sidebar");

        const menuButton =
            document.querySelector(".menu-button");


        if (
            window.innerWidth <= 900 &&
            sidebar &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {

            sidebar.classList.remove("open");

        }

    }
);