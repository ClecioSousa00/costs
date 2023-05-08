import { SubmitButton } from "../SubmitButton"
import "./Form.css"

export const Form = () =>{
    return(
        <form className="form" onSubmit={()=>{}}>
            <input className="form_input" type="text" placeholder="Nome do Projeto" />
            <input className="form_input" type="number" placeholder="Orçamento do Projeto" />
            <select className="form_select" name="category_id" id="">
                <option>Selecione uma opcao</option>
                <option>texto1</option>
                <option>texto2</option>
            </select>
            <SubmitButton text="Criar Projeto"/>
        </form>
    )
}
