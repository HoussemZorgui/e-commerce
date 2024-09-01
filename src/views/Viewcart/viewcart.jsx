import { Button } from "antd"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import {DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";
import { Link } from "react-router-dom";

export default () => {
    const [size, setSize] = useState('large');
    return (
        <>
        <Header/>

      
<div>
  <meta charSet="UTF-8" />
  <title>View Cart</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
  <div className="container">
    <h1>View Cart</h1>
    <table className="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product 1</td>
          <td>$10.00</td>
          <td>2</td>
          <td>$20.00</td>
         <td><Button  icon={<DeleteOutlined />} size={size} danger/></td> 
        
        </tr>
        <tr>
          <td>Product 2</td>
          <td>$15.00</td>
          <td>1</td>
          <td>$15.00</td>
          <td><Button  icon={<DeleteOutlined />} size={size} danger/></td> 
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3}>Subtotal:</td>
          <td>$35.00</td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={3}>Shipping:</td>
          <td>$5.00</td>
          <td></td>
        </tr>
        <tr>
          <td colSpan={3}>Total:</td>
          <td>$40.00</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <button className="btn btn-default"><Link to='/chekout'>Checkout </Link></button>
   <br/> <br/>
  </div>
</div>




        <Footer/>
        
        </>
    )
}