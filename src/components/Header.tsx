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
            <div className="border-b border-gray-300 h-16 w-full bg-[#2d3c53] relative">
                <div className="flex flex-row justify-between items-center px-2 py-2 pt-3">
                    <div className="flex flex-row items-center gap-5">
                        <div className="flex flex-row gap-2">
                            <img width={25} height={25} src="/assets/item/coin.png" alt="coin" />
                            <p className="text-[#fff]">0.01</p>
                        </div>
                        <div className="flex flex-row gap-2">
                            <img width={25} height={25} src="/assets/item/credit_card.png" alt="coin" />
                            <p className="text-[#fff]">19000</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-4 items-center">
                    {
                        account?(
                        <div onClick={handlelogout} className="px-2 cursor-pointer py-0.5 h-8 rounded-full bg-[#a9c6e4]">
                            <small className="text-white">{truncateString(account)}</small>
                        </div>
                        ):(
                        <button onClick={instantSignin} className="px-2 h-8 rounded-full bg-[#a9c6e4] text-white">
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