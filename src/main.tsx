import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Loading from "@/components/Loading"

const MissionLazy = React.lazy(()=>import("@/pages/Mission"))
const HomeLazy = React.lazy(()=>import("./App"))
const BattleLazy = React.lazy(()=>import("@/pages/Battle"))
const SpaceLazy = React.lazy(()=>import("@/pages/Space"))
const MintLazy = React.lazy(()=>import("@/pages/Mint"))
import WebApp from '@twa-dev/sdk'

WebApp.ready();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loading/>}>
      <BrowserRouter basename='/'>
          <Routes>
            <Route path="/" element={<HomeLazy/>} />
            <Route path="/battle" element={<BattleLazy/>} />
            <Route path="/mint" element={<MintLazy/>} />
            <Route path="/mission" element={<MissionLazy/>} />
            <Route path="/space" element={<SpaceLazy/>} />
          </Routes>  
      </BrowserRouter>
    </React.Suspense>
  </React.StrictMode>,
)
