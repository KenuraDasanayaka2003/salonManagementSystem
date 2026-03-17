document.getElementById("paymentForm").addEventListener("submit",function(e)
{
    e.preventDefault();
    const formData = new FormData(this);
    const data = 
    {
        payment_id : formData.get("payment_id"),
        customer_id : formData.get("customer_id"),
        payment_date : formData.get("payment_date"),
        payment_time : formData.get("payment_time"),
        payment_amount : formData.get("payment_amount")
    };

    fetch("payment.php",{
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
    const id= document.getElementById("payment_id").value;

    if(!id)
    {
        alert("Please Enter payment ID !!!");
        return;
    }

    fetch("payment.php",{
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
    const form = document.getElementById("paymentForm");
    const formData = new FormData(form);
    const data = 
    {
        payment_id : formData.get("payment_id"),
        customer_id : formData.get("customer_id"),
        payment_date : formData.get("payment_date"),
        payment_time : formData.get("payment_time"),
        payment_amount : formData.get("payment_amount")
    };

    fetch("payment.php", {
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
    const id = document.getElementById("payment_id").value;

    if (!id) 
    {
        alert("Please enter Payment ID !!!");
        return;
    }

    fetch(`payment.php?payment_id=${encodeURIComponent(id)}`)
    .then(res => res.json())
    .then(data=>
    {
        if(data.status == "success")
        {
            document.getElementById("customer_id").value = data.payment.customer_id;
            document.getElementById("payment_date").value = data.payment.payment_date;
            document.getElementById("payment_time").value = data.payment.payment_time;
            document.getElementById("payment_amount").value = data.payment.payment_amount;
        }
        else
        {
            alert(data.message);
        }
    })
});

function getPayments()
{
    fetch("payment.php")
    .then(res => res.json())
    .then(data => {
        const listDiv = document.getElementById("paymentList");
        listDiv.innerHTML = "";
        if(data.length == 0)
        {
            listDiv.innerHTML = "No Payments found";
        }
        else
        {
            data.forEach(payment => {
                listDiv.innerHTML += 
                    `<div class="payment_card">
                        <div class="payment_id">${payment.payment_id}</div>
                        <p>Payee : ${payment.customer_id}</p>
                        <p>Date : ${payment.payment_date}</p>
                        <p>Time : ${payment.payment_time}</p>
                        <p>Amount : ${payment.payment_amount}</p>
                    </div>`
            })
        }
    }

    )
}

