document.getElementById("takenServicesForm").addEventListener("submit", function(e) {
    
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        customer_id : formData.get("customer_id"),
        service_id : formData.get("service_id")
    };

    fetch("takeServices.php", {
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

function getTakenServices()
{
    fetch("productPurchases.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("takenServicesList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No taken services found";
        }
        else
        {
            data.forEach(takenService => {
                listDiv.innerHTML += 
                    `<div class="takenService_card">
                        <div class="customer_id">${takenService.customer_id}</div>
                        <p>Customer Name : ${takenService.customer_name}</p>
                        <p>Service ID: ${takenService.service_id}</p>
                        <p>Product : ${takenService.service_name}</p>
                    </div>`
            })
        }
    }

    )
}

