import axiosApi from "../../config/axios";
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import { Button, message, Steps, theme } from 'antd';
import { useEffect, useState } from 'react';
import './addproducts.css';


export default () => {
    const [listcategory, setlistcategory] = useState([])
    const [Category, setCategory] = useState("")
    const [images , setImages]=useState([])
      const { token } = theme.useToken();
      const [current, setCurrent] = useState(0);
      const next = () => {
        setCurrent(current + 1);
      };
      const prev = () => {
        setCurrent(current - 1);
      };
     

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

const CategoriesStep=()=>{
return (
    <>
  <div className="row">
              {
  listcategory.map(c =>{
    return(
      <div onClick={()=>setCategory(c._id)}
      className={`category_item col-md-2 col-sm-1
      ${c._id === Category? 'category_selected' : ''}`}>
      <img className="cat_item"
      src={'http://localhost:5000/file/categories/'+c.file} alt="" />
        <span className="categoryname">{c.name}</span>
    </div>
    )
  }
  )
}
</div>
    </>
)
}

const handleImages=e=>{
  //copie de images
    let imgs=[]
  const {files} = e.target

  console.log(files, "files 67");
 // console.log(files ,  "files");
 let j=[...images].length + 1


 for(let i= 0 ; i<files.length ; i++){
  imgs.push({
    id:j +1 ,
      thumb:URL.createObjectURL(files[i]),
    file:files[i]
  })
  j+=1
 }
 setImages((prevImages)=>prevImages.concat(imgs))
 e.target=null
 console.log(imgs, "images 82");


}
const removeImage=id=>{
  let arr=[...images]
  let filtredim=arr.filter(i => i.id !== id)
  setImages(filtredim)
}
console.log(images, "images");
const ImagesStep=()=>{
    return (
        <>
        <div className="images">
          <div className="row">
            <input  onChange={handleImages} 
             type="file" id="uploadimages" hidden="true" multiple
             />
              {
              images.map(im=>{
                return( 
                  <div className="col-md-2 col-sm-4 image_item mt-4">
                      <img src={im.thumb}  alt="" />
                      <i class="las la-times-circle"onClick={()=>removeImage(im.id)} ></i>
                  </div>
                 )
              })
             } 
            <div onClick={()=>document.getElementById('uploadimages').click()}
            className="uploadinput m-3">
            <i className="las la-image"></i>
            </div>
          </div>
        </div>
  
        </>
    )
    }
const DetailsStep=()=>{
  const [details, setDetails]=useState({
    name:"",
    description:"",
    price:"",
    newproduct:"",
    qte:"",
  })
  const handleChange=e =>{
    const {value , name}=e.target
    setDetails(prev=>({
      ...prev , [name]:value
    }))
    localStorage.setItem('details',
    JSON.stringify({...details , [name]:value}))
  }
 
  return (
    <>
       <div className="section">
        <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="form-group">
                                    <input className="input" type="text" name="name" placeholder="Name" onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="description" placeholder="Description" onChange={handleChange} />
                                </div>
                             
                                 <div className="form-group">
                                    <input className="input" type="text" name="price" placeholder="Price" onChange={handleChange} />
                                </div>
                               
                                <div className="form-group">
                                    <input className="input" type="text" name="qte" placeholder="Quantity" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <input  type="checkbox" name="newproduct"  onChange={handleChange}value="new" />
                                    New Product
                                </div>
                          
                              
                              
                              


                            </div>
                        </div>
                     
                        </div>
                    </div>
        </div>
    </>
  )
}
const steps = [
    {
      title: 'Category',
      content: <CategoriesStep/>,
    },
    {
      title: 'Images',
      content: <ImagesStep/>,
    },
    {
      title: 'Details',
      content: <DetailsStep/>,
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
 
    marginTop: 16,
  };
  const addProduct=()=>{
    const data = new FormData()
    for ( let item of images){
      data.append('files', item.file)
      console.log('files',images)
      console.log(item.file,"item .file 194");
    }
    data.append('category', Category)
    console.log(Category,"Category")
    const product=JSON.parse(localStorage.getItem('details'))
    data.append('name', product.name)
    console.log(product.name,"name")
    data.append('description', product.description)
    console.log(product.description,"description")
    data.append('price', product.price)
console.log(product.price,"price")

data.append('qte',product.qte)
data.append('newproduct',product.newproduct)

    console.log(data,"data product")
    axiosApi.post("http://localhost:5000/products" , data)
    .then(res=> {
      setCategory()
      setImages([])
      localStorage.removeItem('details')
      setCurrent(0)
    }).catch(err =>{
      console.log(err.response);
    })
  }
    return (
        <>
        <Header/>
        <div className="section">
        <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="billing-details">
                            <div className="section-title">
                                    <h3 className="title">Add products </h3>
                                </div>

                                <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div
        style={{
          marginTop: 24,
        }}
      >
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() =>addProduct()}> 
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>

                    

                            </div>
                        </div>
                     
                        </div>
                    </div>
        </div>
        <Footer/>
        </>
    )
}