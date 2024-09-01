import { useLocation } from "react-router-dom"
import Newsletter from "../../components/Newsletter/newsletter"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"
import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"
import AliceCarousel from "react-alice-carousel"

export default () => {
  const location=useLocation()
  const [id,setId]=useState("")
  useEffect(()=>{
    setId(location.state.id)
    console.log("ID LOCATION", location.state.id);
    getproductbyid()
  },[])
  console.log(id,"ID PRODUCT");
  const [productbyid,setProductbyid]=useState({})

  const getproductbyid=(id=location.state.id)=>{
    axiosApi.get("http://localhost:5000/products/" + id)
    .then((res)=>{
      setProductbyid(res.data.data)
    })
  }
  console.log(productbyid,"PRODUCT BY ID");
    return(
        <>
        <Header/>
        <Navbar/>
        <div className="section">
    {/* container */}
    <div className="container">
      {/* row */}
      <div className="row">
        {/* Product main img */}
        <div className="col-md-5 col-md-push-2">
          <div id="product-main-img">
          <AliceCarousel autoPlay autoPlayInterval="1000">


{

  productbyid.images?.map(im => {
    return (
      <div className="product-preview" style={{width:"100%", height:"100%"}}>
      <img src={`http://localhost:5000/file/products/${im}`}  />
    </div>
    )
  })
}
</AliceCarousel>
          </div>
        </div>
        {/* /Product main img */}
        {/* Product thumb imgs */}
        <div className="col-md-2  col-md-pull-5">
          <div id="product-imgs">
          {

productbyid.images?.map(im => {
  return (
    <div className="product-preview" style={{width:"100%", height:"100%"}}>
    <img src={`http://localhost:5000/file/products/${im}`}  />
  </div>
  )
})
}
          
           
       
          </div>
        </div>
        {/* /Product thumb imgs */}
        {/* Product details */}
        <div className="col-md-5">
          <div className="product-details">
            <h2 className="product-name">{productbyid?.name}</h2>
            <div>
              <div className="product-rating">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star-o" />
              </div>
              <a className="review-link" href="#">10 Review(s) | Add your review</a>
            </div>
            <div>
              <h3 className="product-price">{productbyid?.price}<del className="product-old-price">$990.00</del></h3>
              <span className="product-available">In Stock</span>
            </div>
            <p>{productbyid?.description}</p>
         
            <div className="add-to-cart">
              <div className="qty-label">
                Qty
                <div className="input-number">
                  <input type="number" />
                  <span className="qty-up">+</span>
                  <span className="qty-down">-</span>
                </div>
              </div>
              <button className="add-to-cart-btn"><i className="fa fa-shopping-cart" /> add to cart</button>
            </div>
            <ul className="product-btns">
              <li><a href="#"><i className="fa fa-heart-o" /> add to wishlist</a></li>
            </ul>
            <ul className="product-links">
              <li>Category:</li>
              <li><a href="#">Headphones</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
            <ul className="product-links">
              <li>Share:</li>
              <li><a href="#"><i className="fa fa-facebook" /></a></li>
              <li><a href="#"><i className="fa fa-twitter" /></a></li>
              <li><a href="#"><i className="fa fa-google-plus" /></a></li>
              <li><a href="#"><i className="fa fa-envelope" /></a></li>
            </ul>
          </div>
        </div>
        {/* /Product details */}
        {/* Product tab */}
        <div className="col-md-12">
          <div id="product-tab">
            {/* product tab nav */}
            <ul className="tab-nav">
              <li className="active"><a data-toggle="tab" href="#tab1">Description</a></li>
             
            </ul>
            {/* /product tab nav */}
            {/* product tab content */}
            <div className="tab-content">
              {/* tab1  */}
              <div id="tab1" className="tab-pane fade in active">
                <div className="row">
                  <div className="col-md-12">
                    <p>{productbyid?.description}</p>
                  </div>
                </div>
              </div>
          
            </div>
            {/* /product tab content  */}
          </div>
        </div>
        {/* /product tab */}
      </div>
      {/* /row */}
    </div>
    {/* /container */}
  </div>

        <Newsletter/>
        <Footer/>
        </>
    ) }