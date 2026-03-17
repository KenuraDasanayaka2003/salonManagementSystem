document.getElementById("staffForm").addEventListener("submit",function(e)
{
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        id : formData.get("employee_id"),
        name : formData.get("employee_name"),
        contact : formData.get("contact"),
        position : formData.get("position")
    };

    fetch("staff.php",{
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(alert);
});

document.getElementById("removeButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id= document.getElementById("employee_id").value;

    if(!id)
    {
        alert("Please Enter employee ID !!!");
        return;
    }

    fetch("staff.php",{
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
    const form = document.getElementById("staffForm");
    const formData = new FormData(form);
    const data = 
    {
        id : formData.get("employee_id"),
        name : formData.get("employee_name"),
        contact : formData.get("contact"),
        position : formData.get("position")
    };

    fetch("staff.php", {
        method : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
 
    })
    .then(res => res.text())
    .then(alert);
});

document.getElementById("searchButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id = document.getElementById("employee_id").value;

    if (!id) 
    {
        alert("Please enter Employee ID !!!");
        return;
    }

    fetch(`staff.php?employee_id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data=>
    {
        if(data.status == "success")
        {
            document.getElementById("employee_name").value = data.staff_member.employee_name;
            document.getElementById("contact").value = data.staff_member.employee_contact;
            document.getElementById("position").value = data.staff_member.position;
        }
        else
        {
            alert(data.message);
        }
    })
});

function getEmployees()
{
    fetch("staff.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("staffList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Employees found";
        }
        else
        {
            data.forEach(employee => {
                listDiv.innerHTML += 
                    `<div class="employee_card">
                        <div class="employee_id">${employee.employee_id}</div>
                        <h3>${employee.employee_name}</h3>
                        <p>Contact : ${employee.employee_contact}</p>
                        <p>Position : ${employee.position}</p>
                    </div>`
            })
        }
    }

    )
}
