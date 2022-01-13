let idElement = document.getElementById('orderId');

// ==========================================================
// retriveOrderID
// ==========================================================
function retriveOrderID()
{
    var url = new URL(window.location.href);
    return url.searchParams.get("Id");
}

// ==========================================================
// writeOrderToDom
// ==========================================================
function writeOrderToDom()
{
    idElement.textContent = retriveOrderID();
}

// ==========================================================
writeOrderToDom();
localStorage.clear();