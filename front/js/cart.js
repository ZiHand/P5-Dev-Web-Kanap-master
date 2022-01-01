// ==========================================================
const apiUrlBase        = "http://localhost:3000/api/products/";
let OrderProduct        = {_id: "", color: "", count: 1};
let orderStorage        = localStorage;
let orderArray          = [];
let article_Count       = 0;
let totalPrice          = 0;

// ==========================================================

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
      return writeOrderTo_article_items(order, product);
    })
    .then(function(itemindex) 
    {
      const delete_item = document.getElementsByClassName('deleteItem');

      console.log("Index : " + itemindex);
      registerDeleteEvents(delete_item.item(itemindex - 1));
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
//  function writeOrderTo_article_items
// ==========================================================
// Arguments:
//      - Object    (order)
//      - Object    (product)
//
// Return void
// ==========================================================
function writeOrderTo_article_items(order, product)
{
    article_Count++;

    let cart__items = document.getElementById('cart__items');

    console.log("writeOrderTo_cart_items");

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

  console.log("deleteItem count : " + delete_item.length);

  return delete_item.length;

  let cart__price = document.getElementById('cart__price');
}

// **********************************************************
//                        Events
// **********************************************************
function registerDeleteEvents(delete_item)
{
  delete_item.addEventListener('click', onDeleteClick);
}
// ==========================================================
// onDeleteClick
// ==========================================================
function onDeleteClick(event) 
{
    console.log("onDeleteClick");
    console.log(event);

    

    if (event.currentTarget === this)
    {
      console.log(this.className)           // logs the className of my_element

      let cart__item__content__settings__delete = event.currentTarget.parentElement;

      console.log(cart__item__content__settings__delete);

      if (cart__item__content__settings__delete)
      {
          let cart__item__content__settings = cart__item__content__settings__delete.parentElement;
          console.log(cart__item__content__settings);

          if (cart__item__content__settings)
          {
            let cart__item__content = cart__item__content__settings.parentElement;
            console.log(cart__item__content);

            if (cart__item__content)
            {
              let article = cart__item__content.parentElement;
              console.log(article);

              if (article)
              {
                  // Find id
                  let _id = article.getAttribute('data-id');
                  console.log(_id);
                  // remove from storage
                  for (var i = 0; i <= orderStorage.length - 1; i++)
                  {
                    var retrievedObject = JSON.parse(orderStorage.getItem(i.toString()));

                    console.log(retrievedObject._id);

                    if (retrievedObject._id === _id)
                    {
                      console.log("Deleting from storage");
                      localStorage.removeItem(i.toString());
                      break;
                    }
                  }
                  
                  // reload script
                  location.reload();
              }
            }
          }
      }
    }
}

// ==========================================================
// Main run
// ==========================================================
function mainRun()
{
  loadFromStorage();
  console.log("Loaded Orders : " + JSON.stringify(orderArray, null, " "));

  orderArray.forEach((item, index) => 
  {
    console.log("Order " + index + ": " + JSON.stringify(orderArray[index], null, " "));

    // Retreive product
    apiAskForProduct(apiUrlBase + item._id, item);
  })
}

mainRun();
