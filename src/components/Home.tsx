import { useEffect, useState } from "react";
// import { Silkscreen as FontSilkscreen} from "next/font/google"
import { HereWallet } from "@here-wallet/core";
import ImageSlider from "./ImageSlider";
import CountDownTimer from "./CountDownTimer";
import Footer from "./Footer";
import axios from "axios";
import {  utils } from "near-api-js";
import Tabs from "./Tabs";


// const Silkscreen = FontSilkscreen({
//     subsets: ["latin"],
//     weight:"400",
// })

const Home = () =>{
    const [accountId,setAccountId] = useState<string|null>(null);
    const [namePet,setNamePet] = useState<string>("DRAGON GREEN");
    const [petLists, setPetLists] = useState<any>([]);
    const [index, setIndex] = useState<number>(0);
    const [hereWallet, setHereWallet] = useState<any|null>(null)
    const BOATLOAD_OF_GAS = utils.format.parseNearAmount("0.00000000003")!;
    const [account,setAccount] = useState<string|null>(null);
    const [isShow, setIsShow] = useState<boolean>(false);
    const [status, setStatus] = useState<string|null>(null);
    const seconds = Number(localStorage.getItem("seconds"))??0;


    useEffect(()=>{
        localStorage.setItem("linkIndex",'0')
        FetchPet();
    },[])


    const instantSignin = async () => {
        const here = await HereWallet.connect();
        const account = await here.signIn({ contractId: "social.near" });
        console.log(`Hello ${account}!`);
    };
    const truncateString = (str: string)=>{
        const format = str.replace(".near","");
        if(format.length > 6) return format.slice(0,2)+'...'+format.slice(-2)+".near";
        return format+".near"
    }
    
    const onChangeName = () =>{
        setStatus("CHANGE SUCCSEFFULL!")
        setTimeout(function(){
            setStatus(null)
        },1200)
        setIsShow(false)
    }

    const FetchPet = async() =>{
        const pets = await axios.get("https://joygotchi.vercel.app/api/list_pet");
        //console.log("listpet",pets.data)
        setPetLists(pets.data)
        localStorage.setItem("namePet",pets.data[0].name)
        localStorage.setItem("seconds",JSON.stringify(pets.data[0].time_until_starving/10000000))
    }

    const onBuyAccessory = async(itemId:any) =>{
        const tx = hereWallet.signAndSendTransaction({
        receiverId: "game1.joychi.testnet",
        actions: [
            {
            type: "FunctionCall",
            params: {
            methodName: "buy_item",
            args: {"pet_id": petLists[index].pet_id, "item_id": itemId },
            gas: BOATLOAD_OF_GAS,
            deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
            },
            },
        ],
        })
        console.log("tx",tx)
    }

return(
    <div className={`flex flex-col justify-center items-center w-full min-h-screen bg-[#b8e3f8]`}>
        <div className="bg-[#e5f2f8] md:w-[390px] max-w-[390px] md h-full relative">
            <div className="w-full h-full sticky top-0 z-20">
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
                            <div className="px-2 py-0.5 h-8 rounded-full bg-[#a9c6e4]">
                                <small className="">{truncateString("justonly.near")}</small>
                            </div>
                            ):(
                            <button onClick={instantSignin} className="px-2 h-8 rounded-full bg-[#a9c6e4]">
                                <small className="font-semibold text-white">Connect</small>
                            </button>
                            )
                        }
                        </div>
                    </div>
                    <div className="px-3 py-2 w-[150px] rounded-full text-center absolute top-2/3 left-1/3  h-10 bg-[#f48f59]">
                        {/* <span>0h:57m:35s</span> */}
                        <CountDownTimer seconds={seconds}/>
                    </div>
                </div>
            </div>
            <div className="h-full max-w-[390px] flex flex-col flex-1 relative">
                <div className="p-3 h-full flex flex-col relative w-full">
                    <div className="flex flex-col">
                    <div className="mt-2 h-full">
                        <div className="w-full h-[250px] rounded-md flex justify-center flex-row relative">
                            <img width={60} className="w-full h-full rounded-md" src="/assets/background/screen_pet.png" alt="screen" />
                            <div className="flex flex-row justify-between">
                                {/* <img width={10} height={10} className="w-6 h-6 absolute top-1/2 left-[70px] " src="/assets/icon/arrow_left.png" alt="arrow" /> */}
                                {/* <img width={150} className="absolute top-1/2 left-[53%] transform -translate-x-1/2 -translate-y-1/2" src="/assets/pet/pet.png" alt="pet" /> */}
                                <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                <ImageSlider petList={petLists} changeName={setNamePet} setIndex={setIndex}/>
                                </div>
                                {/* <img width={10} height={10} className="w-6 h-6 absolute top-1/2 right-[60px] " src="/assets/icon/arrow_right.png" alt="arrow" /> */}
                            </div>
                            {/* <p className="text-[#fff] font-semibold absolute top-3/4 mt-3 left-1/2 transform -translate-x-1/2 ">Pet Name</p> */}
                        </div>
                    </div>
                    <div className="mt-2 bg-[#a9c6e4] w-full flex-row flex justify-between rounded-lg px-3 py-4">
                        <div className="flex flex-col text-center">
                            <p className="text-xl">{petLists.length > 0 ? petLists[index].reward_debt:"-"} NEAR</p>
                            <span className="text-[#00000088]">REWARDS</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">{petLists.length > 0 ? petLists[index].level:"-"}</p>
                            <span className="text-[#00000088]">LEVEL</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">{petLists.length > 0 ? petLists[index].status:"-"}</p>
                            <span className="text-[#00000088]">STATUS</span>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="text-xl">{petLists.length > 0 ? petLists[index].star:"-"}</p>
                            <span className="text-[#00000088]">STAR</span>
                        </div>
                    </div>
                    <Tabs/>
                    </div>
                </div>
                
            </div>
            <Footer/>
        </div>
    </div>
  )
}

export default Home;   