// ==========================================================
const apiUrlBase        = "http://localhost:3000/api/products/";
let OrderProduct        = {_id: "", color: "", count: 1};

let orderStorage        = localStorage;
let productObjArray     = [];
let orderArray          = [];

// ==========================================================

// ==========================================================
//  readProductsFromJSON
// ==========================================================
// Arguments:
//      - JSON     (json)
//
// Return bool
// ==========================================================
function readProductsFromJSON(json)
{
  for (var obj of json) 
  {
    const _productObj =  {colors: [], _id: "", name: "", price: 0, imageUrl: "", description: "", altTxt: "", count: 0};

      // Check know properties
      for (const key in obj)
      {
          if(_productObj.hasOwnProperty(key))
          {
            _productObj[key] = obj[key]; 
          }
      }

      // Add To Array.
      productObjArray.push(_productObj);
  }

  return productObjArray.length > 0;
}

// ==========================================================
//  apiAskForProducts
// ==========================================================
// Arguments:
//      - String    (Url)
//
// Return promise
// ==========================================================
function apiAskForProducts(url) 
{
  fetch(url)
    .then(function(res) 
    {
      if (res.ok) 
      {
        return res.json();
      }
    })
    .then(function(json) 
    {
      readProductsFromJSON(json);

      //ASK Pascal for array
      console.log(productObjArray);
    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log(err);
    });   
}

// ==========================================================
// apiAskForProduct
// 
// Args: 
//    - String (URL)
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

      console.log(data);

      let productObj          = {colors: [], _id: "", name: "", price: 0, imageUrl: "", description : "", altTxt: ""};
      
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
      writeOrderTo_cart_items(order, product);
    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log("apiAskForProduct throw Error: " + err);
    }); 
}

// ==========================================================
// loadFromStorage
//
// return value: bool
// ==========================================================
function loadFromStorage()
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
//  function writeOrderTo_cart_items
// ==========================================================
// Arguments:
//      - Object    (order)
//
// Return a string that represent a order as html
// ==========================================================
function writeOrderTo_cart_items(order, product)
{
    let cart__items = document.getElementById('cart__items');

    console.log("writeOrderTo_cart_items");

    let write = `<article class="cart__item" data-id="${order._id}" data-color="${order.color}">
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

  cart__items.insertAdjacentHTML('beforeend', write);
}


// ==========================================================
// Mai run
// ==========================================================
function mainRun()
{
  loadFromStorage();
  console.log("Loaded Orders : " + JSON.stringify(orderArray, null, " "));

  orderArray.forEach((item, index) => {
    console.log("Order " + index + ": " + JSON.stringify(orderArray[index], null, " "));

    // Retreive product
    apiAskForProduct(apiUrlBase + item._id, item);
  })
}

mainRun();
