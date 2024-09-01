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
const  Swal =require ('sweetalert2')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [size, setSize] = useState('large');
  const [listcategory, setlistcategory] = useState([])
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

  const allCategories=async()=>{
    axiosApi.get("http://localhost:5000/categories").then((res)=>{
      console.log("allcategories", res.data.data);


      if(res.status===200){
        setlistcategory(res.data.data)
      }
    })
  }
  useEffect(() => {
    allCategories()
  
  
  }, [])

  const deleteCategory=(id)=>{
    axiosApi.delete("http://localhost:5000/categories/" +id).then(res=>{
      let arr=[...listcategory]
      setlistcategory(arr.filter(c=>c._id !== id))
    }).catch(err=>{
      console.log("error delete category", err.message);
    })
  }
  




  const columns = [
    {
      title: 'Image',
      dataIndex: 'file',
      key: 'file',
      render:(text, record)=>(
        <img style={{height:'50px', width:'50px'}}
        src={'http://localhost:5000/file/categories/'+record.file}/>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
 
    {
      title: 'Update',
      render:(text , record) => 
      <Link to={`/updatecategories/${record._id}`}>
             <Button  shape="round" icon={<EditOutlined />} size={size}  style={{color:"#389E0D"}}
            />
            </Link>
     ,
      dataIndex: 'update',
      key: 'update',
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
        deleteCategory(record._id)
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
    } />,
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
                                    <Link to='/addcategories'>Add categories </Link>  </button>
                                  
            </div>
          <div className="section-title ">
           <h3 className="title">List Of Categories </h3>
                               
                                </div>
          <Table dataSource={listcategory} columns={columns} />;
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>

      



   
    

      <Footer />
    </>
  )
}