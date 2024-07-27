import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CountDownTimer from "@/components/CountDownTimer";
import { callFunctionFT, initHere } from "@/hooks/hereWallet";
import { utils } from "near-api-js";
import { HereWallet } from "@here-wallet/core";

const Mining = () =>{
    const [account, setAccount] = useState<string|null>(null)
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [status, setStatus] = useState<string|null>(null);
    const [isDisable, setDisable] = useState<boolean>(localStorage.getItem('isDisable')?true:false);
    const oldSeconds = Number(localStorage.getItem("timeClaim")||0)
    const [seconds,setSeconds] = useState<number>(Math.abs(Math.floor((Date.now()-oldSeconds)/1000) - 60));
    const [error, setError] = useState<string|null>(null)

    useEffect(()=>{
        loadAccount()
        if(Math.floor((Date.now()-oldSeconds)/1000)>60){
            setDisable(false)
            localStorage.removeItem("isDisable")
        }
        if(localStorage.getItem("success")){
            setStatus(localStorage.getItem("success"))
            localStorage.removeItem("success")
            setTimeout(()=>{
                setStatus(null)
            },1000)
        }
        if(localStorage.getItem("error")){
            setError(localStorage.getItem("error"))
            localStorage.removeItem("error")
            setTimeout(()=>{
                setError(null)
            },1000)
        }
    },[account])

    const loadAccount = async() =>{
        try{
            const here = await initHere();
            if(!here) return;
            if(await here.isSignedIn()) {
                const accounts = await here.getAccounts(); // Ensure accounts are fetched correctly
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                }
            }
        }
        catch (error){
            console.error(error);
            throw error;
        }
    }

    const onMining = () =>{
        onClaim()
        setSeconds(60)
        setDisable(true)
        localStorage.setItem('isDisable','true')
        localStorage.setItem("timeClaim",Date.now().toString())
    }

    const onClaim = async() => {
        try{
            setStatus("Loading...")
            await callFunctionFT('get_joychi', {addr_to:account});
            localStorage.setItem("success","Claim Successfull!")
        }catch(err){
            console.error(err)
            localStorage.setItem("error",err as string)
        }
    } 

    //console.log("second",account)
    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] screen h-screen">
                <Header/>
                {status&&(
                    <div className="fixed z-50 bg-[#d4edda] w-60 h-10 top-5 left-[52%] rounded-lg border-2 border-[#c3e6cb] shadow-sm transform -translate-x-1/2 transition-all delay-75">
                        <div className="flex flex-row w-full px-3 items-center h-full gap-2">
                            <img width={22} src="/assets/icon/success.svg" alt="success" />
                            <small className="text-[#155724] text-sm font-semibold">{status}</small>
                        </div>
                    </div>
                )}
                {error&&(
                    <div className="fixed z-50 bg-[#f8d7da] w-60 h-10 top-5 left-[52%] rounded-lg border-2 border-[#FF0000] shadow-sm transform -translate-x-1/2 transition-all delay-75">
                        <div className="flex flex-row w-full px-3 items-center h-full gap-2">
                            <img width={22} src="/assets/icon/error.svg" alt="error" />
                            <small className="text-[#FF0000] text-sm font-semibold">{error}</small>
                        </div>
                    </div>
                )}
                <div className="h-full fix-screen">
                    <div className="mt-2 px-2">
                        <div className="border-2 border-[#304053] shadow-sm w-full h-60 rounded-lg relative">
                            <img width={70} className="w-full h-60 rounded-lg" src="https://giffiles.alphacoders.com/212/212460.gif" alt="gif" />
                            <button disabled={isDisable} onClick={onMining} className="text-white flex justify-center items-center flex-row gap-2 font-semibold bg-[#2d3c53] border boder-white absolute bottom-2 w-2/4 py-3 rounded-lg left-1/2 transform -translate-x-1/2">
                                {/* <img width={23} src="/assets/tools/mining.png" alt="mining"/>
                                <span className="text-2xl">Claim</span> */}
                                {
                                    isDisable?(
                                        <CountDownTimer setIsDisable={setDisable} seconds={seconds}/>
                                    ):(
                                        <div className="flex flex-row gap-2">
                                            <img width={23} src="/assets/tools/mining.png" alt="mining"/>
                                            <span className="text-2xl">Claim</span>
                                        </div>
                                    )
                                }
                                
                            </button>
                        </div>
                        {/* <div className="mt-2">
                            <p className="text-black">Next Mint: 00:00:00</p>
                        </div> */}
                        <div className="mt-5 pb-10 flex flex-row justify-between gap-3">
                            <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 flex items-center rounded-lg border-2 border-[#304053] bg-[#a9c6e4] bg-opacity-85 flex-col relative">
                                <div className="absolute -top-1 left-1 text-white">
                                    <small className="text-[0.75rem]">Tool</small>
                                </div>
                                <div className="rounded-lg mt-7 flex justify-center items-center bg-[#fff] w-16 h-16 ">
                                    <img width={40} src="/assets/tools/2.png" alt="hamor" />
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
                                    <img width={40} src="/assets/tools/3.png" alt="hamor" />
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
                                    <img width={40} src="/assets/tools/4.png" alt="hoe" />
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
                    <div className="clear"/>
                </div>
                <Footer/>
            </div>
            {
                isShowModal&&(
                    <div className="fixed top-0 min-h-screen overflow-hidden screen bg-black bg-opacity-60 z-50 flex justify-center items-center overflow-hidden">
                        <div className="bg-white h-[80vh] mt-5 w-[95%] rounded-lg h-full flex flex-col p-2 pb-5">
                            <div className="flex flex-col overflow-y-auto">
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
                                        <img width={40} src="/assets/tools/1.png" alt="hoe" />
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
                                        <img width={40} src="/assets/tools/2.png" alt="hoe" />
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
                                        <img width={40} src="/assets/tools/3.png" alt="hoe" />
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
                                        <img width={40} src="/assets/tools/4.png" alt="hoe" />
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
                                        <img width={40} src="/assets/tools/5.png" alt="hoe" />
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
                                        <img width={40} src="/assets/tools/6.png" alt="hoe" />
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
                    </div>
                )
            }
        </div>
    )
}

export default Mining;