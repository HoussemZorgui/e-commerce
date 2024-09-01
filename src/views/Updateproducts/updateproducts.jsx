import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"
import Select from 'react-select';
export default () => {
    const Swal = require('sweetalert2')
    const { id } = useParams()
    const [data, setdata] = useState({})
    const navigate=useNavigate()
    useEffect(() => {
        axiosApi.get("http://localhost:5000/products/" + id).then((res) => {
            setdata(res.data.data)
        })
    }, [])
    const [files,setfiles]=useState(null)
      const [Image,setImage]=useState()
      const onChangeHandlerImage=(e)=>{
        e.preventDefault()
        setImage(e.target.files)
      }
      const [listecategories, setlistecategories] = useState([])
      const[selectListeCategories,setSelectListeCategories] = useState([])
      const [category,setcategory]=useState("");
      const styleData = {
        option: (provided, state) => ({
            ...provided,
            fontWeight: state.isFocused ? "bold" : "normal",
            color: state.isSelected ? "#FF4040" : "#181D38",
            backgroundColor: state.isSelected ? "#A0A0A0" : "#06BBCCz",
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: "black",
            icon: state.data.icon,
        }),
        control: (provided) => ({
            ...provided,
         borderColor:"#06BBCC",
         focus:"#06BBCC"
          }),
    };
      const allCategories = async () => {
        axiosApi.get("http://localhost:5000/categories").then((res) => {
          if(res.status === 200)
          {setlistecategories(res.data.data)}
        }
        )
      }
      useEffect(() => {
        allCategories();
      }, [])
      useEffect(() => {
        setSelectListeCategories(
            listecategories.map((res) => {
                //console.log(res);
                return {
                    label: res.name,
                    value: res._id,
                };
            })
        );
    }, [listecategories]);
      const formData = new FormData();
      const updateProduct = (e) => {
          e.preventDefault()
          formData.append('name', data?.name);
          formData.append('description', data?.description);
          formData.append('price', data?.price);
          formData.append('qte', data?.qte);
          formData.append('category',data?.category);
          formData.append('newproduct', data?.newproduct);
          for (let i = 0; i < Image?.length; i++){
            formData.append('files',Image[i])
          }
          console.log(formData, "FORMDATA UPDATE PRODUCT");
          Swal.fire({
              title: 'Do you want to save updated data!',
              showDenyButton: true,
              confirmButtonText: 'Save',
              denyButtonText: `Don't save`,
          }).then((result) => {
              if (result.isConfirmed) {
                  axiosApi.patch("http://localhost:5000/products/" +id, formData).then((res) => {
console.log(formData, "FORM DATAAAAAAAAA*****************************************************");
                      setdata(res.data.data);
                      navigate('/listproduct')
                  }).catch((err) => {
                      console.log(err.message)
                  })
              } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info')
              }
          })
      }
    return (
        <>
          <Header/>
        <div className="section">
        <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="billing-details">
                            <div className="section-title">
                                    <h3 className="title">Update products </h3>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="name" placeholder="Name"
                                    value={data.name}
                                    onChange={(e)=>setdata({ ...data, name: e.target.value })}/>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="description" placeholder="Description"
                                     value={data.description}
                                     onChange={(e)=>setdata({ ...data, description: e.target.value })}/>
                                </div>
                                 <div className="form-group">
                                    <input className="input" type="text" name="price" placeholder="Price"
                                     value={data.price}
                                     onChange={(e)=>setdata({ ...data, price: e.target.value })} />
                                </div>
                                 <div className="form-group">
                                        <Select placeholder="Select category"
                                        styles={styleData}
                                        options={selectListeCategories}
                                        onChange={(e)=>setdata({ ...data, category: e?.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="qte" placeholder="Quantity"
                                    value={data.qte}
                                    onChange={(e)=>setdata({ ...data, qte: e.target.value })}/>
                                </div>
                                   <div className="form-group">
                                   <input type="file" className="input" multiple  /* onChange={onChangeHandlerImage} */
                                   //onChange={(e)=>setdata({ ...data, images: e.target.files })}
                                   name="files" id="files" title="Browse file"
                                   onChange={onChangeHandlerImage} />
                                </div>
                                <div className="form-group">
                                    {
                                        data?.newproduct ==="new"
                                        ?
                                       ( <input  type="checkbox"
                                        name="newproduct" onChange={(e)=>setdata({ ...data, newproduct: e.target.value })} checked  value=""/>)
                                        :
                                        ( <input  type="checkbox"
                                        name="newproduct" onChange={(e)=>setdata({ ...data, newproduct: e.target.value })}  value="new"/>)
                                    }
                                    New Product
                                </div>
                                <button class="primary-btn"
                                onClick={updateProduct}> Update </button><br/><br/>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="col-md-12 mb-3 mb-md-0">
                                {
                                    data?.images?.map(i=>{
                                        return(
                                            <img style={{ marginTop: "9rem", marginLeft: "6rem" }}
                                            src={`http://localhost:5000/file/products/${i}`}
                                            width="200px" height="200px" />
                                        )
                                    })
                                }
                            </div>
                        </div>
                        </div>
                    </div>
        </div>
        <Footer/>
        </>
    )
}