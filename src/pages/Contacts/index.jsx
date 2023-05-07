import { Link } from "react-router-dom"

import { Header } from "../../components/Header"
import { Cards } from "../../components/Cards"

export const Contacts = () =>{
    return(
        <>
            <Header/>
            <h1>Contatos</h1>
            <Cards/>
            

            {/* <Link to={"https://www.youtube.com/"} target="_blank" >youtube</Link> */}

        </>
    )
}