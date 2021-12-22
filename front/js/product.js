// ==========================================================
//                      Class Product
// ==========================================================
// Arguments:
//      - String
//      - String
//      - String
//      - Array
//      - Float
//      - String
//      - String
//
// Return a Product Object
// ==========================================================
export default class productClass 
{
  constructor(_id, name, description, colors, price, imageUrl, altTxt) 
  {
    this._id          = _id;
    this.name         = name;
    this.description  = description;
    this.colors       = colors;
    this.price        = price;
    this.imageUrl     = imageUrl;
    this.altTxt       = altTxt;
  }

  isSameAs(obj)
  {
    return (this._id === obj._id && this.colors === obj.colors);
  }

  isDifferentAs(obj)
  {
    return !this.isSameAs(obj);
  }

  // ==========================================================
  // Static 
  // ==========================================================
  static function factoryCreateSafeProduct(_id, name, description, colors, price, imageUrl, altTxt)
  {
    const obj = new product(_id, name, description, colors, price, imageUrl, altTxt);

    Object.defineProperty(obj, "_id",          {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "name",         {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "description",  {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "colors",       {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "price",        {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "imageUrl",     {writable: false, enumerable: true, configurable: true});
    Object.defineProperty(obj, "altTxt",       {writable: false, enumerable: true, configurable: true});

    return obj;
  }
}

// ==========================================================

// ==========================================================
//  Safe Product Factory function
// ==========================================================
// Arguments:
//      - String    (VLUID)
//      - String    (Name)
//      - String    (Decription)
//      - Array     (Colors)
//      - Float     (Price)
//      - String    (Image url)
//      - String    (Image alternative text)
//
// Return a Safe Product Object
// ==========================================================


// ==========================================================
//  Product test function
// ==========================================================
function testObjectFunc()
{
  console.log("*****************************************");
  console.log(" Product class test functions start");
  console.log("*****************************************");

  const test = product.factoryCreateSafeProduct("1234", "canap1", "un pouf", ["#ffffff"], 650.43, "eee", "ffff");
  console.log(test);
  console.log("");
  console.log("isSameAs       = " + test.isSameAs(factoryCreateSafeProduct("2222", "canap1", "un pouf", [], 650.43, "eee", "ffff")));
  console.log("isDifferentAs  = " + test.isDifferentAs(factoryCreateSafeProduct("2222", "canap1", "un pouf", [], 650.43, "eee", "ffff")));

  console.log("*****************************************");
  console.log(" Product class test functions end");
  console.log("*****************************************");
  console.log("");
  
}

// ==========================================================
//  Running
// ==========================================================
testObjectFunc();

