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
    const [isClaim, setIsClaim] = useState<boolean>(false)

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
                            <img width={70} className="w-full h-60 rounded-lg" src="/assets/background/mining-background.png" alt="gif" />
                            <img width={70} className="absolute top-[35%] left-[60%]" src="/assets/background/stone.png" alt="stone" />
                            <img width={150} className="absolute top-[25%] left-[35%]" src="/assets/pet/mining.gif" alt="mining" />
                            <button disabled={isDisable} onClick={onMining} className="text-white flex justify-center items-center flex-row font-semibold absolute bottom-0 py-3 rounded-lg left-1/2 transform -translate-x-1/2">
                                {/* {
                                    isDisable?(
                                        <CountDownTimer setIsDisable={setDisable} seconds={seconds}/>
                                    ):(
                                        <div className="flex flex-row gap-2">
                                            <img width={23} src="/assets/tools/mining.png" alt="mining"/>
                                            <span className="text-2xl">Claim</span>
                                        </div>
                                    )
                                } */}
                                {
                                    isDisable?(
                                        <CountDownTimer setIsDisable={setDisable} seconds={seconds}/>
                                    ):(
                                        isClaim?
                                        (
                                            <img width={550} src="/assets/button/claim-button.png" alt="claim" />
                                        ):(
                                            <img width={550} src="/assets/button/claim-button.png" alt="claim" />
                                        )
                                    )
                                }
                            </button>
                        </div>
                        {/* <div className="mt-2">
                            <p className="text-black">Next Mint: 00:00:00</p>
                        </div> */}
                        <div className="mt-5 pb-10 flex flex-row justify-between gap-3">
                            <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                            </div>
                            <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                            </div>
                            <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
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
                            <div className="w-full h-full mt-5 flex flex-row flex-wrap gap-5 gap-y-16 overflow-y-auto items-center justify-center">
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                                </div>
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                                </div>
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                                </div>
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                                </div>
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
                                </div>
                                <div onClick={()=>setIsShowModal(true)} className="h-44 w-36 shadow-lg ">
                                    <img width={100} className="w-full" src="/assets/tools/card-tool.png" alt="tool" />
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