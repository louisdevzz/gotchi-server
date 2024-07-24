import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "@/pages/Home"
import Battle from "@/pages/Battle"
import Mint from "@/pages/Mint"
import Mission from '@/pages/Mission'
import Space from '@/pages/Space'

const App = () =>{
    return(
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/battle" element={<Battle/>} />
          <Route path="/mint" element={<Mint/>} />
          <Route path="/mission" element={<Mission/>} />
          <Route path="/space" element={<Space/>} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;   