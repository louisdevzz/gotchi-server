import { callFunction, callFunctionST } from "@/hooks/hereWallet";
import { useState } from "react"

type Button = {
    name: string,
    url: string,
    width: number
}

const Tabs = ({petLists,index,setStatus}:{petLists:any,index:number,setStatus:any}) =>{
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const listButton = [
        {
            name:"water",
            url: "/assets/items/water.png",
            width: 20
        },
        {
            name:"beef",
            url: "/assets/items/beef.png",
            width: 40
        },
        {
            name:"shield",
            url: "/assets/items/shield.png",
            width: 40
        },
        {
            name:"holy water",
            url: "/assets/items/holy_water.png",
            width: 40
        }
    ];

    const onBuyAccessory = async(itemId:any) =>{
        try{
            setStatus("Loading...")
            const tx = await callFunctionST("buy_item",{"pet_id": petLists[index].pet_id, "item_id": itemId });
            setStatus("Buy successfull!")
            setTimeout(() => {
                setStatus(null)
            }, 1000);
            console.log("tx",tx)
        }catch(err){
            console.log(err)
        }
        // const tx = hereWallet.signAndSendTransaction({
        // receiverId: "game1.joychi.testnet",
        // actions: [
        //     {
        //     type: "FunctionCall",
        //     params: {
        //     methodName: "buy_item",
        //     args: {"pet_id": petLists[index].pet_id, "item_id": itemId },
        //     gas: BOATLOAD_OF_GAS,
        //     deposit: utils.format.parseNearAmount("0")!,//30000000000000000000000
        //     },
        //     },
        // ],
        // })
    }
    
    return(
        <div className="flex flex-col">
            <div className="mt-3 flex flex-row w-full justify-between items-center gap-5">
                {listButton.map((btn:Button,id:number)=>(
                    <button onClick={()=>setCurrentIndex(id)} key={id}>
                        <div className={`${currentIndex==id?"bg-[#628ab4]":"bg-[#a9c6e4]"} hover:bg-[#628ab4] p-2 h-16 w-16 flex justify-center rounded-lg`}>
                            <img width={btn.width} src={btn.url} alt={btn.name} />
                        </div>
                    </button>
                ))}
            </div>
            {currentIndex==0?(
                <div className="mt-3 bg-[#a9c6e4] w-full max-h-36 rounded-lg px-3 py-4">
                    <div className="flex flex-row justify-between w-full">
                        <p>BUY 1 {listButton[currentIndex].name}</p>
                        <p>1 JOY</p>
                    </div>
                    {/* <div className="flex flex-row justify-center w-full mt-2">
                        <p className="text-[#00000088]">50 PTS & 12 HOURS TOD</p>
                    </div> */}
                    <div className="flex flex-row justify-center w-full mt-2">
                        <button onClick={()=>onBuyAccessory(currentIndex+1)} className="bg-[#2f3b53] w-48 h-10 rounded-lg">
                            <span className="text-[#fff] font-semibold">BUY</span>
                        </button>
                    </div>
                </div>
            ):currentIndex==1?(
                <div className="mt-3 bg-[#a9c6e4] w-full max-h-36 rounded-lg px-3 py-4">
                    <div className="flex flex-row justify-between w-full">
                        <p>BUY 1 {listButton[currentIndex].name}</p>
                        <p>1 JOY</p>
                    </div>
                    {/* <div className="flex flex-row justify-center w-full mt-2">
                        <p className="text-[#00000088]">50 PTS & 12 HOURS TOD</p>
                    </div> */}
                    <div className="flex flex-row justify-center w-full mt-2">
                        <button onClick={()=>onBuyAccessory(currentIndex+1)} className="bg-[#2f3b53] w-48 h-10 rounded-lg">
                            <span className="text-[#fff] font-semibold">BUY</span>
                        </button>
                    </div>
                </div>
            ):currentIndex==2?(
                <div className="mt-3 bg-[#a9c6e4] w-full max-h-36 rounded-lg px-3 py-4">
                    <div className="flex flex-row justify-between w-full">
                        <p>BUY 1 {listButton[currentIndex].name}</p>
                        <p>1 JOY</p>
                    </div>
                    {/* <div className="flex flex-row justify-center w-full mt-2">
                        <p className="text-[#00000088]">50 PTS & 12 HOURS TOD</p>
                    </div> */}
                    <div className="flex flex-row justify-center w-full mt-2">
                        <button onClick={()=>onBuyAccessory(currentIndex+1)} className="bg-[#2f3b53] w-48 h-10 rounded-lg">
                            <span className="text-[#fff] font-semibold">BUY</span>
                        </button>
                    </div>
                </div>
            ):currentIndex==3&&(
                <div className="mt-3 bg-[#a9c6e4] w-full max-h-36 rounded-lg px-3 py-4">
                    <div className="flex flex-row justify-between w-full">
                        <p>BUY 1 {listButton[currentIndex].name}</p>
                        <p>1 JOY</p>
                    </div>
                    {/* <div className="flex flex-row justify-center w-full mt-2">
                        <p className="text-[#00000088]">50 PTS & 12 HOURS TOD</p>
                    </div> */}
                    <div className="flex flex-row justify-center w-full mt-2">
                        <button onClick={()=>onBuyAccessory(currentIndex+1)} className="bg-[#2f3b53] w-48 h-10 rounded-lg">
                            <span className="text-[#fff] font-semibold">BUY</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Tabs;