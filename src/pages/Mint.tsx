import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import TabsMint from "@/components/TabsMint";
import MintNFT from "@/components/MintNFT";
import Swap from "@/components/Swap";
import Settings from "@/components/Settings";
import { useLocation } from "react-router-dom";

const Mint = () =>{
    const params = useLocation();
    const [currentIndex, setCurrentIndex] = useState<number>(params.search?Number(params.search.replace("?tab=","")):0)
    
    console.log(params.search)

    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <Header/>
            <div className="bg-[#e5f2f8] screen w-full h-full">
                
                <div className="h-full">
                    <div className="mt-4 px-2">
                        <div className="mb-5">
                            <TabsMint setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}/>
                        </div>
                        {currentIndex==0?(
                            <MintNFT/>
                        ):currentIndex==1?(
                            <Swap/>
                        ):currentIndex==2&&(
                            <Settings/>
                        )}
                    </div>
                    <div className="clear"/>
                </div>
                
                <Footer/>
                
            </div>
        </div>
    )
}

export default Mint;