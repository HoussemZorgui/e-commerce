import { Link, useNavigate } from "react-router-dom"
import Newsletter from "../../components/Newsletter/newsletter"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"
import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"

export default () => {
const navigate=useNavigate()
const [products,setproducts] = useState([])

useEffect(() => {
    const valeurStockee=JSON.parse(localStorage.getItem("products"))
    setproducts(valeurStockee)
})
const [total,settotal] = useState(0)
const [auth,setauth] = useState({})
useEffect(() => {
    setauth(JSON.parse(localStorage.getItem("user")))
}, [])

useEffect(() => {
    let sum=0
    for(let item of products){
        sum+=parseInt(item.price)
    }
    settotal(sum)
},[products])

const createorder=()=>{
    let data={
        totalPrice:total
    }
    axiosApi.post("http://localhost:5000/orders",data,
    {
        headers: {
            Authorization: `Bearer ${auth?.tokens}`
        }
    })
    .then(res=>{
        console.log("order created successfully" , res.data.data);
        for(let item of products){
            let data={
                order:res.data.data._id,
                product:item._id
            }
            console.log(data, "data order");
            axiosApi.post("http://localhost:5000/orderproduct", data).then(res=>{
                console.log("order product created" , res.data.data);
                navigate("/store")
            }).catch(err=>{
                console.log(err.response, "Error create order product");
            })
        }
    }).catch(err=>{
        console.log(err.response,"Error create order");
    })
}

    return (
        <>
            <Header />
            <Navbar />

            {/* SECTION */}
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                       
                        {/* Order Details */}
                        <div className="col-md-7 order-details">
                            <div className="section-title text-center">
                                <h3 className="title">Your Order</h3>
                            </div>
                            <div className="order-summary">
                                <div className="order-col">
                                    <div><strong>PRODUCT</strong></div>
                                    <div><strong>TOTAL</strong></div>
                                </div>
                             {
                                products?.map(p=>{
                                    return(
                                        <>
                                 <div className="order-products">
                                    <div className="order-col">
                                        <div>{p?.name}</div>
                                        <div>{p?.price}</div>
                                    </div>
                                </div>

                                        </>
                                    )
                                })
                             }
                           



                               
                                <div className="order-col">
                                    <div><strong>TOTAL</strong></div>
                                    <div><strong className="order-total">{total} dt</strong></div>
                                </div>
                            </div>
                            <div className="payment-method">
                                <div className="input-radio">
                                    <input type="radio" name="payment" id="payment-1" />
                                    <label htmlFor="payment-1">
                                        <span />
                                        Direct Bank Transfer
                                    </label>
                                    <div className="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                                <div className="input-radio">
                                    <input type="radio" name="payment" id="payment-2" />
                                    <label htmlFor="payment-2">
                                        <span />
                                        Cheque Payment
                                    </label>
                                    <div className="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                                <div className="input-radio">
                                    <input type="radio" name="payment" id="payment-3" />
                                    <label htmlFor="payment-3">
                                        <span />
                                        Paypal System
                                    </label>
                                    <div className="caption">
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="input-checkbox">
                                <input type="checkbox" id="terms" />
                                <label htmlFor="terms">
                                    <span />
                                    I've read and accept the <a href="#">terms &amp; conditions</a>
                                </label>
                            </div>
                            <button class="primary-btn"><Link to='/delivery'>PLACE ORDER </Link></button>
                        </div>

                     <div className="col-md-4">
  {/* Billing Details */}
  <div className="billing-details">
    <div className="section-title">
      <h3 className="title">Billing address</h3>
    </div>
    <div className="form-group">
      <input className="input" type="text" name="first-name" placeholder="First Name" />
    </div>
    <div className="form-group">
      <input className="input" type="text" name="last-name" placeholder="Last Name" />
    </div>
    <div className="form-group">
      <input className="input" type="email" name="email" placeholder="Email" />
    </div>
    <div className="form-group">
      <input className="input" type="text" name="address" placeholder="Address" />
    </div>
    <div className="form-group">
      <input className="input" type="text" name="city" placeholder="City" />
    </div>
    <div className="form-group">
      <input className="input" type="text" name="country" placeholder="Country" />
    </div>
    <div className="form-group">
      <input className="input" type="text" name="zip-code" placeholder="ZIP Code" />
    </div>
    <div className="form-group">
      <input className="input" type="tel" name="tel" placeholder="Telephone" />
    </div>
    <div className="form-group">
      <div className="input-checkbox">
        <input type="checkbox" id="create-account" />
        <label htmlFor="create-account">
          <span />
          Create Account?
        </label>
        <div className="caption">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
          <input className="input" type="password" name="password" placeholder="Enter Your Password" />
        </div>
      </div>
    </div>
  </div>
  {/* /Billing Details */}
  {/* Shiping Details */}
  <div className="shiping-details">
    <div className="section-title">
      <h3 className="title">Shiping address</h3>
    </div>
    <div className="input-checkbox">
      <input type="checkbox" id="shiping-address" />
      <label htmlFor="shiping-address">
        <span />
        Ship to a diffrent address?
      </label>
      <div className="caption">
        <div className="form-group">
          <input className="input" type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="form-group">
          <input className="input" type="text" name="last-name" placeholder="Last Name" />
        </div>
        <div className="form-group">
          <input className="input" type="email" name="email" placeholder="Email" />
        </div>
        <div className="form-group">
          <input className="input" type="text" name="address" placeholder="Address" />
        </div>
        <div className="form-group">
          <input className="input" type="text" name="city" placeholder="City" />
        </div>
        <div className="form-group">
          <input className="input" type="text" name="country" placeholder="Country" />
        </div>
        <div className="form-group">
          <input className="input" type="text" name="zip-code" placeholder="ZIP Code" />
        </div>
        <div className="form-group">
          <input className="input" type="tel" name="tel" placeholder="Telephone" />
        </div>
      </div>
    </div>
  </div>
  {/* /Shiping Details */}
  {/* Order notes */}
  <div className="order-notes">
    <textarea className="input" placeholder="Order Notes" defaultValue={""} />
  </div>
  {/* /Order notes */}
</div>



                        {/* /Order Details */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /SECTION */}

            <Newsletter />
            <Footer />
        </>
    )
}