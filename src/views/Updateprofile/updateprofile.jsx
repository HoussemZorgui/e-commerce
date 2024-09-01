import { useNavigate, useParams } from "react-router-dom"

import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"
import Navbar from "../../layouts/Navbar/navbar"
import Header from "../../layouts/Header/header"

export default () => {
    const { id } = useParams()
    const [profile, setprofile] = useState({})
    const Swal = require('sweetalert2')
    const navigate = useNavigate()
    useEffect(() => {
        axiosApi.get("http://localhost:5000/users/" + id).then((res) => {
           
            setprofile(res.data.data)
            console.log(res.data.data, "data usert updarte");
        })
      
    }, [])

    const updateProfile = (e) => {

        e.preventDefault()
        console.log(id, "IDDDDDDDDD UPDATEPRO");


        axiosApi.patch(`http://localhost:5000/auth/` + id, profile)
            .then(res => {
                console.log(res.data, "data user update");


                if (res.status === 200) {
                  localStorage.setItem("user",JSON.stringify(res.data))
                    console.log("profile updated");
                    Swal.fire(
                        'Success!',
                        'profile updated Successfully',
                        'success'
                    )

                    navigate("/store")

                }
            }).catch(err => {
                console.log(err.response, "Error update profile")
            })
    }
    return(
        <>
        <Header/>
        <Navbar/>
        <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center " data-wow-delay="0.1s">
          <div className="col-6"> 
            <h4 className="section-title bg-white text-center text-color px-4"> Edit Profile</h4>
          </div>
            <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <input type="text" className="form-control" id="firstName" placeholder="FirstName"
                    value={profile?.firstName}
                  
                    onChange={(e) => setprofile({ ...profile, firstName: e.target.value })}
                    />  
                  </div>
                  <div className="form-group">
                    <input type="text" className="form-control" id="lastName" placeholder="LastName"
                    value={profile?.lastName}
                  
                    onChange={(e) => setprofile({ ...profile, lastName: e.target.value })}
                    />  
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input type="text" className="form-control" id="username" placeholder="username"  name='userName'
                      value={profile?.username}
                  
                      onChange={(e) => setprofile({ ...profile, username: e.target.value })}
                    /> 
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input type="email" className="form-control" id="email" placeholder="Email" name='email'
                value={profile?.email}
                  
                onChange={(e) => setprofile({ ...profile, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="number" className="form-control" id="phone" placeholder="Phone" name='phone'
                       value={profile?.phone}
                  
                       onChange={(e) => setprofile({ ...profile, phone: e.target.value })}
                      />     
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" id="adress" placeholder="Adress" name='adress'
                         value={profile?.address}
                  
                         onChange={(e) => setprofile({ ...profile, address: e.target.value })}
                        />    
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="text" className="form-control" id="city" placeholder="City" name='city'
                    value={profile?.city}
                  
                    onChange={(e) => setprofile({ ...profile, city: e.target.value })}
                     />      
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input type="number" className="form-control" id="zipcode" placeholder="ZipCode"name='zipCode'
                     value={profile?.zipCode}
                  
                     onChange={(e) => setprofile({ ...profile, zipCode: e.target.value })}
                       />    
                  </div>
                </div>
                
                <div className="col-11">
                  <button className="btn btn-main btn-round-full" type="submit"     onClick={updateProfile}   >Save</button>
                </div>
              </div>
            </div>
             <div className="col-6">
              <div className="row justify-content-center align-items-center ml-5">
                <div>
                  <img /*  src={} */ alt className="img-fluid rounded" width="80%"  />
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