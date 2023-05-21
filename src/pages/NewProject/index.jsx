import { axiosInstance } from "../../axios/axios.instance"
import { Form } from "../../components/Form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const NewProject = () => {

    const [projects, setProjects] =useState([])
    const navigate = useNavigate()
    
    const createPost = (project) =>{
        project.cost = 0
        project.services = []

        axiosInstance.post('', project).then(data => setProjects(data)).catch(err => console.log('posta  axios n funciona'))
        navigate("/Projetos")
    }

    return (
           
        <main>
            <section className="section">
                <h1 className="title">Criar Projetos</h1>
                <p className="text">Crie seu projeto para adicionar serviços</p>
                <Form handleSubmit={createPost} textBtn="Criar Projeto" />
            </section>
        </main>
    
    )
}