interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  location: string;
  parentName: string;
  parentPhone: string;
}

let students: Student[] = [];
let studentIdCounter = 1;

document.getElementById("studentForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const age = parseInt((document.getElementById("age") as HTMLInputElement).value);
  const location = (document.getElementById("location") as HTMLInputElement).value;
  const parentName = (document.getElementById("parentName") as HTMLInputElement).value;
  const parentPhone = (document.getElementById("parentPhone") as HTMLInputElement).value;

  const newStudent: Student = {
    id: studentIdCounter++,
    name,
    email,
    age,
    location,
    parentName,
    parentPhone
  };

  students.push(newStudent);
  renderStudentTable();
  clearForm();
});

function renderStudentTable() {
  const tableBody = document.getElementById("studentTableBody")!;
  tableBody.innerHTML = "";
  students.forEach(student => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.age}</td>
      <td>${student.location}</td>
      <td>${student.parentName}</td>
      <td>${student.parentPhone}</td>
      <td>
        <button class="btn btn-info btn-sm" onclick="editStudent(${student.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="confirmDelete(${student.id})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editStudent(id: number) {
  const student = students.find(s => s.id === id);
  if (student) {
    (document.getElementById("name") as HTMLInputElement).value = student.name;
    (document.getElementById("email") as HTMLInputElement).value = student.email;
    (document.getElementById("age") as HTMLInputElement).value = student.age.toString();
    (document.getElementById("location") as HTMLInputElement).value = student.location;
    (document.getElementById("parentName") as HTMLInputElement).value = student.parentName;
    (document.getElementById("parentPhone") as HTMLInputElement).value = student.parentPhone;

    const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
    saveBtn.innerText = "Update Student";
    saveBtn.onclick = function () {
      updateStudent(id);
    };
  }
}

function updateStudent(id: number) {
  const student = students.find(s => s.id === id);
  if (student) {
    student.name = (document.getElementById("name") as HTMLInputElement).value;
    student.email = (document.getElementById("email") as HTMLInputElement).value;
    student.age = parseInt((document.getElementById("age") as HTMLInputElement).value);
    student.location = (document.getElementById("location") as HTMLInputElement).value;
    student.parentName = (document.getElementById("parentName") as HTMLInputElement).value;
    student.parentPhone = (document.getElementById("parentPhone") as HTMLInputElement).value;
  }

  renderStudentTable();
  clearForm();
}

function deleteStudent(id: number) {
  students = students.filter(student => student.id !== id);
  renderStudentTable();
}

function clearForm() {
  (document.getElementById("name") as HTMLInputElement).value = "";
  (document.getElementById("email") as HTMLInputElement).value = "";
  (document.getElementById("age") as HTMLInputElement).value = "";
  (document.getElementById("location") as HTMLInputElement).value = "";
  (document.getElementById("parentName") as HTMLInputElement).value = "";
  (document.getElementById("parentPhone") as HTMLInputElement).value = "";
  
  const saveBtn = document.getElementById("saveBtn") as HTMLButtonElement;
  saveBtn.innerText = "Add Student";
}
