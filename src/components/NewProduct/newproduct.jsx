import { useEffect, useState } from 'react'
import product01 from '../../assests/product01.png'

import "react-alice-carousel/lib/alice-carousel.css"
import axiosApi from '../../config/axios'

export default () => {
    const Swal=require('sweetalert2')
const [listenewproduct, setlistenewproduct]=useState([])
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  const allnewproduct=async()=>{
    axiosApi.get("http://localhost:5000/products/newproduct?newproduct=new").then((res)=>{
        console.log("findallnewproduct",res.data.data);
        if(res.status===200){
            setlistenewproduct(res.data.data)
        }

    })
  }
  useEffect(()=>{
    allnewproduct()
},[])


console.log("list new product" , listenewproduct);


    return (
        <>
          
            <div className="section">
             
                <div className="container">
              
                    <div className="row">
                    
                        <div className="col-md-12">
                            <div className="section-title">
                                <h3 className="title">New Products</h3>
                                <div className="section-nav">
                                    <ul className="section-tab-nav tab-nav">
                                        <li className="active"><a data-toggle="tab" href="#tab1">Laptops</a></li>
                                        <li><a data-toggle="tab" href="#tab1">Smartphones</a></li>
                                        <li><a data-toggle="tab" href="#tab1">Cameras</a></li>
                                        <li><a data-toggle="tab" href="#tab1">Accessories</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                   
                        <div className="col-md-12">
                            <div className="row">
                                <div className="products-tabs">
                             
                                    <div id="tab1" className="tab-pane active">
                                        <div className="products-slick" data-nav="#slick-nav-1" >


                                            {
                                                listenewproduct.map(p =>{
                                                    return (

                                            
                                    
                                        <div className="col-md-4 col-xs-6">
                                            <div className="product" >
                                                
                                                <div className="product-img">
                                                    <img className="img-fluid" src={'http://localhost:5000/file/products/' + p.images[0]} height="150px" alt />
         
                                                    <div className="product-label">
                                                        
                                                        <span className="new">{p.newproduct}</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category"></p>
                                                    <h3 className="product-name"><a href="#">{p.name}</a></h3>
                                                    <h4 className="product-price">{p.price} <del className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o" /><span className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange" /><span className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye" /><span className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart" /> add to cart</button>
                                                </div>
                                            </div>
                                       </div>
                                                    )
                                                })
                                            }
                                      
                                        <div id="slick-nav-1" className="products-slick-nav" />
                                    </div>
                             
                                </div>
                            </div>
                        </div>
                  
                    </div>
                  
                </div>
           
            </div>
        

       
        </div>
        </>
    )
}