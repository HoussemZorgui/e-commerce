import product06 from '../../assests/product06.png'

export default () => {
    return (
        <>
            {/* SECTION */}
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        {/* section title */}
                        <div className="col-md-12">
                            <div className="section-title">
                                <h3 className="title">Top selling</h3>
                                <div className="section-nav">
                                    <ul className="section-tab-nav tab-nav">
                                        <li className="active"><a data-toggle="tab" href="#tab2">Laptops</a></li>
                                        <li><a data-toggle="tab" href="#tab2">Smartphones</a></li>
                                        <li><a data-toggle="tab" href="#tab2">Cameras</a></li>
                                        <li><a data-toggle="tab" href="#tab2">Accessories</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* /section title */}
                        {/* Products tab & slick */}
                        <div className="col-md-4 col-xs-6">
                            <div className="row">
                                <div className="products-tabs">
                                    {/* tab */}
                                    <div id="tab2" className="tab-pane fade in active">
                                        <div className="products-slick" data-nav="#slick-nav-2">
                                            {/* product */}
                                            <div className="product">
                                                <div className="product-img">
                                                    <img className="img-fluid" src={`${product06}`} alt />
                                                    <div className="product-label">
                                                        <span className="sale">-30%</span>
                                                        <span className="new">NEW</span>
                                                    </div>
                                                </div>
                                                <div className="product-body">
                                                    <p className="product-category">Category</p>
                                                    <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                                    <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                                    <div className="product-rating">
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                        <i className="fa fa-star" />
                                                    </div>
                                                    <div className="product-btns">
                                                        <button className="add-to-wishlist"><i className="fa fa-heart-o" /><span className="tooltipp">add to wishlist</span></button>
                                                        <button className="add-to-compare"><i className="fa fa-exchange" /><span className="tooltipp">add to compare</span></button>
                                                        <button className="quick-view"><i className="fa fa-eye" /><span className="tooltipp">quick view</span></button>
                                                    </div>
                                                </div>
                                                <div className="add-to-cart">
                                                    <button className="add-to-cart-btn"><i className="fa fa-shopping-cart" /> add to cart</button>
                                                </div>
                                            </div>
                                            {/* /product */}
                                            {/* product */}
                                          
                                        </div>
                                        <div id="slick-nav-2" className="products-slick-nav" />
                                    </div>
                                    {/* /tab */}
                                </div>
                            </div>
                        </div>
                        {/* /Products tab & slick */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /SECTION */}
            {/* SECTION */}
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-4 col-xs-6">
                            <div className="section-title">
                                <h4 className="title">Top selling</h4>
                                <div className="section-nav">
                                    <div id="slick-nav-3" className="products-slick-nav" />
                                </div>
                            </div>
                            <div className="products-widget-slick" data-nav="#slick-nav-3">
                                <div>
                                    {/* product widget */}
                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product07.png" alt />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>
                                 
                                  
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-xs-6">
                            <div className="section-title">
                                <h4 className="title">Top selling</h4>
                                <div className="section-nav">
                                    <div id="slick-nav-4" className="products-slick-nav" />
                                </div>
                            </div>
                            <div className="products-widget-slick" data-nav="#slick-nav-4">
                                <div>
                                    {/* product widget */}
                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product04.png" alt />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>
                                  </div>
                            </div>
                        </div>
                        <div className="clearfix visible-sm visible-xs" />
                        <div className="col-md-4 col-xs-6">
                            <div className="section-title">
                                <h4 className="title">Top selling</h4>
                                <div className="section-nav">
                                    <div id="slick-nav-5" className="products-slick-nav" />
                                </div>
                            </div>
                            <div className="products-widget-slick" data-nav="#slick-nav-5">
                                <div>
                                    {/* product widget */}
                                    <div className="product-widget">
                                        <div className="product-img">
                                            <img src="./img/product01.png" alt />
                                        </div>
                                        <div className="product-body">
                                            <p className="product-category">Category</p>
                                            <h3 className="product-name"><a href="#">product name goes here</a></h3>
                                            <h4 className="product-price">$980.00 <del className="product-old-price">$990.00</del></h4>
                                        </div>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
            </div>
            {/* /SECTION */}

        </>
    )
}