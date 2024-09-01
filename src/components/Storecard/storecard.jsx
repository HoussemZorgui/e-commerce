import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosApi from "../../config/axios";

export default ({product}) => {

    console.log("props" , product);
   
    const [productbyid, setproductbyid] = useState({})
    const navigate=useNavigate()

    const getproductbyid =(id)=>{
        axiosApi.get("http://localhost:5000/products/" +id , {state:{id:id}})
        .then((res)=>{
            console.log(res.data.data,"products by id");
            if(res.status===200){
                navigate("/productdetails/"+id,{state:{id:id}})
                setproductbyid(res.data.data)
            }
        })
    }
    
    return (
        <>
            
  
         
                       
                       
                                {/* product */}
                                <div className="col-md-4 col-xs-6">
                                    <div className="product">
                                        <div className="product-img">
                                            <img  src={'http://localhost:5000/file/products/'+product.images[0]}  height="150px" alt />
                                            <div className="product-label">
                                                <span className="sale">-30%</span>
                                                <span className="new">NEW</span>
                                            </div>
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">{product?.category?.name}</p>
                                            <h3 className="product-name"><a href="#">{product?.name}</a></h3>
                                            <h4 className="product-price">{product.price} <del className="product-old-price">$990.00</del></h4>
                                            <div className="product-rating">
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                                <i className="fa fa-star" />
                                            </div>
                                            <div className="product-btns">
                                                <button className="add-to-wishlist"><i className="fa fa-heart-o" /><span className="tooltipp">add to wishlist</span></button>
                                              {/*   <button className="add-to-compare"><i className="fa fa-exchange" /><span className="tooltipp">add to compare</span></button> */}
                                                <button className="quick-view"><i className="fa fa-eye" 
                                                onClick={()=>getproductbyid(product._id)}/><span className="tooltipp">quick view</span></button>
                                            </div>
                                        </div>
                                        <div className="add-to-cart">
                                            <button className="add-to-cart-btn"><i className="fa fa-shopping-cart" /> add to cart</button>
                                        </div>
                                    </div>
                                </div>
                               
                         
        
          
      


        </>
    )
}