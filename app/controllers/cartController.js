function cartController() {
  return {
    index(req, res) {
      res.render("cart")
    },
    update(req, res) {
      if (!req.session.cart) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0
        }

      }
      let cart = req.session.cart
      // console.log(req.body);

      // check if item does not exist in cart

      if (!cart.items[req.body._id]) {
        cart.items[req.body._id] = {
          item: req.body,
          Qty: 1
        }
        // console.log(cart.items);
        // console.log(cart.items[req.body._id]);
        cart.totalQty = cart.totalQty + 1
        // cart.totalPrice = cart.totalPrice + req.body.price
      } else {
        cart.items[req.body._id].Qty = cart.items[req.body._id].Qty + 1
        cart.totalQty = cart.totalQty + 1
        // cart.totalPrice = cart.totalPrice + req.body.price
      }

      return res.json({
        totalQty: req.session.cart.totalQty
      })
    },
    delete_cart(req,res){
      delete req.session.cart
      return res.redirect("/cart")
    },
    delete_item(req,res){
      console.log(req.body);
    //  console.log(req.session.cart);
     let cart = req.session.cart;
     if(cart.items[req.body._id]){
       if(cart.items[req.body._id].Qty > 1){
        cart.totalQty = cart.totalQty - 1
        cart.items[req.body._id].Qty = cart.items[req.body._id].Qty -1
       }
        else if(cart.items[req.body._id].Qty === 1){
        cart.totalQty = cart.totalQty - 1 
        delete cart.items[req.body._id]
       } 

       return res.json({
        totalQty: req.session.cart.totalQty
       })
     }else{
      return res.json({
        message : "this item not added to cart to delete"
       })
       
     }
    

    }
  }
}

module.exports = cartController
