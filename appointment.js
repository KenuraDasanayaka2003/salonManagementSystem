// ADD
document.getElementById("appointmentForm").addEventListener("submit", function(e) {
    
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
        app_id: formData.get("appointment_id"),
        cus_id: formData.get("customer_id"),
        ser_id: formData.get("service_id"),
        app_date: formData.get("appointment_date"),
        app_time: formData.get("appointment_time")
    };
        if (document.getElementById("appointment_id").value.trim() === "") 
        {
            alert("Appointment ID cannot be empty");
            return false;
        }

        if (document.getElementById("customer_id").value.trim() === "") 
        {
            alert("Customer ID cannot be empty");
            return false;
        }

        if (document.getElementById("service_id").value.trim() === "") 
        {
            alert("Service ID cannot be empty");
            return false;
        }




    fetch("appointments.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(alert);
});

document.addEventListener("DOMContentLoaded", loadServices);

function loadServices() {
    fetch("service.php")
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("service_id");
            select.innerHTML = '<option value="">-- Select a Service --</option>';

            data.forEach(service => {
                const option = document.createElement("option");
                option.value = service.service_id;
                option.textContent = service.service_name;
                select.appendChild(option);
            });
        })
        .catch(err => alert("Error loading services"));
}

document.getElementById("removeButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id= document.getElementById("appointment_id").value;

    if(!id)
    {
        alert("Please Enter appointment ID !!!");
        return;
    }

    fetch("appointments.php",{
        method : "DELETE",
        headers : { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(res=>res.text())
    .then(alert);
});

document.getElementById("updateButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const form = document.getElementById("appointmentForm");
    const formData = new FormData(form);
    const data = 
    {
        app_id: formData.get("appointment_id"),
        cus_id: formData.get("customer_id"),
        ser_id: formData.get("service_id"),
        app_date: formData.get("appointment_date"),
        app_time: formData.get("appointment_time")
    };

    fetch("appointments.php", {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
 
    })
    .then(res => res.text())
    .then(alert);
});

document.getElementById("searchCustomerButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id = document.getElementById("customer_id").value;

    if (!id) 
    {
        alert("Please enter customer ID !!!");
        return;
    }

    fetch(`appointments.php?customer_id=${encodeURIComponent(id)}`)
  .then(res => res.json())
  .then(data => {

    const tbody = document.querySelector("#appointmentCustomerTable tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No appointments found</td></tr>`;
        return;
    }

    data.forEach(app => {
        tbody.innerHTML += `
          <tr>
            <td>${app.appointment_id}</td>
            <td>${app.service_name}</td>
            <td>${app.appointment_date}</td>
            <td>${app.appointment_time}</td>
          </tr>
        `;
    });
});
});

document.getElementById("searchAppointmentButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id = document.getElementById("appointment_id").value;

    if (!id) 
    {
        alert("Please enter customer ID !!!");
        return;
    }

    fetch(`appointments.php?appointment_id=${encodeURIComponent(id)}`)
  .then(res => res.json())
  .then(data => {

    const tbody = document.querySelector("#appointmentTable tbody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4">No appointments found</td></tr>`;
        return;
    }

    data.forEach(app => {
        tbody.innerHTML += `
          <tr>
            <td>${app.customer_name}</td>
            <td>${app.service_name}</td>
            <td>${app.appointment_date}</td>
            <td>${app.appointment_time}</td>
          </tr>
        `;
    });
});
});

function getAppointments()
{
    fetch("appointments.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("appointmentList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Appointments found";
        }
        else
        {
            data.forEach(appointment => {
                listDiv.innerHTML += 
                    `<div class="appointment_card">
                        <div class="appointment_id">${appointment.appointment_id}</div>
                        <h3>${appointment.customer_name}</h3>
                        <p>Service : ${appointment.service_name}</p>
                        <p>Appointment Date : ${appointment.appointment_date}</p>
                        <p>Appointment Time : ${appointment.appointment_time}</p>
                    </div>`
            })
        }
    }

    )
}


