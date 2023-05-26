
import Newproduct from "../../components/NewProduct/newproduct"
import Newsletter from "../../components/Newsletter/newsletter"
import Section from "../../components/Section/section"
import Topselling from "../../components/TopSelling/topselling"
import Footer from "../../layouts/Footer/footer"
import Header from "../../layouts/Header/header"
import Navbar from "../../layouts/Navbar/navbar"

export default () => {
    return (
        <>
        <Header/>
        <Navbar/>
        <Section/>
        <Newproduct/>
    
        <Topselling/>
        <Newsletter/>
        <Footer/>
        </>
    )
}
