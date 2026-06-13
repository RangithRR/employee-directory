const defaultEmployees = [
{
id:"EMP001",
name:"John",
department:"HR",
email:"[john@gmail.com](mailto:john@gmail.com)"
},
{
id:"EMP002",
name:"Alice",
department:"IT",
email:"[alice@gmail.com](mailto:alice@gmail.com)"
},
{
id:"EMP003",
name:"David",
department:"Finance",
email:"[david@gmail.com](mailto:david@gmail.com)"
},
{
id:"EMP004",
name:"Sophia",
department:"Marketing",
email:"[sophia@gmail.com](mailto:sophia@gmail.com)"
}
];

let employees =
JSON.parse(localStorage.getItem("employees"));

if(!employees || employees.length === 0){
employees = defaultEmployees;
localStorage.setItem(
"employees",
JSON.stringify(employees)
);
}

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
)
)];

document.getElementById(
"totalDepartments"
).innerText =
departments.length;

}

function displayEmployees(data){

container.innerHTML = "";

data.forEach(emp => {

container.innerHTML += `

<div class="card">

<div class="avatar">👤</div>

<h3>${emp.name}</h3>

<p><strong>ID:</strong> ${emp.id}</p>

<p><strong>Department:</strong> ${emp.department}</p>

<p><strong>Email:</strong> ${emp.email}</p>

<button
class="delete-btn"
onclick="deleteEmployee('${emp.id}')">
Delete </button>

</div>

`;

});

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

const newEmployee = {

id:
"EMP" +
String(employees.length + 1)
.padStart(3,"0"),

name:name,

department:department,

email:email

};

employees.push(newEmployee);

localStorage.setItem(
"employees",
JSON.stringify(employees)
);

displayEmployees(employees);
updateDashboard();

document.getElementById(
"empName"
).value="";

document.getElementById(
"empDept"
).value="";

document.getElementById(
"empEmail"
).value="";

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
updateDashboard();

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
updateDashboard();
