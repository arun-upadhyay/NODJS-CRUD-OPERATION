var mongoose = require('mongoose');
var productSchema = mongoose.Schema({
   productName:String, 
   category: String, 
   description: String, 
   price: String, 
   quantity: String
});
var Product = mongoose.model("Product", productSchema);