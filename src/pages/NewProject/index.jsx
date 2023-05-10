import { Header } from "../../components/Header"
import { Form } from "../../components/Form"
import { useEffect, useState } from "react"

export const NewProject = () => {

    const [categories, setCategories] =useState([])

    useEffect(() => {
        console.log('aquiGet')
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(err => console.log('Erro'))
    }, [])

    const createPost = (project) =>{
        project.cost = 0
        project.services = []

        
        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(err => console.log('Erro'))
            console.log('aquiPost')
    }

    return (
        <>
            <Header />
            <main>
                <section className="section">
                    <h1 className="title">Criar Projetos</h1>
                    <p className="text">Crie seu projeto para adicionar serviços</p>
                    <Form handleSubmit={createPost}  />
                </section>
            </main>
        </>
    )
}