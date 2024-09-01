
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/home';
import Store from './views/Store/store';
import Productdetails from './views/Productdetails/productdetails';
import Signup from './views/Signup/signup';
import Chekout from './views/Chekout/chekout';
import Signin from './views/Signin/signin';
import Contact from './views/Contact/contact';
import Listcategory from './views/Listcategory/listcategory';
import Addcategories from './views/Addcategories/addcategories';
import Addproducts from './views/Addproducts/addproducts';
import Viewcart from './views/Viewcart/viewcart';
import Privacypolicy from './views/Privacypolicy/privacypolicy';
import Updatecategories from './views/Updatecategories/updatecategories';
import Updateproducts from './views/Updateproducts/updateproducts';
import Listproduct from './views/Listproduct/listproduct';
import Listcustomers from './views/Listcustomers/listcustomers';
import Delivery from './views/Delivery/delivery';
import Facture from './views/Facture/facture';
import Profile from './views/Profile/profile';
import Updateprofile from './views/Updateprofile/updateprofile';
import chekout from './views/Chekout/chekout';







function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/store' element={<Store/>}/>
        <Route path='/productdetails/:id' element={<Productdetails/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/chekout' element={<Chekout/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/listcategory' element={<Listcategory/>}/>
        <Route path='/addcategories' element={<Addcategories/>}/>
        <Route path='/listproduct' element={<Listproduct/>}/>
        <Route path='/addproducts' element={<Addproducts/>}/>
        <Route path='/viewcart' element={<Viewcart/>}/>
        <Route path='/privacypolicy' element={<Privacypolicy/>}/>
        <Route path='/updatecategories/:id' element={<Updatecategories/>}/>
        <Route path='/updateproducts/:id' element={<Updateproducts/>}/>
        <Route path='/listcustomers' element={<Listcustomers/>}/>
        <Route path='/delivery' element={<Delivery/>}/>
        <Route path='/facture' element={<Facture/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile/:id' element={<Updateprofile/>}/>
       <Route path='/chekout' element={<Chekout/>}/>
      

      </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
