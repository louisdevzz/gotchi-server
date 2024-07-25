import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import WebApp from '@twa-dev/sdk'
import App from './App'

WebApp.ready();



ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      {/* <React.Suspense fallback={<Loading/>}>
        <BrowserRouter basename='/'>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/battle" element={<Battle/>} />
              <Route path="/mint" element={<Mint/>} />
              <Route path="/mission" element={<Mission/>} />
              <Route path="/space" element={<Space/>} />
            </Routes>  
        </BrowserRouter>
      </React.Suspense> */}
      <App/>
    </React.StrictMode>
  </BrowserRouter>
)
