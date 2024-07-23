import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "@/components/Home"
import Battle from "@/components/Battle"
import Mint from "@/components/Mint"

const App = () =>{
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/battle" element={<Battle/>} />
          <Route path="/mint" element={<Mint/>} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;   