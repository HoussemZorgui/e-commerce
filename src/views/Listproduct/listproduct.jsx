import { Modal, Table } from 'antd';
import Footer from '../../layouts/Footer/footer';
import Header from '../../layouts/Header/header';
import Navbar from '../../layouts/Navbar/navbar';
import { EditOutlined } from '@ant-design/icons';
import {DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Radio, Space } from 'antd';
import { useEffect, useState } from 'react';

import axiosApi from '../../config/axios';
import { apis } from '../../config/apisUrl';
import { Link } from 'react-router-dom';



export default () => {
  const Swal =require('sweetalert2')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [size, setSize] = useState('large');
  const [listproduct, setlistproduct] = useState([])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

 const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const AllProducts=async()=>{
    axiosApi.get("http://localhost:5000/products").then((res)=>{
      console.log("allproducts", res.data.data);


      if(res.status===200){
        setlistproduct(res.data.data)
      }
    })
  }
  useEffect(() => {
    AllProducts()
  
  
  }, [])
  
const deleteProduct=(id)=>{
    axiosApi.delete("http://localhost:5000/products/" +id).then(res=>{
      let arr=[...listproduct]
      setlistproduct(arr.filter(c=>c._id !== id))
    }).catch(err=>{
      console.log("error delete product", err.message);       
    })
  }



  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render:(text, record)=>(
        <img style={{height:'50px', width:'50px'}}
        src={'http://localhost:5000/file/products/'+record.images[0]}/>
      )
    },
    {
      title: 'Name',
      dataIndex:'name',
      key:'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: '',
        render: (text, record) => {
          console.log("record category",record?.category);
          return <>{record?.category?.name}</>;
        }
      },
     
    
      {
        title: 'Update',
        render:(text , record) =>
        <Link to={`/updateproducts/${record._id}`}>
        <Button shape="round" icon={<EditOutlined />} size={size} style={{color:"#389E0D"}} onClick={()=>showModal()}/>
        </Link>
      },
  
  
  
  
    {
      title: 'Delete',
      render:(text,record)=>
      <Button shape="round" icon={<DeleteOutlined />} size={size} danger
       onClick={()=>
      swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(record._id)
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
    }/>,
      dataIndex: 'delete',
      key: 'delete',
    },

    
  ];
  return (
    <>
      <Header />
      <Navbar />
      <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
          <div className='col-md-5' style={{marginBottom:"10px" , }}>
            <button className="btn btn-info" >
                                    <Link to='/addproducts'>Add product </Link>  </button>
                                  
            </div>
          <div className="section-title ">
                                    <h3 className="title">List Of Products </h3>

                                 
                                </div>
          <Table dataSource={listproduct} columns={columns} />;
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>

       <Modal title="Update Product" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="billing-details">
                              
                                <div className="form-group">
                                    <input className="input" type="text" name="name" placeholder="Name" />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="description" placeholder="Description" />
                                </div>
                             
                                 <div className="form-group">
                                    <input className="input" type="text" name="price" placeholder="Price" />
                                </div>
                                 <div className="form-group">
                                    <input className="input" type="text" name="category" placeholder="Category" />
                                </div>
                                   <div className="form-group">
                                    <input className="input" type="file" name="email" placeholder="Image" />
                                </div>
                              
                            </div>
                        </div>
                     
                        </div>
                    </div>
      </Modal>

      <Footer/>
      </>
  )}