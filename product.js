document.getElementById("productForm").addEventListener("submit",function(e)
{
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        product_id : formData.get("product_id"),
        employee_id : formData.get("employee_id"),
        product_name : formData.get("product_name"),
        product_brand : formData.get("product_brand"),
        product_price : formData.get("product_price")
    };

        if (document.getElementById("product_id").value.trim() === "") 
        {
            alert("Product ID cannot be empty");
            return false;
        }

        if (document.getElementById("employee_id").value.trim() === "") 
        {
            alert("Employee ID cannot be empty");
            return false;
        }

        if (document.getElementById("product_name").value.trim() === "") 
        {
            alert("Product name cannot be empty");
            return false;
        }




    fetch("product.php",{
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
    const id= document.getElementById("product_id").value;

    if(!id)
    {
        alert("Please Enter product ID !!!");
        return;
    }

    fetch("product.php",{
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
    const form = document.getElementById("productForm");
    const formData = new FormData(form);
    const data = 
    {
        product_id : formData.get("product_id"),
        employee_id : formData.get("employee_id"),
        product_name : formData.get("product_name"),
        product_brand : formData.get("product_brand"),
        product_price : formData.get("product_price")
    };

    fetch("product.php", {
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
    const id = document.getElementById("product_id").value;

    if (!id) 
    {
        alert("Please enter Product ID !!!");
        return;
    }

    fetch(`product.php?product_id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data=>
    {
        if(data.status == "success")
        {
            document.getElementById("employee_id").value = data.product.employee_id;
            document.getElementById("product_name").value = data.product.product_name;
            document.getElementById("product_brand").value = data.product.brand;
            document.getElementById("product_price").value = data.product.price;
        }
        else
        {
            alert(data.message);
        }
    })
});

function getProducts()
{
    fetch("product.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("productList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Products found";
        }
        else
        {
            data.forEach(product => {
                listDiv.innerHTML += 
                    `<div class="product_card">
                        <div class="product_id">${product.product_id}</div>
                        <h3>${product.product_name}</h3>
                        <p>Sold Employee : ${product.employee_id}</p>
                        <p>Product Brand : ${product.brand}</p>
                        <p>Product Price : ${product.price}</P>
                    </div>`
            })
        }
    }

    )
}
