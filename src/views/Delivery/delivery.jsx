import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"
import delivery from '../../assests/delivery.png'
import './delivery.css'
import { Link } from "react-router-dom"
import { useState } from "react"

export default () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    return (
    <>
    <Header/>
    <Navbar/>
    
    <div className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="billing-details">
                                <div className="section-title">
                                    <h3 className="title">Delivery </h3>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="first-name" placeholder="Name"
                                        value={name} onChange={handleNameChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="email" name="last-name" placeholder="Email"
                                        value={email} onChange={handleEmailChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="number" name="first-name" placeholder="Phone"
                                        value={phone} onChange={handlePhoneChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="last-name" placeholder="Address"
                                        value={address} onChange={handleAddressChange}
                                    />
                                </div>
                              
                               
                                <button className="primary-btn">
                                    <Link to={{
                                        pathname: '/facture',
                                        state: {
                                            name: name,
                                            email: email,
                                            phone: phone,
                                            address: address
                                        }
                                    }}>Confirm</Link>
                                </button>
                                <br/><br/>
                                <div className="col-md-6 text-center  ">
                                    <div style={{ alignItems: "center", justifyContent: "center", marginTop: "50px" }}>
                                        <img src={delivery} alt="photo delivery" width="250px" height="250px" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
