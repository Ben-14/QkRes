const Order = require("../models/order")
const moment = require("moment")


function orderController() {
  return {
    store(req, res) {
    // validate request
    const{address,phone}=req.body
    if(!address || !phone ){
      req.flash("error","Address and phone number fields are required")
      return res.redirect("/cart")
    }
 const order = new Order({
   customerId:req.user._id,
   items:req.session.cart.items,
   phone:req.body.phone,
   address:req.body.address
 })
 order.save().then(result=>{
   req.flash("success","order placed Successfully")
   delete req.session.cart
   return res.redirect("/customer/orders")
 }).catch(err=>{
   req.flash("error","something went wrong")
   return res.redirect("/cart")
 })
},
async index(req,res){
  const orders = await Order.find({customerId:req.user._id},
    null,
    {sort:{"createdAt": -1}})
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.render("customer/orders",{order:orders,moment:moment})
  console.log(orders);
}
  }
}


module.exports = orderController
