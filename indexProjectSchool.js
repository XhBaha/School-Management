let students = [];
let editIndex = -1;

function createRecord() {
    const id = document.getElementById('stdID').value;
    const name = document.getElementById('stdName').value;
    const studentClass = document.getElementById('stdClass').value;
    const cgpa = document.getElementById('stdCGPA').value;

    if (id && name && studentClass && cgpa) {
        if (editIndex === -1) {
            // Create new record
            students.push({ id, name, studentClass, cgpa });
            document.getElementById('msg').innerText = 'Record created successfully!';
        } else {
            // Update existing record
            students[editIndex] = { id, name, studentClass, cgpa };
            document.getElementById('msg').innerText = 'Record updated successfully!';
            editIndex = -1;
        }
        clearForm();
        readRecord();
    } else {
        document.getElementById('msg').innerText = 'Please fill all fields!';
    }
}

function readRecord() {
    const tableBody = document.querySelector('#readTable tbody');
    tableBody.innerHTML = '';

    if (students.length > 0) {
        students.forEach((student, index) => {
            const row = `<tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editRecord(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="5">No Record Found</td></tr>';
    }
}

function editRecord(index) {
    const student = students[index];
    document.getElementById('stdID').value = student.id;
    document.getElementById('stdName').value = student.name;
    document.getElementById('stdClass').value = student.studentClass;
    document.getElementById('stdCGPA').value = student.cgpa;

    // Set the edit index to the current index
    editIndex = index;
}

function deleteRecord(index) {
    students.splice(index, 1);
    document.getElementById('msg').innerText = 'Record deleted successfully!';
    readRecord();
}

function searchRecord() {
    const searchID = document.getElementById('searchID').value;
    const tableBody = document.querySelector('#readTable tbody');
    tableBody.innerHTML = '';

    const filteredStudents = students.filter(student => student.id.includes(searchID));

    if (filteredStudents.length > 0) {
        filteredStudents.forEach((student, index) => {
            const row = `<tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.studentClass}</td>
                <td>${student.cgpa}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editRecord(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteRecord(${index})">Delete</button>
                </td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    } else {
        tableBody.innerHTML = '<tr><td colspan="5">No Record Found</td></tr>';
    }
}

function clearForm() {
    document.getElementById('stdID').value = '';
    document.getElementById('stdName').value = '';
    document.getElementById('stdClass').value = '';
    document.getElementById('stdCGPA').value = '';
    editIndex = -1;
}