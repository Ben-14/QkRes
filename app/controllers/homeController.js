
const homeServiceApi = require("../services/homeServicesApi");

function homePage(){
  return {
    index(req,res){
      res.render("index")
    }

  }
}

module.exports = homePage
