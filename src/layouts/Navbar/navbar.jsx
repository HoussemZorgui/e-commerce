/* import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default () => {


    const [auth, setauth] = useState({})
    useEffect(() => {
        setauth()


    
    }, [])
    
    return (
        <>

            <nav id="navigation">

                <div className="container">

                    <div id="responsive-nav">

                        <ul className="main-nav nav navbar-nav">
                            <li className="active"><Link to='/'>Home</Link></li>
                            <li><Link to='/store' >Store</Link></li>
                            <li><Link to='/contact'>Contact</Link></li>



                            {

                            }
                           <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">Dashborad</a>
                                    <ul className="dropdown-menu"> 
                                    <li><Link to='/addcategories'>Add Categoy</Link></li>
                                    <li><Link to='/listcategory'>List of Categories</Link></li>

                                    
                                    <li><Link to='/addproducts'>Add Product</Link></li>

                                    <li><Link to='/listproduct'>list of Products</Link></li>
                                    <li><Link to='/listcustomers'>List of Customers</Link></li>
                                    <li><Link to=''>Orders</Link></li>
                                    </ul>
                                </li> 
                          
                       
                 






                        </ul>

                    </div>

                </div>

            </nav>

        </>
    )
}
 */

import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
export default () => {
    const [auth, setauth] = useState({})
   // const [role, setrole] = useState("")
    useEffect(() => {
        setauth(JSON.parse(localStorage.getItem("user")))
        //setrole(auth.items)
    }, [])
    //console.log(auth , "auth local storage");
   //const role =auth?.items
//console.log("role" ,auth?.items);
    //console.log(auth , "AUTH USER NAVBAR");
    return (
        <>
            <nav id="navigation">
                <div className="container">
                    <div id="responsive-nav">
                        <ul className="main-nav nav navbar-nav">
                            <li className="active"><Link to='/'>Home</Link></li>
                            {
                                auth?.items=="Admin" ?
                                ""
                                :
                                (
                                    <>
                                <li><Link to='/store' >Store</Link></li>
                                <li><Link to='/contact'>Contact</Link></li>
                                </> )
                            }
                          {
                                auth?.items=="Admin" ?
                            <li className="dropdown">
                                    <a className="dropdown-toggle" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">Dashborad</a>
                                    <ul className="dropdown-menu">
                                    <li><Link to='/addcategories'>Add Categoy</Link></li>
                                    <li><Link to='/listcategory'>List of Categories</Link></li>

                                    
                                    <li><Link to='/addproducts'>Add Product</Link></li>

                                    <li><Link to='/listproduct'>list of Products</Link></li>
                                    <li><Link to='/listcustomers'>List of Customers</Link></li>
                                    <li><Link to='chekout'>Orders</Link></li>
                                    </ul>
                                </li>
                                :""
}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}