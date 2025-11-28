const API = "https://backend02-nqu8.onrender.com";

// Fetch and display employees
async function loadEmployees() {
  const res = await fetch(API);
  const data = await res.json();

  const table = document.getElementById("employeeTable");
  table.innerHTML = "";

  data.forEach(emp => {
    table.innerHTML += `
      <tr>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
        <td>${emp.salary}</td>
        <td>
          <button onclick="deleteEmployee('${emp._id}')">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Add employee
async function addEmployee() {
  const name = document.getElementById("name").value;
  const position = document.getElementById("position").value;
  const salary = document.getElementById("salary").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, position, salary })
  });

  loadEmployees();
}

// Delete employee
async function deleteEmployee(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadEmployees();
}

// Load employees on page load
loadEmployees();
