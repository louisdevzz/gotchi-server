import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Mining = () =>{
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] screen h-full">
                <Header/>
                <div className="h-full">
                    <div className="mt-8 px-2">
                        <div className="border-2 border-[#304053] shadow-sm w-full h-60 rounded-lg">
                            <img width={70} className="w-full h-60 rounded-lg" src="https://giffiles.alphacoders.com/212/212460.gif" alt="" />
                        </div>
                        <div className="mt-2">
                            <p className="text-black">Next Mint: 00:00:00</p>
                        </div>
                        <div className="mt-5 pb-10 flex flex-row justify-between gap-3">
                            <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                                <div className="absolute -top-1 left-1 text-white">
                                    <small className="text-[0.75rem]">Tool</small>
                                </div>
                                <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                    <img width={40} src="/assets/tools/hamor.png" alt="hamor" />
                                </div>
                                <div className="mt-5 flex flex-col gap-1 px-2">
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Lucky: </small>
                                        <small>10%</small>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Power: </small>
                                        <small>10%</small>
                                    </div>
                                </div>
                            </div>
                            <div onClick={()=>setIsShowModal(true)}  className="h-44 w-36 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                                <div className="absolute -top-1 left-1 text-white">
                                    <small className="text-[0.75rem]">Tool</small>
                                </div>
                                <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                    <img width={40} src="/assets/tools/1.png" alt="hamor" />
                                </div>
                                <div className="mt-5 flex flex-col gap-1 px-2">
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Lucky: </small>
                                        <small>10%</small>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Power: </small>
                                        <small>10%</small>
                                    </div>
                                </div>
                            </div>
                            <div onClick={()=>setIsShowModal(true)}  className="h-44 w-36 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                                <div className="absolute -top-1 left-1 text-white">
                                    <small className="text-[0.75rem]">Tool</small>
                                </div>
                                <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                    <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                                </div>
                                <div className="mt-5 flex flex-col gap-1 px-2">
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Lucky: </small>
                                        <small>10%</small>
                                    </div>
                                    <div className="flex flex-row gap-4">
                                        <small className="text-black">Power: </small>
                                        <small>10%</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
            {
                isShowModal&&(
                    <div className="fixed top-0 min-h-screen overflow-hidden screen bg-black bg-opacity-60 z-50 flex justify-center items-center">
                <div className="bg-white mt-5 w-[95%] rounded-lg h-full flex flex-col p-2 pb-5">
                    <div className="flex justify-between flex-row">
                        <span className="text-black text-2xl">Tool Slot</span>
                        <button onClick={()=>setIsShowModal(false)}>
                            <img width={35} src="/assets/icon/close.svg" alt="close" />
                        </button>
                    </div>
                    <div className="flex flex-row justify-end items-center mt-1">
                        <button className="text-white bg-red-500 px-2 py-1 rounded-lg flex flex-row gap-2 items-center">
                            <img width={20} src="/assets/icon/close-btn.svg" alt="closeBtn" />
                            <span className="">Remove tool</span>
                        </button>
                    </div>
                    <div className="w-full h-full mt-5 flex flex-row flex-wrap gap-3 overflow-y-auto items-center justify-center">
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        <div className="h-44 w-28 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                            <div className="absolute -top-1 left-1 text-white">
                                <small className="text-[0.75rem]">Tool</small>
                            </div>
                            <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                <img width={40} src="/assets/tools/hoe.png" alt="hoe" />
                            </div>
                            <div className="mt-5 flex flex-col gap-1 px-2">
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Lucky: </small>
                                    <small>10%</small>
                                </div>
                                <div className="flex flex-row gap-4">
                                    <small className="text-black">Power: </small>
                                    <small>10%</small>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
                )
            }
        </div>
    )
}

export default Mining;