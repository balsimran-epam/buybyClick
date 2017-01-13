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



router.post('/', function(req, res, next) {
    console.log("in post:");
    console.log(req.body);
    console.log("end of in post:");
    var postdata = req.body;
    if(Array.isArray(postdata)){
        postdata.forEach(function(item,index){
            console.log("in postpostdataSet[0]");
            console.log(postdata[0]);
            var saveObj = new product(item);
            console.log("save obj");
            console.log(saveObj);
            saveObj.save(function(err, resp) {
                console.log("in post.response data");
                console.log(resp);
                console.log("in post.insert error");
                console.log(err);
                if (err) {
                    return next(err);
                }
            });
        });
    }else if(typeof postdata == 'object'){
        console.log("in post: is an object");
        var saveObj = new product(postdata);
        console.log("save obj");
        console.log(saveObj);        
        saveObj.save(function(err, resp) {
            console.log("in post.resp data");
            console.log(resp);
            console.log("in post.insert error");
            console.log(err);
            if (err) {
                return next(err);
            }
        });
        
    }else{
        console.log("in post: is something else");
        return next({});
    }
    res.json({});
});     




module.exports = router;
