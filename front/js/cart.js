// ==========================================================
const apiUrlBase        = "http://localhost:3000/api/products/";
let OrderProduct        = {_id: "", color: "", count: 1, price: 0};
let orderStorage        = localStorage;
let orderArray          = [];
let article_Count       = 0;
let totalPrice          = 0;
let userContact         = {firstName: "", lastName:"", address:"", city:"", email:""};
 

// ==========================================================
// dumpStorage
// ==========================================================
function dumpStorage()
{
  console.log("******* Storage Dump Start *******");
  console.log("Storage count: " + orderStorage.length);

  for (var i = 0; i <= orderStorage.length - 1; i++)
  {
    console.log("Order index " + i + " : " + orderStorage.getItem(i.toString()));

    var retrievedObject = JSON.parse(orderStorage.getItem(i.toString()));

    if (!retrievedObject)
    {
      console.log("  Failed to retrive object: " + i);
    }
  }

  console.log("******* Storage Dump End *******");
  console.log("");
}

// ==========================================================
// apiAskForProduct
// ==========================================================
// Args: 
//    - String (URL)
//    - Object (Order) 
//
// return Promise.
// ==========================================================
function apiAskForProduct(url, order) 
{
  fetch(url)
    .then(function(res) 
    {
      if (res.ok) 
      {
        return res.json();
      }
    })
    .then(function(data) 
    {
      let productObj = {colors: [], _id: "", name: "", price: 0, imageUrl: "", description : "", altTxt: ""};
      
      // Fill datas
      productObj.colors       = data.colors;
      productObj._id          = data._id;
      productObj.name         = data.name;
      productObj.price        = data.price;
      productObj.imageUrl     = data.imageUrl;
      productObj.description  = data.description;
      productObj.altTxt       = data.altTxt;

      return productObj;
    })
    .then(function(product) 
    {
      return writeOrderToArticleItems(order, product);
    })
    .then(function(itemindex) 
    {
      const delete_item = document.getElementsByClassName('deleteItem');

      registerDeleteEvents(delete_item.item(itemindex - 1));

      const itemQuantity = document.getElementsByClassName('itemQuantity');
      registerQuantityEvents(itemQuantity.item(itemindex - 1));

      updateCartPrice();
    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log("apiAskForProduct throw Error: " + err);
    }); 
}

// ==========================================================
// loadOrderFromStorage
// ==========================================================
// Args: 
//    - None
//
// return void
// ==========================================================
function loadOrderFromStorage()
{
    for (var i = 0; i < orderStorage.length; i++)
    {
        // Retrieve the orderObject
      var retrievedOrder = JSON.parse(orderStorage.getItem(i.toString()));

      if (retrievedOrder)
      {
        orderArray.push(retrievedOrder);
      }
    }
}

