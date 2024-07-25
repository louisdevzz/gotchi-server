import Home from "@/pages/Home"
import { useRoutes } from "react-router-dom";
import Battle from "./pages/Battle";
import Mission from "./pages/Mission";
import Space from "./pages/Space";
import Mining from "./pages/Mining";
import Mint from "./pages/Mint";

const App = () =>{
    return useRoutes([
      {
        path: "/",
        element: <Home/>
      },
      {
        path: 'mining',
        element: <Mining/>
      },
      {
        path: "battle",
        element: <Battle/>
      },
      {
        path: "mission",
        element: <Mission/>
      },
      {
        path: "space",
        element: <Space/>
      },
      {
        path: "mint",
        element: <Mint/>
      }
    ])
}

export default App;   