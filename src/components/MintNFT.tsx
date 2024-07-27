'use client'
import { initHere } from "@/hooks/hereWallet"
import { HereWallet } from "@here-wallet/core"
import { utils } from "near-api-js"
import { useEffect, useState } from "react"


const MintNFT = () =>{
    const [account, setAccount] = useState<string|null>(null)
    const [namePet, setNamePet] = useState<string|null>("GREEN DRAGON")
    const [ATK, setATK] = useState<string|null>("100")
    const [DEF, setDEF] = useState<string|null>("100")
    const [image, setImage] = useState<string|null>("/assets/animation/greendragon/1.gif")
    const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
    const [status, setStatus] = useState<string|null>(null);

    useEffect(()=>{
        loadAccount()
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

    const onMintBlackDragon =() =>{
        setNamePet("BLACK DRAGON")
        setATK("100")
        setDEF("100")
        setImage("/assets/animation/blackdragon/1.gif")
    }

    const onMintGreenDragon =() =>{
        setNamePet("GREEN DRAGON")
        setATK("100")
        setDEF("100")
        setImage("/assets/animation/greendragon/1.gif")
    }

    const onMintDragon = async() => {
        try{
            const here = await HereWallet.connect();
            setStatus("Loading...")
            const tx = await here.silentSignAndSendTransaction({
                signerId: account as string,
                receiverId: import.meta.env.VITE_CONTRACT_GAME,
                actions: [
                {
                    type: "FunctionCall",
                    params: {
                    methodName: "create_pet",
                    args: {
                        "name": "PET",
                        "metadata": {
                        "title": "Dragon Green",
                        "description": "Power of dragon",
                        "media": "https://bafkreidmie2fie6k4x3dfrht5sq2wutgxxdsgkgouvyppesd3wvgqidpgm.ipfs.nftstorage.link/"
                        }
                    },
                    gas: BOATLOAD_OF_GAS,
                    deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
                    },
                },
                ],
            })
            setStatus("Mint Successful!")
            setTimeout(()=>{
                setStatus(null)
            },1000)
            console.log("succesfull",tx)
            localStorage.setItem("tx",tx.transaction)
        }catch(error){
            localStorage.setItem("err",error as string)
            console.log(error)
        }
	} 


    return(
        <>
            {status&&(
                <div className="fixed z-50 bg-[#97b5d5] w-60 h-10 top-5 left-[52%] rounded-lg border-2 border-[#e5f2f8] shadow-sm transform -translate-x-1/2 transition-all delay-75">
                    <div className="flex flex-row w-full px-3 items-center h-full gap-2">
                        <img width={22} src="/assets/icon/success.svg" alt="success" />
                        <small className="text-[#2d3c53] text-sm font-semibold">{status}</small>
                    </div>
                </div>
            )}
            <div className="border-2 border-[#304053] shadow-sm w-full h-44 rounded-lg">
                <div className="py-1 w-full rounded-t-md bg-[#304053] text-center">
                    <span className="text-xl">NFT PET</span>
                </div>
                <div className="px-3">
                    <div className="mt-5 flex flex-row gap-5 items-center justify-between">
                        <div className="p-3 rounded-md border-2 border-[#304053] items-center flex justify-center">
                            <img width={110} height={110} src={image as string} alt="pet" />
                        </div>
                        <div className="w-full text-black">
                            <div className="flex flex-col gap-2">
                                <div className="flex border-b-2 border-[#304053] flex-row justify-between items-center">
                                    <span className="text-[#00000075]">NAME</span>
                                    <span>{namePet}</span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[#00000075]">ATK</span>
                                    <span>{ATK}</span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[#00000075]">DEF</span>
                                    <span>{DEF}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-row justify-start gap-5 items-center mt-2">
                <div onClick={onMintBlackDragon} className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-3 rounded-lg" src="/assets/animation/blackdragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        BLACK DRAGON
                    </small>
                </div>
                <div onClick={onMintGreenDragon} className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-5 rounded-lg" src="/assets/animation/greendragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        GREEN DRAGON
                    </small>
                </div>
                {/* <div className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-2 rounded-lg" src="/assets/animation/blackdragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        DRAGON BLACK
                    </small>
                </div> */}
            </div>
            <div className="mt-3 flex flex-col gap-2 justify-center items-center border-2 border-[#304053] h-32 w-full rounded-lg">
                <div className="flex flex-col text-center -gap-2">
                    <span className="text-black">MINT 1 pet </span>
                    <span className="text-black">cost 2 token</span>
                </div>
                <button onClick={onMintDragon} className="w-44 h-12 px-3 py-2 bg-[#304053] rounded-lg">
                    <span className="font-semibold">MINT</span>
                </button>
            </div>
        </>
    )
}

export default MintNFT;