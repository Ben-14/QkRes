function cartController() {
  return {
    index(req, res) {
      res.render("cart")
    },
    update(req, res) {
      if (!req.session.cart) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
        req.session.cart = {
          items: {},
          totalQty: 0
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
    delete_items_in_cart(req,res){
      // console.log(req.session.cart);
      // console.log(req.body.id);
      let id =req.body.id
      let cart = req.session.cart
     if(cart.items[id] && cart.totalQty>1){
      if(cart.items[id].Qty > 1){
        cart.totalQty = cart.totalQty - 1
        cart.items[id].Qty = cart.items[id].Qty -1
        res.redirect("/cart")
       } else if(cart.items[id].Qty === 1){
        cart.totalQty = cart.totalQty - 1 
        delete cart.items[id]
        res.redirect("/cart")
       } 
     }else{
       delete req.session.cart
       res.redirect("/cart")
     }
    },
    add_items_to_cart(req,res){
      let cart = req.session.cart
      let id =req.body.id
     cart.items[id].Qty = cart.items[id].Qty + 1
     cart.totalQty = cart.totalQty+1
     res.redirect("/cart")
    }
  }
}

module.exports = cartController
