import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Project = () =>{
    
    const {id} = useParams()
    const [project, setProject] = useState([])

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

    return(
        <h1>Projeto Selecionado</h1>
    )
}