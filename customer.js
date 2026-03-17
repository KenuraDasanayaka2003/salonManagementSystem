document.getElementById("customerForm").addEventListener("submit", function(e) {
    
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        id : formData.get("customer_id"),
        name : formData.get("customer_name"),
        email : formData.get("customer_email"),
        contact : formData.get("contact_no")
    };
    
    if (document.getElementById("customer_id").value.trim() === "") 
        {
            alert("Customer id cannot be empty");
            return false;
        }

    
    if (document.getElementById("customer_name").value.trim() === "") 
        {
            alert("Customer name cannot be empty");
            return false;
        }

    fetch("customer.php", {
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

document.getElementById("removeButton").addEventListener("click",function(e)
{
    e.preventDefault();
    const id= document.getElementById("customer_id").value;

    if(!id)
    {
        alert("Please Enter customer ID !!!");
        return;
    }

    fetch("customer.php",{
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
    const form = document.getElementById("customerForm");
    const formData = new FormData(form);
    const data = 
    {
        id : formData.get("customer_id"),
        name : formData.get("customer_name"),
        email : formData.get("customer_email"),
        contact : formData.get("contact_no")
    };

    fetch("customer.php", {
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
    const id = document.getElementById("customer_id").value;

    if (!id) 
    {
        alert("Please enter Customer ID !!!");
        return;
    }

    fetch(`customer.php?customer_id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data=>
    {
        if(data.status == "success")
        {
            document.getElementById("customer_name").value = data.customer.customer_name;
            document.getElementById("customer_email").value = data.customer.customer_email;
            document.getElementById("contact_no").value = data.customer.contact_no;
        }
        else
        {
            alert(data.message);
        }
    })
});

function getCustomers()
{
    fetch("customer.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("customerList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Customers found";
        }
        else
        {
            data.forEach(customer => {
                listDiv.innerHTML += 
                    `<div class="customer_card">
                        <div class="customer_id">${customer.customer_id}</div>
                        <h3>${customer.customer_name}</h3>
                        <p>Email : ${customer.customer_email}</p>
                        <p>Contact : ${customer.contact_no}</p>
                    </div>`
            })
        }
    }

    )
}

