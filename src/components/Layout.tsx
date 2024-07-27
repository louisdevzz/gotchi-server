import Footer from "./Footer";
import Header from "./Header";

const Layout = () =>{
    return(
        <div className={`flex flex-col justify-center items-center w-full min-h-screen bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] screen h-full w-full md:w-[400px] md:rounded-lg md relative">
                <Header/>
                    <div className="h-full w-full flex layout flex-row justify-center items-center">
                        <section className="dots-container">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </section>
                    </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Layout;