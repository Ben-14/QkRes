import axios from 'axios'
import moment from "moment"
import Noty from "noty"


export function initAdmin(socket) {



  const orderTableBody =$('#orderTableBody')
  let orders=[]
  let markup

  axios.get('/admin/orders', {
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    }
  }).then(res => {

    // console.log(res);
    orders = res.data
    // console.log(orders);

    markup = generateMarkup(orders)
    // console.log(markup);

    orderTableBody.html(markup)
  }).catch(err =>{
    console.log(err);
  })
  function renderItems(items) {
    let parsedItems = Object.values(items)
    return parsedItems.map(menuItem => {
      return `
                <p>${ menuItem.item.name } - ${ menuItem.Qty } pcs </p>
            `
    }).join('')
  }

  function generateMarkup(orders) {
    return orders.map(order => {
      return `

      <hr style="height:2px;width:100%;background:yellow;" >
      <div class="my-2"> <b> Order Placed at : </b>
      ${ moment(order.createdAt).format('MMMM Do YYYY hh:mm A') }
      </div>

    

               <p class="my-2"> <b>Order Id:</b> ${ order._id } </p>
<hr>

                    <div class="orderedItems my-3"> <b>Ordered Items :</b>${ renderItems(order.items) }</div>
            
<hr>      
              <p class="mb-2">Name : <b>  ${ order.customerId.google ? order.customerId.google.customerName :  order.customerId.local.customerName}   </b></p>
       
              <b class="mb-3">Phone : <i>  ${ order.phone} </i> </b>
               <p class="mb-3">Addresss : <b>  ${ order.address } </b> </p>

               <p class="mb-3">Pincode : <b>  ${ order.pincode } </b> </p>

                
                    <div class="inline-block relative w-64">
                        <form action="/admin/order/status" method="POST">
                            <div class="form-group">
                            <input class="form-control input-lg" type="hidden" name="orderId" value="${ order._id }">
                            </div>
                            <select name="status" onchange="this.form.submit()">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                                <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                    Prepared</option>
                                <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>
                        </form>
                   
                    </div>
                    <hr style="height:2px;width:100%;background:yellow;" >   

                    
               
                    
         
        `
    }).join('')
  }


  // Socket
  socket.on('orderPlaced', (order) => {
    new Noty({
      type: 'success',
      timeout: 1000,
      text: 'New order!',
      progressBar: false,
    }).show();
    orders.unshift(order)
    orderTableBody.html("")
    orderTableBody.html( generateMarkup(orders))
  })
}
