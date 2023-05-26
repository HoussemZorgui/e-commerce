import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axiosApi from "../../config/axios"

export default () => {
    const [auth,setauth]= useState({})
    const navigate=useNavigate()

    useEffect(()=>{
        setauth(JSON.parse(localStorage.getItem("user")))
    },[])

    const logout=()=>{
        axiosApi.get("http://localhost:5000/auth/logout",
        {headers : {
            authorization:`Bearer ${auth?.tokens}`
        }}
        ).then(res=>{
            console.log("you are logged off");
            localStorage.removeItem('user')
            navigate("/signin")
        }).catch(err=>{
            console.log(err.response, "Error in logout");
        })
    }
    const [products,setproducts]=useState([])
    useEffect(() => {
        setproducts(JSON.parse(localStorage.getItem("products")))
    },[])
   // console.log(products,"products from local storage");

const [total, settotal]=useState(0)
useEffect(() => {
    let sum=0
    for(let item of products) {
        sum+=parseInt(item.price)
    }
    settotal(sum)
},[products])


    return (
        <>
            {/* HEADER */}
            <header>
                {/* TOP HEADER */}
                <div id="top-header">
                    <div className="container">
                        <ul className="header-links pull-left">
                            <li><a href="#"><i className="fa fa-phone" /> +021-95-51-84</a></li>
                            <li><a href="#"><i className="fa fa-envelope-o" /> email@email.com</a></li>
                            <li><a href="#"><i className="fa fa-map-marker" /> 1734 Stonecoal Road</a></li>
                        </ul>
                        <ul className="header-links pull-right">
                        {
                                auth ?
                                <li className="dropdown fa fa-user-o " >
                                <a className="dropdown-toggle" data-toggle="dropdown"
                                 aria-haspopup="true" aria-expanded="false"> {auth.firstName}</a>
                                <ul className="dropdown-menu">
                                <li><Link to='/profile' style={{color:"black" , cursor:"pointer"}}>
                                    Profile</Link></li>
                                <li ><a style={{color:"black" , cursor:"pointer"}}
                                  onClick={logout} >Logout</a></li>
                                </ul>
                            </li>
                                :
                                <li><Link to ='/signin'><i className="fa fa-user-o" /> My Account</Link></li>
                            }



















                        </ul>
                    </div>
                </div>
                {/* /TOP HEADER */}
                {/* MAIN HEADER */}
                <div id="header">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            {/* LOGO */}
                            <div className="col-md-3">
                                <div className="header-logo">
                                    <a href="#" className="logo">
                                        <img src="./img/logo.png" alt />
                                      
                                    </a>
                                </div>
                            </div>
                            {/* /LOGO */}
                            {/* SEARCH BAR */}
                            <div className="col-md-6">
                                <div className="header-search">
                                    <form>
                                        <select className="input-select">
                                            <option value={0}>All Categories</option>
                                            <option value={1}>Category 01</option>
                                            <option value={1}>Category 02</option>
                                        </select>
                                        <input className="input" placeholder="Search here" />
                                        <button className="search-btn">Search</button>
                                    </form>
                                </div>
                            </div>
                            {/* /SEARCH BAR */}
                            {/* ACCOUNT */}
                            <div className="col-md-3 clearfix">
                                <div className="header-ctn">
                                    {/* Wishlist */}
                                    <div>
                                        <a href="#">
                                            <i className="fa fa-heart-o" />
                                            <span>Your Wishlist</span>
                                            <div className="qty">2</div>
                                        </a>
                                    </div>
                                    {/* /Wishlist */}
                                    {/* Cart */}
                                    <div className="dropdown">
                                        <a className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                                            <i className="fa fa-shopping-cart" />
                                            <span>Your Cart</span>
                                            <div className="qty">{products?.length}</div>
                                        </a>
                                        <div className="cart-dropdown">
                                            <div className="cart-list">


                                                {
                                                    products?.map(p=>{
                                                        return(
                                                            <div className="product-widget">
                                                            <div className="product-img">
                                                                <img src={'http://localhost:5000/file/products/'+p?.images[0]} alt />
                                                            </div>
                                                            <div className="product-body">
                                                                <h3 className="product-name"><a href="#">{p?.name}</a></h3>
                                                                <h4 className="product-price"><span className="qty">{p?.price}</span>dt</h4>
                                                            </div>
                                                            <button className="delete"><i className="fa fa-close" /></button>
                                                        </div>

                                                        )
                                                    })
                                                }
                                              
                                              
                                            </div>
                                            <div className="cart-summary">
                                                <small>{products?.length} Item(s) selected</small>
                                                <h5>SUBTOTAL: {total}</h5>
                                            </div>
                                            <div className="cart-btns">
                                                <a href="/viewcart">View Cart</a>
                                                <a href="/chekout">Checkout  <i className="fa fa-arrow-circle-right" /></a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Cart */}
                                    {/* Menu Toogle */}
                                    <div className="menu-toggle">
                                        <a href="#">
                                            <i className="fa fa-bars" />
                                            <span>Menu</span>
                                        </a>
                                    </div>
                                    {/* /Menu Toogle */}
                                </div>
                            </div>
                            {/* /ACCOUNT */}
                        </div>
                        {/* row */}
                    </div>
                    {/* container */}
                </div>
                {/* /MAIN HEADER */}
            </header>
            {/* /HEADER */}

        </>
    )
}