document.getElementById("serviceForm").addEventListener("submit",function(e)
{
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        id : formData.get("service_id"),
        name : formData.get("service_name"),
        charge : formData.get("service_charge")
    }

        if (document.getElementById("service_id").value.trim() === "") 
        {
            alert("Service ID cannot be empty");
            return false;
        }

        if (document.getElementById("service_name").value.trim() === "") 
        {
            alert("Service name cannot be empty");
            return false;
        }



    fetch("service.php",{
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
    const id= document.getElementById("service_id").value;

    if(!id)
    {
        alert("Please Enter service ID !!!");
        return;
    }

    fetch("service.php",{
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
    const form = document.getElementById("serviceForm");
    const formData = new FormData(form);
    const data = 
    {
        id : formData.get("service_id"),
        name : formData.get("service_name"),
        charge : formData.get("service_charge")
    };

    fetch("service.php", {
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
    const id = document.getElementById("service_id").value;

    if (!id) 
    {
        alert("Please enter Service ID !!!");
        return;
    }

    fetch(`service.php?service_id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data=>
    {
        if(data.status == "success")
        {
            document.getElementById("service_name").value = data.service.service_name;
            document.getElementById("service_charge").value = data.service.service_charge;
        }
        else
        {
            alert(data.message);
        }
    })
});

function getServices()
{
    fetch("service.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("serviceList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Services found";
        }
        else
        {
            data.forEach(service => {
                listDiv.innerHTML += 
                    `<div class="service_card">
                        <div class="service_id">${service.service_id}</div>
                        <h3>${service.service_name}</h3>
                        <p>Contact : ${service.service_charge}</p>
                    </div>`
            })
        }
    }

    )
}