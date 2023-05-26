import Newsletter from "../../components/Newsletter/newsletter"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"

export default () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-7">
                            {/* Billing Details */}
                            <div className="billing-details ">
                                <div className="section-title ">
                                    <h3 className="title">Contact Us</h3>
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="full-name" placeholder="Enter your Full Name" />
                                </div>

                                <div className="form-group">
                                    <input className="input" type="email" name="email" placeholder="Enter Your Email Address" />
                                </div>
                                <div className="form-group">
                                    <input className="input" type="text" name="subject" placeholder="Enter Your Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea className="input" type="text" name="message" placeholder="Enter Your Message"  ></textarea>

                                </div>


                            </div>
                            <div>
                                <a href="#" className="primary-btn order-submit">Submit </a>
                            </div>

                        </div>
                        <br/><br/>
                        <div>
                            
                        <div className="col-md-5 order-details">
                            <div className=" text-center">
                               <i className="las la-home" style={{fontSize:'30px'}}/>

                                <div className="media-body">
                                    <h3>Buttonwood, jendouba</h3>
                                    <p>Rosemead, CA 91770</p>
                                </div>
                            </div>
                            <div className=" text-center">
                            <i className="las la-mobile" style={{fontSize:'30px'}}/>

                                <div className="media-body">
                                    <h3>+216 565 2365</h3>
                                    <p>Mon to Fri 9am to 6pm</p>
                                </div>
                            </div>
                            <div className=" text-center">
                               <i className="las la-envelope" style={{fontSize:'30px'}} />

                                <div className="media-body">
                                    <h3>support@colorlib.com</h3>
                                    <p>Send us your query anytime!</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>

<Newsletter/>

            <Footer />

        </>
    )
}