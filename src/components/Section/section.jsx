import laptop from '../../assests/shop01.png'
import iphone from '../../assests/apple.png'
import sumsung from '../../assests/Samsung.png'



export default () => {
    return (
        <>
            {/* SECTION */}
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {/* shop */}
                        <div className="col-md-3 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={sumsung} alt height="175px" />
                                </div>
                                <div className="shop-body">
                                    <h3>Sumsung<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                                </div>
                                
                            </div>
                        </div>
                        {/* /shop */}
                        {/* shop */}
                        <div className="col-md-3 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src="./img/shop03.png" alt />
                                </div>
                                <div className="shop-body">
                                    <h3>Accessories<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                        {/* /shop */}
                        {/* shop */}
                        <div className="col-md-3 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src="./img/shop02.png" alt />
                                </div>
                                <div className="shop-body">
                                    <h3>Cameras<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="shop">
                                <div className="shop-img">
                                    <img src={iphone} alt height="175px" />
                                </div>
                                <div className="shop-body">
                                    <h3>Iphones<br />Collection</h3>
                                    <a href="#" className="cta-btn">Shop now <i className="fa fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                        </div>
                        
                        {/* /shop */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /SECTION */}

        </>
    )
}