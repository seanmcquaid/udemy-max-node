const Product = require("../models/product");
const mongodb = require("mongodb");

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    // console.log(req.user)
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title,price, description, imageUrl)
    product
    .save()
    .then((result)=>{
      // console.log(result)
      console.log("Created Product")
      res.redirect("/admin/products")
    }).catch((err)=>{
      console.log(err)
    });
  }

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect("/")
  }
  const prodId = req.params.productId;
  Product
    .findById(prodId)
    .then((product)=>{
      if(!product){
        return res.redirect("/")
      }
      res.render("admin/edit-product",{
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product
      })
    }).catch((err)=>{
      console.log(err)
    })
};

exports.postEditProduct = (req,res,next)=>{
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = parseInt(req.body.price);
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
    const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new ObjectId(prodId))
  product.save().then((result)=>{
    console.log("updated product")
    res.redirect("/admin/products")
  })
  .catch((err)=>{
    console.log(err)
  });
}

exports.getProducts = (req,res,next) =>{
  Product
  .fetchAll()
  .then((products)=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((error)=>{
    console.log(error)
  });
}

// exports.postDeleteProduct = (req,res,next)=>{
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product)=>{
//       return product.destroy()
//     })
//     .then((result)=>{
//       console.log("product deleted")
//       res.redirect("/admin/products")
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
// }