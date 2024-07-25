const MintNFT = () =>{
    return(
        <>
            <div className="border-2 border-[#304053] shadow-sm w-full h-44 rounded-lg">
                <div className="py-1 w-full rounded-t-md bg-[#304053] text-center">
                    <span className="text-xl">NFT PET</span>
                </div>
                <div className="px-3">
                    <div className="mt-5 flex flex-row gap-5 items-center justify-between">
                        <div className="p-3 rounded-md border-2 border-[#304053] items-center flex justify-center">
                            <img width={110} height={110} src="/assets/animation/blackdragon/1.gif" alt="pet" />
                        </div>
                        <div className="w-full text-black">
                            <div className="flex flex-col gap-2">
                                <div className="flex border-b-2 border-[#304053] flex-row justify-between items-center">
                                    <span className="text-[#00000075]">NAME</span>
                                    <span>DRAGON BLACK</span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[#00000075]">ATK</span>
                                    <span>100</span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <span className="text-[#00000075]">DEF</span>
                                    <span>100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* <div className="mt-2">
                <p className="text-black">Next Mint: 00:00:00</p>
            </div> */}
            <div className="flex flex-row justify-between items-center mt-2">
                <div className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-2 rounded-lg" src="/assets/animation/blackdragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        DRAGON BLACK
                    </small>
                </div>
                <div className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-2 rounded-lg" src="/assets/animation/blackdragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        DRAGON BLACK
                    </small>
                </div>
                <div className="h-28 cursor-pointer w-28 border-2 rounded-lg mt-2 border-[#304053] relative">
                    <img width={24} className="h-20 w-20 ml-2 rounded-lg" src="/assets/animation/blackdragon/1.gif" alt="pet" />
                    <small className="text-black absolute ml-1 w-full bottom-1 text-[0.7rem]">
                        DRAGON BLACK
                    </small>
                </div>
            </div>
            <div className="mt-3 flex flex-col gap-2 justify-center items-center border-2 border-[#304053] h-32 w-full rounded-lg">
                <div className="flex flex-col text-center -gap-2">
                    <span className="text-black">MINT 1 pet </span>
                    <span className="text-black">cost 2 token</span>
                </div>
                <button className="w-44 h-12 px-3 py-2 bg-[#304053] rounded-lg">
                    <span className="font-semibold">MINT</span>
                </button>
            </div>
        </>
    )
}

export default MintNFT;