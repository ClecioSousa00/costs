import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Project = () =>{
    
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(()=>{
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(err => console.log("erro ao pegar projeto ao clicar em editar"))
    },[id])

    const toggleProjectForm = () =>{
        setShowProjectForm(!showProjectForm)
    }

    if(!project){
        console.log('projeto ainda n existe');
        return
    }

    return(
        <main>
            <h1>Projeto: {project.nameproject}</h1>
            <button onClick={toggleProjectForm}>{showProjectForm ? 'Fechar': 'Editar Projeto'}</button>
        </main>
    )
}