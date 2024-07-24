import Header from "../components/Header";
import Footer from "../components/Footer";

const Mint = () =>{

    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] md:w-[380px] h-full">
                <Header/>
                <div className="h-full">
                    <div className="mt-8 px-2">
                        <div className="border-2 border-[#304053] shadow-sm w-full h-60 rounded-lg">
                            <div className="py-1 w-full rounded-t-md bg-[#304053] text-center">
                                <span className="text-xl">NFT PET</span>
                            </div>
                            <div className="px-3">
                                <div className="mt-5 flex flex-row gap-5 items-center justify-between">
                                    <div className="p-3 rounded-md border-2 border-[#304053] items-center flex justify-center">
                                        <img width={90} height={90} src="/assets/animation/blackdragon/1.gif" alt="pet" />
                                    </div>
                                    <div className="border-t-2 border-[#304053] w-full text-black">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-[#00000075]">NAME</span>
                                                <span>DRAGON BLACK</span>
                                            </div>
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-[#00000075]">Status</span>
                                                <span>HAPPY</span>
                                            </div>
                                            <div className="flex flex-row justify-between items-center">
                                                <span className="text-[#00000075]">TOB</span>
                                                <span>3 HOURS</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-3 border-t-2 border-[#304053] w-full "/>
                                <div className="mt-1 flex flex-row justify-between items-center text-black">
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-between items-center gap-3">
                                            <span className="text-[#00000075]">POINTS</span>
                                            <span>0</span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center">
                                            <span className="text-[#00000075]">LEVEL</span>
                                            <span>0</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row justify-between items-center gap-2">
                                            <span className="text-[#00000075]">STAR</span>
                                            <span>0</span>
                                        </div>
                                        <div className="flex flex-row justify-between items-center gap-3">
                                            <span className="text-[#00000075]">TOD</span>
                                            <span>3h:40m:28s</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2">
                            <p className="text-black">Next Mint: 00:00:00</p>
                        </div>
                        <div className="mt-5 flex flex-row justify-center">
                            <button className="w-44 px-3 py-2 bg-[#304053] rounded-lg">
                                <span className="font-semibold">MINT</span>
                            </button>
                        </div>
                        <div className="h-52 w-full">

                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Mint;