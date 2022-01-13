let idElement = document.getElementById('orderId');

// ==========================================================
// retriveOrderID
// ==========================================================
function retriveOrderID()
{
    var url = new URL(window.location.href);

    if (!url)
    {
        throw "retriveOrderID : url is invalid.";
    }

    return url.searchParams.get("Id");
}

// ==========================================================
// writeOrderToDom
// ==========================================================
function writeOrderToDom()
{
    idElement.textContent = retriveOrderID();

    if (idElement.textContent.length <= 0)
    {
        throw "writeOrderToDom : textContent is empty";
    }
}

// ==========================================================
try
{
    writeOrderToDom();
    localStorage.clear();
}
catch(err)
{
    console.log(err);
    alert("Une erreur est survenue lors de la validation de votre commande. Merci de contacter le support de notre site.");
}
