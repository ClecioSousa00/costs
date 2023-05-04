import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { Contacts } from "./pages/Contacts"
import { NewProject } from "./pages/NewProject"

export const AppRoutes =()=>{
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="About" element={<About/>}/>
                <Route path="Contacts" element={<Contacts/>}/>
                <Route path="NewProject" element={<NewProject/>}/>
            </Routes>
        </BrowserRouter>
    )
}