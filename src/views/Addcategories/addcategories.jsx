import { Link } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import axiosApi from "../../config/axios"
import Swal from "sweetalert2"
import { useState } from "react"
import { apis } from "../../config/apisUrl"

export default () => {
    const Swal=require('sweetalert2')
    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [file, setfile] = useState("")

    const addCategory=()=>{
        let data = new FormData()
        data.append("name",name)
        data.append("description",description)
        data.append("file",file)
        console.log(data,"data");

        axiosApi.post("http://localhost:5000/categories",data).then(res=>{
            console.log(res,"Res");
            if (res.status===201){
                Swal.fire(
                    "Success!",
                    'Category Added Successfully !',
                    'success'
                )
            }
        }).catch(err=>{
            console.log(err.message);
            Swal.fire(
                'Error!',
                'error',(err.message)
            )
        })
    }

    return (

        <>
        <Header/>
          <div   className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Add Categories </h3>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="first-name" placeholder="Name"
                                    onChange={(e)=>setname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="last-name" placeholder="Description" 
                                    onChange={(e)=>setdescription(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="file" name="email" placeholder="Image"
                                    onChange={(e)=>setfile(e.target.files[0])} />
                                </div>
                              
                                <button class="primary-btn" onClick={addCategory}> Add </button><br/><br/>

                                <a href="/listcategory"  style={{fontSize:'20px'}}>Click here to see the list of categories</a>



                            </div>
                        </div>
                     
                        </div>
                    </div>
                </div>
        
        <Footer/>
        </>
    )
}