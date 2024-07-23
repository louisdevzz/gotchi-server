import { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import BattleLayout from "./BattleLayout";


const Battle = () =>{
    
    const [petLists, setPetLists] = useState<any>([]);
    const [listOponent, setListOponent] = useState<any>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentIndexPet, setCurrentIndexPet] = useState<number>(0||Number(localStorage.getItem("indexPet")));
    const [isShow, setIsShow] = useState<boolean>(false);
    
    useEffect(()=>{
        FetchPet()
        FetchOponent()
    },[])
    const FetchPet = async() =>{
        const pets = await axios.get("http://localhost:8080/api/list_pet");
        //console.log("listpet",pets.data)
        setPetLists(pets.data)
    }
    const FetchOponent = async() =>{
        const oponents = await axios.get("http://localhost:8080/api/list_pet_battle");
        //console.log("listpet",pets.data)
        setListOponent(oponents.data)
    }

    const handlSelectPet = (idx: number) => {
        setCurrentIndexPet(idx);
        setIsShow(false);
    }

    //console.log(listOponent)

    return(
        <div className={`flex flex-col justify-center items-center w-full h-full bg-[#b8e3f8]`}>
            <div className="bg-[#e5f2f8] md:w-[380px] h-full">
                <Header/>
                <div className="mt-5 text-center flex justify-center flex-row">
                    <p className="text-black px-2 py-1 bg-slate-400 w-2/3 rounded-lg">Next Attack: 00:15:00</p>
                </div>
                <div className="px-2 relative">
                    {
                        petLists.length > 0 &&(
                            <div className="mt-2 bg-[#a9c6e4] p-3 relative rounded-lg flex flex-row justify-between items-center text-black">
                                <div className="flex flex-row items-center gap-2">
                                    {petLists.length > 0 &&(
                                        <img className="-mt-2" width={62} src={`/assets/animation/${petLists[currentIndexPet].category}/${petLists[currentIndexPet].pet_evolution_phase}.gif`} alt="pet" />
                                    )}
                                    <div className="flex flex-col">
                                        <p className="text-sm">{petLists[currentIndexPet].name}</p>
                                        <div className="flex flex-row gap-3">
                                            <div className="flex flex-col">
                                                <small>ATK: 100</small>
                                                <small>DEF: 100</small>
                                            </div>
                                            <div className="flex flex-col">
                                                <small>Status: {petLists[currentIndexPet].status}</small>
                                                <small>Score: {petLists[currentIndexPet].score}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={()=>setIsShow((prv)=>!prv)}>
                                    <img width={20} className="rotate-90" src="/assets/icon/arrow_right.png" alt="arrow" />
                                </button>
                            </div>
                        )
                    }
                    {
                        isShow &&(
                            <div className="mt-2 absolute border-2 p-2 border-slate-300 shadow-sm bg-slate-100 rounded-lg top-[15%] z-50 left-1/2 transform -translate-x-1/2 w-[95%] flex flex-col gap-2">
                                {petLists.length > 0&&petLists.map((pet:any,idx:number)=>(
                                    <div key={idx} onClick={()=>handlSelectPet(idx)} className="w-full bg-[#a9c6e4] px-1 py-2 cursor-pointer hover:bg-opacity-75 focus:bg-opacity-75 rounded-lg flex flex-row justify-between items-center text-black">
                                        <div className="flex flex-row items-center gap-2">
                                            <img className="-mt-2" width={62} src={`/assets/animation/${pet.category}/${pet.pet_evolution_phase}.gif`} alt="pet" />
                                            <div className="flex flex-col">
                                                <p className="text-sm">{pet.name}</p>
                                                <div className="flex flex-row gap-3">
                                                    <div className="flex flex-col">
                                                        <small>ATK: 100</small>
                                                        <small>DEF: 100</small>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <small>Status: {pet.status}</small>
                                                        <small>Score: {pet.score}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                    }
                    <div className="mt-2">
                        <div className="w-full h-[200px] rounded-md flex justify-center flex-row relative">
                            <img width={60} className="w-full h-full rounded-md" src="/assets/background/battle.png" alt="screen" />
                            {petLists.length > 0 &&(
                                <img width={70} className="absolute -top-2 left-[12%]" src={`/assets/animation/${petLists[currentIndexPet].category}/${petLists[currentIndex].pet_evolution_phase}.gif`} alt="pet" />
                            )}
                            <div className="flex flex-row justify-between">
                                <div className="absolute top-[52%] left-[63%] transform -translate-x-1/2 -translate-y-1/2">
                                    <BattleLayout petList={listOponent} setIndex={setCurrentIndex}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 bg-[#a9c6e4] w-full px-2 py-3 rounded-lg text-black">
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                                <small>ATK: 100</small>
                                <small>DEF: 100</small>
                            </div>
                            <div className="w-7 text-center flex justify-center ml-5">
                                <p className="text-sm">{listOponent.length > 0 ? listOponent[currentIndex].name : "-"}</p>
                            </div>
                            <div className="flex flex-col">
                                <small>Status: {listOponent.length > 0 ? listOponent[currentIndex].status : "-"}</small>
                                <small>Score: {listOponent.length > 0 ? listOponent[currentIndex].score : "-"}</small>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 bg-[#a9c6e4] w-full px-3 rounded-lg text-black h-20">
                        <small>Attack Infomation</small>
                    </div>
                    <div className="mt-2 border-2 border-gray-300 flex flex-row justify-center gap-5 w-full px-2 py-3 rounded-lg text-black">
                        <button className="bg-[#db4832] hover:bg-opacity-85 p-2 h-16 items-center w-24 flex justify-center rounded-lg">
                            <span className="font-semibold text-lg text-[#fff]">Attack</span>
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default Battle;