import { Link, useNavigate } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"

import { Formik } from "formik";
import * as Yup from "yup";
import axiosApi from "../../config/axios";
import signupm from '../../assests/signup.png'
import './signup.css'


export default () => {
    const Swal=require('sweetalert2')
    const navigate=useNavigate()

    const SignupSchema = Yup.object().shape({
        username: Yup.string().required("Username required"),
        firstName: Yup.string().required("Username required"),
        lastName: Yup.string().required("Username required"),
        city: Yup.string().required("Username required"),
        zipCode: Yup.string().required("Username required"),
        address: Yup.string().required("Username required"),
        email: Yup.string().email("Email Invalide").required("Email required"),
        phone: Yup.number().required("Telephone Obligatoire"),
        password: Yup.string()
          .min(6, "Password doit contenir minimum 6 caractéres")
          .required("Password Obligatoire"),
        passwordConfirm: Yup.string()
          .required("Confirmation Obligatoire")
          .oneOf([Yup.ref("password")],  
          "Mot de passe et confirmation doivent correspondre"),
    
        //tick: Yup.bool().oneOf([true], "Accept Ts & Cs is required"),
      });

      const signup=(data)=>{
        
        axiosApi.post("http://localhost:5000/users", {
             items:"Customer",
        firstName:data.firstName,
        lastName:data.lastName,
        username:data.username,
        password:data.password,
        email:data.email,
        phone:data.phone,
        address:data.address,
        city:data.city,
        zipCode:data.zipCode,}).then(res=>{
            console.log(res,"Res");
            if(res.status===201){
                console.log("User Created");
                Swal.fire(
                    'Success!',
                    'User Added Successfully',
                    'success'
                )
                navigate("/signin")
    
            }
        }).catch(err=>{
            console.log(err.response, "Error create employee")
            Swal.fire(
              'Error!',
              'Error create Customer',
              'error'
          )
        })
    } 
    return (
        <>

            <Header />
            <Navbar />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Sign up</h3>
                                </div>
                                <Formik
          initialValues={{
            username: "",
            firstName:"",
            lastName:"",
            address:"",
            city:"",
            zipCode:"",
            email: "",
            phone: "",
            password: "",
           // tick: false,
          }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            //alert(JSON.stringify(values, null, 2));
            console.log("vvvaaaaaallll", values);
            //!fonctionregister
            signup(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>

                                <div className="form-group">
                                    <input className="input" type="text" name="username" placeholder="UserName"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.username} 
                                     />
                                      {errors.username && touched.username ? (
                <span className="haserror">{errors.username}</span>
              ) : null}
                                </div>

                                <div className="form-group">
                                    <input className="input" type="text" name="firstName" placeholder="firstName" 
                                     
                                     
                                     
                                       onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.firstName}/>
                                     {errors.firstName && touched.firstName ? (
                <span className="haserror">{errors.firstName}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="lastName" placeholder="lastName"
                                       onChange={handleChange}
                                       onBlur={handleBlur}
                                       value={values.lastName} />
                                         {errors.lastName && touched.lastName ? (
                <span className="haserror">{errors.lastName}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="email" placeholder="Email"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.email} />
                                        {errors.email && touched.email ? (
                <span className="haserror">{errors.email}</span>
              ) : null}
                                </div>

                                <div className="form-group">
                                    <input className="input" type="text" name="city" placeholder="City"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.city} />
                                      {errors.city && touched.city ? (
                <span className="haserror">{errors.city}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="zipCode" placeholder="zipCode"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.zipCode} />
                                      {errors.zipCode && touched.zipCode ? (
                <span className="haserror">{errors.zipCode}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="phone" placeholder="phone"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.phone} />
                                      {errors.phone && touched.phone ? (
                <span className="haserror">{errors.phone}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="address" placeholder="adress"
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.address} />
                                      {errors.address&& touched.address ? (
                <span className="haserror">{errors.address}</span>
              ) : null}
                                </div>
                                
                                
                                <div className="form-group">
                                    <input className="input" type="password" name="password" placeholder="Password" 
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.password}
                                    />
                                     {errors.password && touched.password ? (
                <span className="haserror">{errors.password}</span>
              ) : null}
                                </div>
                                <div className="form-group">
                                    <input className="input" type="password" name="passwordConfirm" placeholder="Confirm Password" 
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.passwordConfirm}/>
                                     {errors.passwordConfirm && touched.passwordConfirm ? (
                <span className="haserror">{errors.passwordConfirm}</span>
              ) : null}
                                </div>

                                <button class="primary-btn"  type="submit"
                                 onClick={handleSubmit}>Sign up</button>
      

           
            </form>
          )}
        </Formik>
                              
                               
                              
                             
                               <div>
                              <span> Already have an account?   <Link to='/signin'> Sign in </Link></span>
                              </div>
                            </div>
                        </div>
                 

                        <div className="col-md-6 text-center  ">
                            <div style={{ alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
                                <img src={signupm} alt="photo signup" width="250px" height="250px" />
                            </div>
                        </div> 
                    </div>
                </div>
            </div>


            <Footer />







        </>
    )
}