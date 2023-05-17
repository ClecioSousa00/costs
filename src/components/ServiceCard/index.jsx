import {FaRegTrashAlt} from "react-icons/fa"


export const ServiceCard = ({id, name, cost, description, handleRemove}) =>{

    const removeServiceCard = (event) =>{
        event.preventDefault()
        handleRemove(id, cost)
    }

    return(
        <div className="card_project">
            <h1 className="title_project">{name}</h1>
            <div className="description_project">
                <p><strong>Valor: </strong>R$ {cost}</p>
                <p className="categorie">{description}</p>
            </div>
            <div className="button_project"> 
                <button onClick={removeServiceCard}><FaRegTrashAlt/>Excluir</button>
            </div>
        </div>
    )
}