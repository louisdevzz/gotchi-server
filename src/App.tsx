import { useRoutes } from "react-router-dom";
import React from "react";
import Layout from "./components/Layout";

const HomeLazy = React.lazy(()=>import("@/pages/Home"))
const MiningLazy = React.lazy(()=>import("@/pages/Mining"))
const BattleLazy = React.lazy(()=>import("@/pages/Battle"))
const MissionLazy = React.lazy(()=>import("@/pages/Mission"))
const SpaceLazy = React.lazy(()=>import("@/pages/Space"))
const MintLazy = React.lazy(()=>import("@/pages/Mint"))

const App = () =>{
    return <React.Suspense fallback={<Layout/>}>
      {
        useRoutes([
          {
            path: "/",
            element: <HomeLazy/>
          },
          {
            path: 'mining',
            element: <MiningLazy/>
          },
          {
            path: "battle",
            element: <BattleLazy/>
          },
          {
            path: "mission",
            element: <MissionLazy/>
          },
          {
            path: "space",
            element: <SpaceLazy/>
          },
          {
            path: "mint",
            element: <MintLazy/>
          }
        ])
      }
    </React.Suspense>
}

export default App;   