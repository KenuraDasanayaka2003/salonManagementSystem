document.getElementById("provideServicesForm").addEventListener("submit", function(e) {
    
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        employee_id : formData.get("employee_id"),
        service_id : formData.get("service_id")
    };

    fetch("provideServices.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.text())
    .then(alert);

    if(Response.toLowerCase().includes("success"))
    {
        this.reset();
    }
});

function getProvideServices()
{
    fetch("provideServices.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("provideServicesList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No providing services found";
        }
        else
        {
            data.forEach(providedService => {
                listDiv.innerHTML += 
                    `<div class="provideService_card">
                        <div class="employee_id">${providedService.employee_id}</div>
                        <p>Employee Name : ${providedService.employee_name}</p>
                        <p>Service ID: ${providedService.service_id}</p>
                        <p>Service Name : ${providedService.service_name}</p>
                    </div>`
            })
        }
    }

    )
}

