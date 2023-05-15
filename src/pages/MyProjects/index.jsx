import { useState, useEffect } from "react"

import { Header } from "../../components/Header"
import { LinkButton } from "../../components/LinkButton"

import "./MyProject.css"
import { ProjectCard } from "../../components/ProjectCard"

export const MyProjects =() =>{

    const [projects, setProjects] = useState([])

    useEffect(() => {
        console.log('aquiGet')
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProjects(data)
            })
            .catch(err => console.log('Erro'))
    }, [])

    const generateCardsProject = (projects) =>{
        
        return (projects.map(project => <ProjectCard 
            id={project.id} 
            name={project.nameproject} 
            budget={project.budgetValue}
            key={project.id}
            handleRemove={removeProjects}
            />
        ))
    }

    const removeProjects = (id) =>{
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(() => setProjects(projects.filter(project => project.id !== id)))
        .catch(err => console.log("erro ao excluir"))
    }


    return(
        <>
            <Header/>
            <main>
                <div className="my_project">
                    <h1>Meus projetos</h1>
                    <LinkButton to="/Novo-Projeto" text="Criar Projeto"/>
                </div>
               <section className="container_projects">
                    {projects && generateCardsProject(projects)}
               </section>
            </main>
        </>
    )
}