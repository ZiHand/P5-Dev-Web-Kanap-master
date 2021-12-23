// 1 - Retreive the id from url call
// 2 - Ask API to get the product, according to the id
// 3 - Find the corresponding document item in the <article> chidldrens
// 4 - Add the corresponding Key into each children item html 

// ==========================================================
const apiUrlBase = "http://localhost:3000/api/products/";
let _ID = new URL(window.location.href).searchParams.get('id');

if (_ID != null)
{
  console.log(_ID);
}

let productObj = {colors: [], _id: "", name: "", price: 0, imageUrl: "", description : "", altTxt: ""};

// ==========================================================
function apiAskForProduct(url) 
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
    .then(function(object)
    {
      WriteToDOM(object);
    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log("apiAskForProduct throw Error");
    }); 
}

// ==========================================================
// Write image to the DOM
// ==========================================================
function WriteToDOM(obj)
{
  if (!obj)
  {
    throw console.error();
  }

  // find children class "item__img"
  document.getElementsByClassName('item__img')[0].innerHTML = `<img src="${obj.imageUrl}" alt="${obj.altTxt}">`;
  document.getElementById('title').textContent = obj.name;
  document.getElementById('price').textContent = obj.price;
  document.getElementById('description').textContent = obj.description;

  let colors = document.getElementById('colors');

  console.log(obj.colors);

  obj.colors.forEach(element => {

    console.log(element);
    colors.innerHTML = `<option value="${element}">${element}</option>`;
    
  });

}
// ==========================================================
// Write product into the DOM
// ==========================================================
async function writeProductToDOM()
{
    console.log(apiUrlBase + _ID);
    apiAskForProduct(apiUrlBase + _ID);   
}

// ==========================================================
writeProductToDOM();





