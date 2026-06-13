let employees =
JSON.parse(localStorage.getItem("employees")) || [];

let editId = null;

const container =
document.getElementById("employeeContainer");

function updateDashboard(){

    document.getElementById(
    "totalEmployees"
    ).innerText = employees.length;

    document.getElementById(
    "activeEmployees"
    ).innerText = employees.length;

    const departments =
    [...new Set(
    employees.map(
    emp => emp.department
    ))];

    document.getElementById(
    "totalDepartments"
    ).innerText =
    departments.length;
}

function displayEmployees(data){

    container.innerHTML = "";

    if(data.length === 0){

        container.innerHTML =
        "<h2>No Employees Found</h2>";

        updateDashboard();
        return;
    }

    data.forEach(emp => {

        container.innerHTML += `

        <div class="card">

            <div class="avatar">👤</div>

            <h3>${emp.name}</h3>

            <p><strong>ID:</strong> ${emp.id}</p>

            <p><strong>Department:</strong> ${emp.department}</p>

            <p><strong>Email:</strong> ${emp.email}</p>

            <button
            class="edit-btn"
            onclick="editEmployee('${emp.id}')">
            Edit
            </button>

            <button
            class="delete-btn"
            onclick="deleteEmployee('${emp.id}')">
            Delete
            </button>

        </div>

        `;
    });

    updateDashboard();
}

function addEmployee(){

    const name =
    document.getElementById("empName").value;

    const department =
    document.getElementById("empDept").value;

    const email =
    document.getElementById("empEmail").value;

    if(
    name === "" ||
    department === "" ||
    email === ""
    ){
        alert("Please fill all fields");
        return;
    }

    if(editId){

        employees =
        employees.map(emp => {

            if(emp.id === editId){

                return {
                    ...emp,
                    name,
                    department,
                    email
                };
            }

            return emp;
        });

        editId = null;

    }else{

        const newEmployee = {

            id:
            "EMP" + Date.now(),

            name,

            department,

            email
        };

        employees.push(newEmployee);
    }

    localStorage.setItem(
    "employees",
    JSON.stringify(employees)
    );

    displayEmployees(employees);

    document.getElementById("empName").value = "";
    document.getElementById("empDept").value = "";
    document.getElementById("empEmail").value = "";
}

function editEmployee(id){

    const employee =
    employees.find(
    emp => emp.id === id
    );

    document.getElementById(
    "empName"
    ).value =
    employee.name;

    document.getElementById(
    "empDept"
    ).value =
    employee.department;

    document.getElementById(
    "empEmail"
    ).value =
    employee.email;

    editId = id;
}

function deleteEmployee(id){

    employees =
    employees.filter(
    emp => emp.id !== id
    );

    localStorage.setItem(
    "employees",
    JSON.stringify(employees)
    );

    displayEmployees(employees);
}

document.getElementById(
"searchInput"
).addEventListener(
"keyup",
function(){

    const value =
    this.value.toLowerCase();

    const filtered =
    employees.filter(emp =>
    emp.name
    .toLowerCase()
    .includes(value)
    );

    displayEmployees(filtered);
});

displayEmployees(employees);