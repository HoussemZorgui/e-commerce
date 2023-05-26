import { useEffect, useState } from "react";
import axiosApi from "../../config/axios";
import { Button, Table } from "antd";
import {DeleteOutlined } from '@ant-design/icons';
import Header from "../../layouts/Header/header";
import Navbar from "../../layouts/Navbar/navbar";
import Footer from "../../layouts/Footer/footer";
export default () => {
    const Swal=require('sweetalert2')
    const [size, setSize] = useState('large');
    const [listcustomers, setlistcustomers] = useState([])
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
    const  allCustomers=async()=>{
        axiosApi.get("http://localhost:5000/users/items?items=Customer").then((res)=>{
            console.log("findAllUserByitems", res.data.data);
            if (res.status===200){
                setlistcustomers(res.data.data)
            }
        })
    }
    useEffect(()=>{
        allCustomers()
    },[])
    const deleteCustomer=(id)=>{
        axiosApi.delete("http://localhost:5000/users/"+id).then(res=>{
            let arr=[...listcustomers]
            setlistcustomers(arr.filter(c=>c._id !==id))
        }).catch(err=>{
            console.log("error delete customer",err.message);
        })
    }
    const columns = [
        {
          title: 'Name',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
      },
      {
        title: 'ZipCode',
        dataIndex: 'zipCode',
        key: 'zipCode',
    },
        {
          title: 'Delete',
          render:(text,record)=>
          <Button shape="round" icon={<DeleteOutlined/>} size={size} danger
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
            deleteCustomer(record._id)
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
        <Header/>
        <Navbar/>
        <div className="section">
        {/* container */}
        <div className="container">
          {/* row */}
          <div className="row">
          <div className="section-title ">
           <h3 className="title">List Of Customers </h3>
                                </div>
          <Table dataSource={listcustomers} columns={columns} />;
          </div>
          {/* /row */}
        </div>
        {/* /container */}
      </div>
        <Footer/>
        </>
    )
}












