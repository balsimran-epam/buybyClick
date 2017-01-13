var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  img: String,
    category : String,
      subcategory: String,
  
    original_price : Number,
    discounted_price : Number,
    latest: String,
      itemquant: Number,
    Quantity: Number
});

module.exports = mongoose.model('product', ProductSchema);
