import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Contacts } from "../pages/Contacts"
import { NewProject } from "../pages/NewProject"

export const AppRoutes =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/Sobre" element={<About/>}/>
                <Route path="/Contatos" element={<Contacts/>}/>
                <Route path="/Novo-Projeto" element={<NewProject/>}/>
                {/* <Route path="*" component={() => <Redirect to="/"/>}/> */}
                
            </Routes>
        </BrowserRouter>
    )
}