// ==========================================================
//  function writeOrderToArticleItems
// ==========================================================
// Arguments:
//      - Object    (order)
//      - Object    (product)
//
// Return item index (number)
// ==========================================================
function writeOrderToArticleItems(order, product)
{
    article_Count++;

    let cart__items = document.getElementById('cart__items');

    let article_write = `<article class="cart__item" data-id="${order._id}" data-color="${order.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${product.name}</h2>
        <p>${order.color}</p>
        <p>${product.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${order.count}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  cart__items.insertAdjacentHTML('beforeend', article_write);

  const delete_item = document.getElementsByClassName('deleteItem');

  return delete_item.length;
}

// ==========================================================
// updateCartPrice
// ==========================================================
function updateCartPrice()
{
  let totalQuantity = document.getElementById('totalQuantity');
  let totalPrice    = document.getElementById('totalPrice');

  let articleCount  = 0;
  let price         = 0;

  console.log("orderStorage.length : " + orderStorage.length);

  for (var i = 0; i <= orderStorage.length - 1; i++)
  {
    var retrievedObject = JSON.parse(orderStorage.getItem(i.toString()));

    if (retrievedObject)
    {
      articleCount += Number(retrievedObject.count);
      price += (Number(retrievedObject.price) * Number(retrievedObject.count));
    }
    else
    {
      console.log("updateCartPrice FAILED ! retrievedObject == null : " + orderStorage.getItem(i.toString()));
    }
  }

  if (totalQuantity)
  {
    totalQuantity.textContent = articleCount.toString();
  }

  if (totalPrice)
  {
    totalPrice.textContent = price.toString();
  }
}

// **********************************************************
//                      Events listeners
// **********************************************************
const formName      = document.getElementById('firstName');
const formLastName  = document.getElementById('lastName');
const formAddress   = document.getElementById('address');
const formCity      = document.getElementById('city');
const formEmail     = document.getElementById('email');
const orderBtn      = document.getElementById('order');

formName.addEventListener('change', onNameChange);
formLastName.addEventListener('change', onLastNameChange);
formAddress.addEventListener('change', onAddressChange);
formCity.addEventListener('change', onCityChange);
formEmail.addEventListener('change', onEmailChange);
orderBtn.addEventListener('click', onOrderClick);

// ==========================================================
// registerDeleteEvents
// ==========================================================
function registerDeleteEvents(delete_item)
{
  delete_item.addEventListener('click', onDeleteClick);
}

// ==========================================================
// registerQuantityEvents
// ==========================================================
function registerQuantityEvents(item)
{
  item.addEventListener('change', onQuantityChange);
}

// ==========================================================
// onDeleteClick
// ==========================================================
function onDeleteClick(event) 
{
    event.preventDefault();

    if (event.currentTarget === this)
    {
      let cart__item__content__settings__delete = event.currentTarget.parentElement;

      if (cart__item__content__settings__delete)
      {
          let cart__item__content__settings = cart__item__content__settings__delete.parentElement;

          if (cart__item__content__settings)
          {
            let cart__item__content = cart__item__content__settings.parentElement;

            if (cart__item__content)
            {
              let article = cart__item__content.parentElement;

              if (article)
              {
                  // Find id
                  let _id = article.getAttribute('data-id');
                  let color = article.getAttribute('data-color');

                  // remove from storage
                  for (var i = 0; i <= orderStorage.length - 1; i++)
                  {
                    var retrievedObject = JSON.parse(orderStorage.getItem(i.toString()));

                    if (retrievedObject && retrievedObject._id === _id && retrievedObject.color === color)
                    {
                      orderStorage.removeItem(i.toString());
                      break;
                    }
                    else
                    {
                      console.log("Unable to get order : " + i);
                      console.log("");
                    }
                  }

                  dumpStorage();
                  
                  if (orderStorage.length <= 0)
                  {
                    // Go back to products
                    goToSiteLocation("index.html");
                  }
                  else
                  {
                    // update price
                    updateCartPrice();
                    // reload script
                    //location.reload();
                    //goToSiteLocation("cart.html");
                  }
              }
            }
          }
      }
    }
}

// ==========================================================
// onQuantityChange
// ==========================================================
function onQuantityChange(event) 
{
    event.preventDefault();

    if (event.currentTarget === this)
    {
      let cart__item__content__settings__quantity = event.currentTarget.parentElement;

      if (cart__item__content__settings__quantity)
      {
          let cart__item__content__settings = cart__item__content__settings__quantity.parentElement;

          if (cart__item__content__settings)
          {
            let cart__item__content = cart__item__content__settings.parentElement;

            if (cart__item__content)
            {
              let article = cart__item__content.parentElement;

              if (article)
              {
                  // Find id
                  let _id = article.getAttribute('data-id');

                  // remove from storage
                  for (var i = 0; i <= orderStorage.length - 1; i++)
                  {
                    var retrievedObject = JSON.parse(orderStorage.getItem(i.toString()));

                    if (retrievedObject && retrievedObject._id === _id)
                    {
                      if (event.target.value >= 1)
                      {
                        retrievedObject.count = event.target.value;
                        orderStorage.setItem(i.toString(), JSON.stringify(retrievedObject));
                        break;
                      }
                      else
                      {
                        orderStorage.removeItem(i.toString());
                        break;
                      }
                    }
                  }
                  
                  // Update price
                  updateCartPrice();
              }
            }
          }
      }
    }
}

// ==========================================================
// onNameChange
// ==========================================================
function onNameChange(event)
{
  if (!validateName(formName))
  {
    //var elt = formName.closest("p");
    var elt = document.getElementById('firstNameErrorMsg');

    if (elt)
    {
      elt.textContent = "Merci de fournir un prenom valide.";
    }
  }
}

// ==========================================================
// onLastNameChange
// ==========================================================
function onLastNameChange(event)
{
  if (!validateName(formLastName))
  {
    var elt = document.getElementById('lastNameErrorMsg');

    if (elt)
    {
      elt.textContent = "Merci de fournir un nom valide.";
    }
  }
}

// ==========================================================
// onAddressChange
// ==========================================================
function onAddressChange(event)
{
  if (!validateAdress(formAddress))
  {
    var elt = document.getElementById('addressErrorMsg');

    if (elt)
    {
      elt.textContent = "Merci de fournir une addresse valide.";
    }
  }
}

// ==========================================================
// onCityChange
// ==========================================================
function onCityChange(event)
{
  if (!validateName(formCity))
  {
    var elt = document.getElementById('cityErrorMsg');

    if (elt)
    {
      elt.textContent = "Merci de fournir un nom de ville valide.";
    }
  }
}

// ==========================================================
// onEmailChange
// ==========================================================
function onEmailChange(event)
{
  if (!validateEmail(formEmail))
  {
    var elt = document.getElementById('emailErrorMsg');

    if (elt)
    {
      elt.textContent = "Merci de fournir una addresse Email valide.";
    }
  }
}

// ==========================================================
// checkForm
// ==========================================================
function checkForm()
{
  if (validateName(formName)      &&
      validateName(formLastName)  &&
      validateAdress(formAddress) &&
      validateName(formCity) &&
      validateEmail(formEmail))
  {
    return true;
  }

  return false;
}

// ==========================================================
// onOrderClick
// ==========================================================
function onOrderClick(event)
{
  event.preventDefault();

  if (checkForm())
  {
    submitForm();
  }
  else
  {
    console.log("checkForm FAILED");
  }
}

// ==========================================================
// validateName
// ==========================================================
function validateName(element) 
{
  // https://stackoverflow.com/questions/20690499/concrete-javascript-regex-for-accented-characters-diacritics

  var regex = /^[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]{2,30}$/;
  return regex.test(element.value);
}

// ==========================================================
// validateAdress
// ==========================================================
function validateAdress(element) 
{
  var regex = /^[a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF\s,'-]*$/;
  return regex.test(element.value);
}

// ==========================================================
// validateCity
// ==========================================================
function validateCity(element) 
{
  var regex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
  return regex.test(element.value);
}

// ==========================================================
// validateEmail
// ==========================================================
function validateEmail(element) 
{
  var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(element.value);
}

// ==========================================================
// computeJsonBody
// ==========================================================
function computeJsonBody()
{
  userContact.firstName = formName.value;
  userContact.lastName  = formLastName.value;
  userContact.address   = formAddress.value;
  userContact.city      = formCity.value;
  userContact.email     = formEmail.value;

  let productArray = [];

  orderArray.forEach((item, index) => 
  {
      productArray.push(item._id);
  })

  return {contact: userContact, products: productArray};
}

// ==========================================================
// goToSiteLocation
// ==========================================================
function goToSiteLocation(pageName)
{
  var currentUrl    = window.location.href;
  let indexOf       = currentUrl.lastIndexOf("/") + 1;

  document.location = currentUrl.substring(0, indexOf) + pageName;
}

// ==========================================================
// submitForm
// ==========================================================
async function submitForm()
{
  fetch(apiUrlBase + "order", {
	            method: "POST",
	            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
              },
	            body: JSON.stringify(computeJsonBody())
            })
    .then(function(res) 
    {
      if (res.ok) 
      {
        return res.json();
      }
    })
    .then(function(value) 
    {
      goToSiteLocation("confirmation.html?Id=" + value.orderId);
      /*var currentUrl    = window.location.href;
      let indexOf       = currentUrl.lastIndexOf("/") + 1;

      document.location = currentUrl.substring(0, indexOf) + "confirmation.html?Id=" + value.orderId;*/
    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log("submitForm throw : " + err);
    });
}

// ==========================================================
// Main run
// ==========================================================
function mainRun()
{
  loadOrderFromStorage();

  orderArray.forEach((item, index) => 
  {
    // Retreive product
    apiAskForProduct(apiUrlBase + item._id, item);
  })
}

// ==========================================================
mainRun();
