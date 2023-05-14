import { useState, useEffect } from "react"

import { Header } from "../../components/Header"
import { LinkButton } from "../../components/LinkButton"

import "./MyProject.css"
import { ProjectCard } from "../../components/ProjectCard"

export const MyProjects =() =>{

    const [preojects, setProjects] = useState([])

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


    return(
        <>
            <Header/>
            <main>
                <div className="my_project">
                    <h1>Meus projetos</h1>
                    <LinkButton to="/Novo-Projeto" text="Criar Projeto"/>
                </div>
               <section>
                    <ProjectCard/>
               </section>
            </main>
        </>
    )
}