import { useEffect, useState,useCallback, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BattleLayout from "@/components/BattleLayout";
import { callFunction, callFunctionST, initHere, viewFunction } from "@/hooks/hereWallet";
import Layout from "@/components/Layout";


const Battle = () =>{
    const [loading, setLoading] = useState<boolean>(false)
    const [account, setAccount] = useState<string|null>(localStorage.getItem("accountID")??null);
    const allListPet = JSON.parse(localStorage.getItem("list_all_pet") as string)??[];
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [currentIndexPet, setCurrentIndexPet] = useState<number>(0||Number(localStorage.getItem("indexPet")));
    const [isShow, setIsShow] = useState<boolean>(false);
    const [isAttack, setIsAttack] = useState<boolean>(false)
    const [error, setError] = useState<string|null>(null)
    const [status, setStauts] = useState<string|null>(null) 
    
    useEffect(()=>{
        loadAccount()
    },[account])

    const loadAccount = async() =>{
        if(!localStorage.getItem("accountID")){
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
        setAccount(localStorage.getItem("accountID"))
    }

    const [pets, oponents] = useMemo(() => {
        const pets   = allListPet.filter((pet:any)=> pet.owner_id === account )
        const oponents = allListPet.filter((pet:any)=> pet.owner_id !== account )
        return [pets, oponents];
    }, [allListPet,account]);

    

    const handlSelectPet = (idx: number) => {
        setCurrentIndexPet(idx);
        setIsShow(false);
    }

    const onAttack = async() =>{
        try{
            setStauts("Attacking...")
            setIsAttack(true)
            setTimeout(()=>{
                setIsAttack(false)
            },200)
            const tx = await callFunctionST("is_pet_alive",{"pet_id": pets[currentIndex].pet_id });
            console.log("is_alive",atob(tx.status.SuccessValue))
            if(atob(tx.status.SuccessValue) == "true"){
                if(pets[currentIndexPet].level <=  oponents[currentIndex].level  && oponents[currentIndex].status !== "DYING" && pets[currentIndexPet].status !== "DYING" &&  pets[currentIndexPet].last_attack_used == BigInt("0") && (oponents[currentIndex].last_attacked== BigInt("0")  ||  Math.floor((( Math.abs(Number(new Date( oponents[currentIndex].last_attacked/10000000 )) * 1000  - Date.now())) /1000)/60)/60 > 1)){
                    setIsAttack(true);
                    const tx = await callFunctionST(
                        "attack",
                        {
                            "pet_id":pets[currentIndexPet].pet_id,
                            "from_id":pets[currentIndexPet].pet_id,
                            "to_id": oponents[currentIndex].pet_id
                        }
                    )
                    setTimeout(()=>{
                        setIsAttack(false)
                    },220)
                    setStauts("Attack Successfull!")
                    setTimeout(()=>{
                        setStauts(null)
                    },1000)
                    console.log("tx",tx)
                }
            }
            setStauts(null)
            setError("Pet not alive!")
            setTimeout(()=>{
                setError(null)
            },1000) 
        }catch(err){
            console.log(err)
            setError(error)
            setTimeout(()=>{
                setError(null)
            },1000)
        }
    }


    //console.log("listOponent",oponents)
    //console.log("pet",listPets)

    return(
        !loading?
        <div className={`flex flex-col justify-center items-center w-full h-screen bg-[#b8e3f8] overflow-hidden`}>
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
            <div className="bg-[#e5f2f8] screen w-full md:w-[400px] md:rounded-lg h-screen relative">
                
                
                {/* <div className="mt-3 text-center flex justify-center flex-row px-2">
                    <p className="text-black px-2 py-1 bg-slate-300 w-full rounded-lg">Next Attack: 00:15:00</p>
                </div> */}
                <div className="mt-2 relative fix-screen w-full h-full overflow-y-auto">
                    <div className="mt-2 text-center flex justify-center flex-row px-2">
                        <p className="text-black px-2 py-1 bg-slate-300 w-full rounded-lg">Next Attack: 00:15:00</p>
                    </div>
                    <div className="mt-2 relative px-2">
                        <div className="w-full responsive rounded-md flex justify-center flex-row relative">
                            {
                                pets.length > 0 &&(
                                    <div className="absolute top-[65%] left-[52%] text-black">
                                        <small>{pets[currentIndexPet].name}</small>
                                    </div>
                                )
                            }
                            <img width={60} className="w-full h-full rounded-md" src="/assets/background/battle.png" alt="screen" />
                            {pets.length > 0 && pets[currentIndexPet] &&(
                                <img className="absolute mg" src={`/assets/animation/${pets[currentIndexPet].category}/${pets[currentIndexPet].pet_evolution_phase}.gif`} alt="pet" />
                            )}
                            <div className="flex flex-row justify-between">
                                <div className="absolute position">
                                    <BattleLayout petList={oponents} setIndex={setCurrentIndex}/>
                                </div>
                            </div>
                        </div>
                        {
                        pets.length > 0 &&(
                            <div onClick={()=>setIsShow((prv)=>!prv)} className="mt-2 bg-[#a9c6e4] p-3 relative rounded-lg flex flex-row justify-between items-center text-black">
                                <div className="flex flex-row items-center gap-2">
                                    {pets.length > 0 &&(
                                        <img className="-mt-2" width={62} src={`/assets/animation/${pets[currentIndexPet].category}/${pets[currentIndexPet].pet_evolution_phase}.gif`} alt="pet" />
                                    )}
                                    <div className="flex flex-col">
                                        <p className="text-sm">{pets[currentIndexPet].name}</p>
                                        <div className="flex flex-row gap-3">
                                            <div className="flex flex-col">
                                                <small>ATK: 100</small>
                                                <small>DEF: 100</small>
                                            </div>
                                            <div className="flex flex-col">
                                                <small>Status: {pets[currentIndexPet].status}</small>
                                                <small>Score: {pets[currentIndexPet].score}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button>
                                    <img width={20} className="rotate-90" src="/assets/icon/arrow_right.png" alt="arrow" />
                                </button>
                            </div>
                        )
                        }
                        <div className="mt-2 border-2 border-gray-300 flex flex-row justify-center gap-5 w-full px-2 py-3 rounded-lg text-black">
                            <button onClick={onAttack}>
                                {
                                    isAttack?(
                                        <img width={260} src="/assets/button/button-attack-enter.png" alt="btn" />
                                    ):(
                                        <img width={260} src="/assets/button/button-attack.png" alt="btn" />
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    
                    {
                        isShow &&(
                            <div className="bg-black fixed top-0 bg-opacity-60 z-50 h-screen screen overflow-hidden">
                                
                                <div className="h-[72%] w-[98%] absolute overflow-hidden border-2 p-2 border-slate-300 shadow-sm bg-slate-100 rounded-lg top-[10%] z-50 left-1/2 transform -translate-x-1/2 w-[95%] flex flex-col gap-2">
                                    <div className="flex flex-row justify-end">
                                        <button onClick={()=>setIsShow(false)}>
                                            <img width={40} src="/assets/icon/close.svg" alt="close" />
                                        </button>
                                    </div>
                                    <div className="overflow-y-auto gap-2 mt-2 h-full flex flex-col">
                                        {pets.length > 0&&pets.map((pet:any,idx:number)=>(
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
                                </div>
                            </div>
                        )
                    }
                    {/* <div className="mt-2 bg-[#a9c6e4] w-full px-3 rounded-lg text-black h-14">
                        <small>Attack Infomation</small>
                    </div> */}
                    <div className="clear"/>
                </div>
                <Footer/>
            </div>
            
        </div>
        :<Layout/>
    )
}

export default Battle;