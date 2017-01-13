var express = require('express');
var router = express.Router();

var product = require('../models/product.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/products/:id',function(req,res,next){
product.findById(req.params.id,function(err,products){
       
       if (err) return next(err);
   res.render('single.html', {
        products: products
    });
   });    
});

router.get('/:title',function(req,res,next){
    console.log("in js")
    console.log(req.params.title+" hbsdfdhsufhsdvjbkvzdxvzxc");
    
product.find({'$or':[{'title' :{$regex : '.*'+ req.params.title +'.*',$options: 'i'}}, {'category' :{$regex : '.*'+ req.params.title +'.*',$options: 'i'}}, {'subcategory' :{$regex : '.*'+ req.params.title +'.*',$options: 'i'}}]},function(err,products){
       
       if (err) return next(err);
    res.json(products);
    console.log("kkk"+products.length)
   });    
});


module.exports = router;
