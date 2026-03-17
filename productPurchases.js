document.getElementById("buyProductsForm").addEventListener("submit", function(e) {
    
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        customer_id : formData.get("customer_id"),
        product_id : formData.get("product_id")
    };

        if (document.getElementById("customer_id").value.trim() === "") 
        {
            alert("Customer ID cannot be empty");
            return false;
        }

        if (document.getElementById("product_id").value.trim() === "") 
        {
            alert("Product ID cannot be empty");
            return false;
        }



    fetch("productPurchases.php", {
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

function getProductPurchases()
{
    fetch("productPurchases.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("productPurchasesList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Purchases found";
        }
        else
        {
            data.forEach(purchaseProduct => {
                listDiv.innerHTML += 
                    `<div class="purchaseProduct_card">
                        <div class="customer_id">${purchaseProduct.customer_id}</div>
                        <p>Customer Name : ${purchaseProduct.customer_name}</p>
                        <p>Product ID: ${purchaseProduct.product_id}</p>
                        <p>Product : ${purchaseProduct.product_name}</p>
                    </div>`
            })
        }
    }

    )
}

