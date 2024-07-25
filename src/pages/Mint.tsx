import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import TabsMint from "@/components/TabsMint";
import MintNFT from "@/components/MintNFT";
import Swap from "@/components/Swap";
import Settings from "@/components/Settings";


const Mint = () =>{
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] screen w-full h-full">
                <Header/>
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
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Mint;