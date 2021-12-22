// =========================================
// Simple struct obj
// =========================================


  // =========================================
  // Static Array
  // =========================================
  const products = [
  {
    "colors": ["Blue", "White", "Black"],
    "_id": "107fb5b75607497b96722bda5b504926",
    "name": "Kanap Sinopé",
    "price": 1849,
    "imageUrl": "kanap01.jpeg",
    "description": "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "altTxt": "Photo d'un canapé bleu, deux places"
  },
  {
    "colors": ["Black/Yellow", "Black/Red"],
    "_id": "415b7cacb65d43b2b5c1ff70f3393ad1",
    "name": "Kanap Cyllène",
    "price": 4499,
    "imageUrl": "kanap02.jpeg",
    "description": "Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.",
    "altTxt": "Photo d'un canapé jaune et noir, quattre places"
  },
  {
    "colors": ["Green", "Red", "Orange"],
    "_id": "055743915a544fde83cfdfc904935ee7",
    "name": "Kanap Calycé",
    "price": 3199,
    "imageUrl": "kanap03.jpeg",
    "description": "Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.",
    "altTxt": "Photo d'un canapé d'angle, vert, trois places"
  },
  {
    "colors": ["Pink", "White"],
    "_id": "a557292fe5814ea2b15c6ef4bd73ed83",
    "name": "Kanap Autonoé",
    "price": 1499,
    "imageUrl": "kanap04.jpeg",
    "description": "Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.",
    "altTxt": "Photo d'un canapé rose, une à deux place"
  },
  {
    "colors": ["Grey", "Purple", "Blue"],
    "_id": "8906dfda133f4c20a9d0e34f18adcf06",
    "name": "Kanap Eurydomé",
    "price": 2249,
    "imageUrl": "kanap05.jpeg",
    "description": "Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.",
    "altTxt": "Photo d'un canapé gris, trois places"
  },
  {
    "colors": ["Grey", "Navy"],
    "_id": "77711f0e466b4ddf953f677d30b0efc9",
    "name": "Kanap Hélicé",
    "price": 999,
    "imageUrl": "kanap06.jpeg",
    "description": "Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.",
    "altTxt": "Photo d'un canapé gris, deux places"
  },
  {
    "colors": ["Red", "Silver"],
    "_id": "034707184e8e4eefb46400b5a3774b5f",
    "name": "Kanap Thyoné",
    "price": 1999,
    "imageUrl": "kanap07.jpeg",
    "description": "EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.",
    "altTxt": "Photo d'un canapé rouge, deux places"
  },
  {
    "colors": ["Pink", "Brown", "Yellow", "White"],
    "_id": "a6ec5b49bd164d7fbe10f37b6363f9fb",
    "name": "Kanap orthosie",
    "price": 3999,
    "imageUrl": "kanap08.jpeg",
    "description": "Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.",
    "altTxt": "Photo d'un canapé rose, trois places"
  }
];

// ==========================================================
//  apiAskForProducts
// ==========================================================
// Arguments:
//      - Array     (products)
//      - String    (Url)
//
// Return a promise
// ==========================================================
function apiAskForProducts(productsArray, url) 
{
    console.log("apiAskForProducts");

    fetch(url)
    .then(function(res) 
    {
      console.log("apiAskForProducts 1 - Promise");
      if (res.ok) 
      {
        return res.json();
      }
    })
    .then(function(value) 
    {
      console.log("apiAskForProducts 2 - Promise");

       for (var obj of value) 
       {
          const productObj =  {colors: [],
            _id: "",
            name: "",
            price: 0,
            imageUrl: "",
            description: "",
            altTxt: ""
            }

            for (const key in obj)
            {
                if(productObj.hasOwnProperty(key))
                {
                    productObj[key] = obj[key]; 
                }
            }

            // Add To Array.
            productsArray.push(productObj);
       }

       console.log(productsArray);
       return productsArray;
    })
    .then(function(array)
    {
      console.log("apiAskForProducts 3 - Promise");

      let items = document.getElementById('items');

      if (!items)
      {
        throw console.error();
      }

      // Create new array of strings to writ to DOM
      const theseProducts = array.map(function(element)
      {
          return writePoductToDOM(element);
      });

      items.innerHTML = innerHTML = theseProducts.join('\n');

    })
    .catch(function(err) 
    {
      // Une erreur est survenue
      console.log("apiAskForProducts throw Error");
    });   
}

// ==========================================================
//  function writePoductToDOM
// ==========================================================
// Arguments:
//      - Object    (product)
//
// Return a string that represent a product as html
// ==========================================================
function writePoductToDOM(product)
{
    console.log("writePoductToDOM");
    let write = `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;

  return write;
}

// ==========================================================
// Write products into the DOM
// ==========================================================
async function writeProductsToDOM()
{
    let items = document.getElementById('items');

    if (items)
    {
        var productsArray = new Array();
        apiAskForProducts(productsArray, "http://localhost:3000/api/products");
    }
    else
    {
        // Handle errors.
        throw console.error();
    }
}


// ==========================================================
console.log("Starting Script");
writeProductsToDOM();
console.log("Ending Script");








// Function to write single product to products DOM page.
