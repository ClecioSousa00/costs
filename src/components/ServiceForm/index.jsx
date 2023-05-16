
import { useState, useRef } from "react"

import { SubmitButton } from "../SubmitButton"



export const ServiceForm = ({handleSubmit, projectData}) => {

    const [service, setService] = useState({})

    const submitForm = (event) => {
        event.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    const handleChange = (event) => {
        setService({...service, [event.target.name]: event.target.value})
    }

    return (
        <>
            <form className="form" onSubmit={submitForm}>
                <input
                    
                    className="form_input"
                    type="text"
                    name="nameService"
                    placeholder="Nome do Serviço"
                    onChange={handleChange}
                />
                <input
                    className="form_input"
                    type="number"
                    name="costValue"
                    placeholder="Custo do Serviço"
                    onChange={handleChange}
                />
                <input
                    className="form_input"
                    type="text"
                    name="descriptionService"
                    placeholder="Descreva o Serviço"
                    onChange={handleChange}
                />
                <SubmitButton text="Adicionar Serviço" />
            </form>
        </>
    )
}