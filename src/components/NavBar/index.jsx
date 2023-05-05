import { Link } from "react-router-dom"

export const NavBar = () =>{
    return(
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/Novo-Projeto">Projetos</Link>
                <Link to="/Sobre">Sobre</Link>
                <Link to="/Contatos">Contato</Link>
            </nav>
        </>
    )
}