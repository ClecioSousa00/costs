import {FaRegEdit, FaRegTrashAlt} from "react-icons/fa"

import "./ProjectCard.css"

export const ProjectCard = ({id, name, budget, handleRemove}) =>{

    return(
        <div className="card_project">
            <h1 className="title_project">{name}</h1>
            <p><strong>Orçamento:</strong> {budget}</p>
            <p>desenvolvimento</p>
            <div className="button_project"> 
                <button><FaRegEdit/>Editar</button>
                <button onClick={() => handleRemove(id)}><FaRegTrashAlt/>Excluir</button>
            </div>
        </div>
    )
}