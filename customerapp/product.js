var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my_db');
var productSchema = mongoose.Schema({
   productName:String, 
   category: String, 
   description: String, 
   price: String, 
   quantity: String
});
var Product = mongoose.model("Product", productSchema);