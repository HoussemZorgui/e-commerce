import { Link, useNavigate } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"
import signini from '../../assests/signin.png'
import { Formik } from "formik";
import * as Yup from "yup";
import axiosApi from "../../config/axios";

export default () => {
  const Swal=require('sweetalert2')
  const navigate=useNavigate()
  const SigninSchema = Yup.object().shape({

username: Yup.string().required("UserName required"),
password: Yup.string().required("Password required")
.min(6, "Password doit contenir minimum 6 caractéres")
          .required("Password Obligatoire"),



  });
  const signin=(data)=>{
axiosApi.post("http://localhost:5000/auth/signin", {

username:data.username,
password:data.password,


}).then(res=>{

  if(res.status===201){
    console.log("User Created");


  localStorage.setItem("user",JSON.stringify(res.data))
    navigate("/store")

 

}

}).catch(err=>{
  console.log(err.response, "Error signin customer")

})


  }
  
    return (
        <>
        <Header/>
        <Navbar/>
        <div className="section">
  <div className="container">
    <div className="row ">
      <div className="col-md-6 mt-5">
        <div className="billing-details">
          <div className="section-title">
            <h3 className="title">Sign in</h3>
          </div>
       

          <Formik
          initialValues={{
            username: "",
           
            password: "",
          
          }}
          validationSchema={SigninSchema}
          onSubmit={(values, { setSubmitting }) => {
            //alert(JSON.stringify(values, null, 2));
            console.log("vvvaaaaaallll", values);
            //!fonctionregister
            signin(values);
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
                                    <input className="input" type="password" name="password" placeholder="Password" 
                                     onChange={handleChange}
                                     onBlur={handleBlur}
                                     value={values.password}
                                    />
                                     {errors.password && touched.password ? (
                <span className="haserror">{errors.password}</span>
              ) : null}
                                </div>
                                

                                <button class="primary-btn"  type="submit"
                                 onClick={handleSubmit}>Sign in</button>
      

           
            </form>
          )}
        </Formik>
       <a href="#">Forgot Password</a> 
       <br/><br/>
           
           <br/>
            <div>
           <span> Don't have an account?   <Link to='/signup'> Sign up </Link></span>
           </div>
        </div>
      </div>
      <div className="col-md-6 text-center ">
        <div style={{alignItems:"center" , justifyContent:"center" , marginTop:"50px"}}>
        <img src={signini} alt="photo signin" width="250px"  height="250px"/>
      </div>
    </div>
  </div>
</div>
</div>
                   
                <Footer/>
        </>
    )
}