var express = require('express');
var router = express.Router();

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


router.get('/', function(req, res){
	console.log(res);
    res.redirect("view-all-products");
   //res.sendFile(path.join(__dirname+'/view-all-products'));
});

router.get('/add-new-product', function(req, res){
    res.render("add-product");
});

router.post('/save-product', function (req, res) {
   // Prepare output in JSON format
    
	var newProduct = new Product({
           productName: req.body.productName,
      	   category: req.body.category,
           description: req.body.description,
           price: req.body.price,
           quantity: req.body.quantity
        });
		newProduct.save(function(err, res){
			
            if(err)
              	console.log("error");
           	else
           		{
           		 
   				 console.log("Success");
       			 
           		}
        });
        // redirecting to view-all-products
        res.writeHead(302, {
  		'Location': '/view-all-products'
		});
		res.end();

 });

// view all products
router.get('/view-all-products', function(req, res){

	mongoose.model('Product').find(function(err, products){
	//res.send(products);
	res.render("view-all-products",{
		products: products
	});
});

});
// deleting all the products
router.get('/delete-product/:id', function(req, res) {
   
	Product.findByIdAndRemove(req.params.id, function (err, todo) {  
   		if(err)
   		console.log("Error");
   	});
		// redirecting to view-all-products
        res.writeHead(302, {
  		'Location': '/view-all-products'
		});
		res.end();

});
// Updating a product
router.get('/update-product/:id', function(req, res){
	var sess = req.session;
	Product.findById(req.params.id, function (err, product) {  
	    if (err) {
	        res.send(err)
	    }
	    if (product) {
	    	sess.productid = product._id;
	    	sess.productName = product.productName;
	    	sess.category = product.category;
	    	sess.description = product.description;
	    	sess.price = product.price;
	    	sess.quantity = product.quantity;
	     	console.log(sess.productName);
	     	res.render("update-product.ejs",{
	 		session: sess
			});
	    } else {
	        res.send("No product found with that ID")
	    }
	});
	
	

});
router.post('/save-update/:id', function(req, res){


			Product.findById(req.params.id, function (err, product) {  
		    // Handle any possible database errors
		    if (err) {
		        res.status(500).send(err);
		    } else {
		        // Update each attribute with any possible attribute that may have been submitted in the body of the request
		        // If that attribute isn't in the request body, default back to whatever it was before.
		        console.log("arun="+req.body.productname);
		        product.productName = req.body.productname || product.productName;
		        product.category = req.body.category || product.category;
		        product.description = req.body.description || product.description;
		        product.price = req.body.price || product.price;
		        product.quantity = req.body.quantity || product.quantity;

		        // Save the updated document back to the database
		        product.save(function (err, product) {
		            if (err) {
		                res.status(500).send(err)
		            }
		           // redirecting page
		            res.writeHead(302, {
  					'Location': '/view-all-products'
					});
					res.end();

		        });
		    }
			});

});


module.exports = router;