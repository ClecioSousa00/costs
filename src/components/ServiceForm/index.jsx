
import { useState } from "react"

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
                <div>
                    <label htmlFor="nameService">* Serviço</label>
                    <input
                        className="form_input"
                        required
                        type="text"
                        name="nameService"
                        placeholder="Nome do Serviço"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="costValue">* Custo</label>
                    <input
                        className="form_input"
                        required
                        type="number"
                        name="costValue"
                        placeholder="Custo do Serviço"
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label htmlFor="descriptionService">Descrição</label>
                    <input
                        className="form_input"
                        type="text"
                        name="descriptionService"
                        placeholder="Descreva o Serviço"
                        onChange={handleChange}
                    />
                </div>
                <SubmitButton text="Adicionar Serviço" />
            </form>
        </>
    )
}