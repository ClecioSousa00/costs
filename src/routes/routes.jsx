import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { About } from "../pages/About"
import { Contacts } from "../pages/Contacts"
import { NewProject } from "../pages/NewProject"
import { MyProjects } from "../pages/MyProjects"
import { Project } from "../pages/project"

export const AppRoutes =()=>{
    return(
        <>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path="/Sobre" element={<About/>}/>
                <Route path="/Contatos" element={<Contacts/>}/>
                <Route path="/Projetos" element={<MyProjects/>}/>
                <Route path="/Novo-Projeto" element={<NewProject/>}/>
                <Route path="/Projeto/:id" element={<Project/>}/>
                {/* <Route path="*" component={() => <Redirect to="/"/>}/> */}
                
            </Routes>
        </>
    )
}