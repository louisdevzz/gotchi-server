import { useState,useEffect } from "react";
import { HereWallet } from "@here-wallet/core";
import { initHere,signOut,signIn } from "@/hooks/hereWallet";

const Header = () =>{
    const [account,setAccount] = useState<string|null>(null);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [status, setStatus] = useState<string|null>(null);
    const namePet = localStorage.getItem("namePet")??"-";
    let here: HereWallet;

    useEffect(()=>{
        loadAccount()
    },[])

    const loadAccount = async() =>{
        try{
            here = await initHere();
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
    
    const handlelogout = async () => {
        here = await initHere();
        if(!here) return;
        if(await here.isSignedIn()) {
            await signOut()
            setAccount(null);
        }
        
    }

    const instantSignin = async () => {
        await signIn();
        const accounts = await here.getAccounts();
        if (accounts.length > 0) {
            setAccount(accounts[0]);
        }
    };

    const truncateString = (str: string)=>{
        const format = str.replace(".tg","");
        if(format.length > 6) return format.slice(0,2)+'...'+format.slice(-2)+".tg";
        return format+".tg"
    }
    
    const onChangeName = () =>{
        setStatus("CHANGE SUCCSEFFULL!")
        setTimeout(function(){
            setStatus(null)
        },1200)
        setIsShow(false)
    }

    return(
        <div className="sticky w-full top-0 z-10 md:rounded-t-lg">
            {status&&(
                    <div className="fixed z-50 bg-[#97b5d5] w-60 h-10 top-5 left-[52%] rounded-lg border-2 border-[#e5f2f8] shadow-sm transform -translate-x-1/2 transition-all delay-75">
                        <div className="flex flex-row w-full px-3 items-center h-full gap-2">
                            <img width={22} src="/assets/icon/success.svg" alt="success" />
                            <small className="text-[#2d3c53] text-sm font-semibold">{status}</small>
                        </div>
                    </div>
                )}
            {
                isShow&&(
                    <div className="fixed h-screen w-full bg-black bg-opacity-45 z-40 overflow-hidden overscroll-none">
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#e5f2f8] pb-5 w-[375px] rounded-lg">
                            <div className="flex flex-row justify-between items-center w-full bg-[#2d3c53] h-12 rounded-t-lg px-3">
                                <span>Change Name Pet</span>
                                <button onClick={()=>setIsShow(false)}>
                                    <img width={35} src="/assets/icon/close.svg" alt="close" />
                                </button>
                            </div>
                            <div className="px-3 mt-5 flex flex-col gap-1 text-black">
                                <label htmlFor="name">Name Pet</label>
                                <input type="text" placeholder="Enter new name" className="px-3 py-2 border-2 outline-none rounded-lg border-gray-300 focus:border-[#2d3c53] hover:border-[#2d3c53]" />
                            </div>
                            <div className="flex justify-end px-3 mt-7">
                                <button onClick={onChangeName} className="px3 py-2 w-32 rounded-lg h-12 bg-[#2d3c53] hover:bg-opacity-90">
                                    <span>Change</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
            <div className="border-b border-gray-300 h-20 w-full bg-[#2d3c53] relative">
                <div className="flex flex-row justify-between px-2 py-2">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row gap-2">
                            <img width={25} src="/assets/item/coin.png" alt="coin" />
                            <p className="text-[#fff]">0.01</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <img width={25} src="/assets/item/credit_card.png" alt="coin" />
                            <p className="text-[#fff]">19000</p>
                        </div>
                    </div>
                    <div onClick={()=>setIsShow(true)} className="flex flex-row gap-1 items-center -mt-1 ml-4">
                        <p className="text-[#fff]">{namePet}</p>
                        <img width={14} src="/assets/icon/pen.svg" alt="pen" />
                    </div>
                    <div className="flex flex-row gap-4 mt-5 items-center">
                    {
                        account?(
                        <div onClick={handlelogout} className="px-2 cursor-pointer py-0.5 h-8 rounded-full bg-[#a9c6e4]">
                            <small className="">{truncateString(account)}</small>
                        </div>
                        ):(
                        <button onClick={instantSignin} className="px-2 h-8 rounded-full bg-[#a9c6e4]">
                            <small className="font-semibold">Connect</small>
                        </button>
                        )
                    }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header;