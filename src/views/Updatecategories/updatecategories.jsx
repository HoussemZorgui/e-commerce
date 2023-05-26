import { useParams } from "react-router-dom"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import { useEffect, useState } from "react"
import axiosApi from "../../config/axios"

export default () => {
    const Swal = require('sweetalert2')
    const { id } = useParams()
    console.log("id", id);
    const [data, setdata] = useState({})
    const [file, setfile] = useState(null)

    const onChangeHandlerImage = (e) => {
        e.preventDefault()
        setfile(e.target.files[0])
    }

    useEffect(() => {
        axiosApi.get("http://localhost:5000/categories/" + id).then((res) => {
            console.log("dataofprod", res)
            setdata(res.data.data)
            console.log(res.data.data, "data");
        })
        //getbyid()
    }, [])
    const formData = new FormData();
    const updateCategory = (e) => {
        e.preventDefault()
        formData.append('name', data?.name);
        formData.append('description', data?.description);
        formData.append('file', file);
        console.log(formData, "formdata");
        Swal.fire({
            title: 'Do you want to save updated data!',
            showDenyButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                axiosApi.patch("http://localhost:5000/categories/" + id, formData).then((res) => {
                    setdata(res.data.data);
                    console.log(res)
                    /*  navigate('/listesCategories') */
                }).catch((err) => {
                    console.log(err.response)
                })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    return (
        <>
            <Header />
            <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Update Categories </h3>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="name" placeholder="Name" value={data.name}
                                        onChange={(e) => setdata({ ...data, name: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="description" placeholder="Description" value={data.description}
                                        onChange={(e) => setdata({ ...data, description: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="file" name="image" placeholder="Image" value={data.image}
                                        onChange={onChangeHandlerImage}

                                    />
                                </div>

                                <button class="primary-btn" onClick={updateCategory}> Update </button><br /><br />



                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="col-md-12 mb-3 mb-md-0">
                                <img style={{ marginTop: "9rem", marginLeft: "15rem" }}
                                    src={`http://localhost:5000/file/categories/${data.file}`}
                                    width="200px" height="200px" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}