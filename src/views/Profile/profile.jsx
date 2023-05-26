import { Link, useNavigate } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"

import axiosApi from "../../config/axios";
import { useEffect, useState } from "react";
import {Modal } from 'antd';



export default () => {
    const Swal=require('sweetalert2')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const navigate=useNavigate()
    const [auth, setauth] = useState({})
//const [id, setid] = useState()
     useEffect(() => {
         setauth(JSON.parse(localStorage.getItem("user")))
    
    
     }, [])
     console.log(auth, "AUTH");
     

   /*   useEffect(() => {
        setid(auth?.id)
     }, []) */
     console.log(auth?.id , "IDDDDDDDD USER");
    



  

  
    return (
        <>

            <Header />
            <Navbar />
         
           
         <section >
  <div className="container py-5">
    <div className="row">
      
    </div>
    <div className="row">
    <div className="billing-details">
    <div className="section-title">
                                    <h3 className="title">Profile</h3>
                                </div>
                                </div>
      <div className="col-lg-4">
        <div className="card mb-4">
          <div className="card-body text-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar" className="rounded-circle img-fluid " style={{width: 150}}  />
            <h5 className="my-3">{auth?.user?.firstName}</h5>
            <p className="text-muted mb-1">{auth?.user?.lastName}</p>
            <p className="text-muted mb-4">{auth?.user?.address}</p>
            <div className="d-flex justify-content-center mb-2">
             <Link to={`/updateprofile/${auth?.user?._id}`}>
              <button type="button" className="primary-btn">Update</button>
            </Link> 
            </div>
          </div>
        </div>
    
      </div>
      <div className="col-lg-8">
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">User Name</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{auth?.user?.username}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Email</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{auth?.user?.email}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">Phone</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{auth?.user?.phone}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">City</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{auth?.user?.city}</p>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <p className="mb-0">ZipCode</p>
              </div>
              <div className="col-sm-9">
                <p className="text-muted mb-0">{auth?.user?.zipCode}</p>
              </div>
            </div>
           
          </div>
        </div>
       
      </div>
    </div>
  </div>
</section>

 
         


     

            <Footer />







        </>
    )
}