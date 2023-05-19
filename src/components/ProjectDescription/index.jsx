import './ProjectDescription.css'

export const ProjectDescription = ({ categorie, budgetValue, cost }) => {
  return (
    <div className="description_project_edit">
      <p><strong>Categoria:</strong> {categorie}</p>
      <p><strong>Orçamento:</strong>R$ {budgetValue}</p>
      <p><strong>Valor Gasto:</strong>R$ {cost}</p>
    </div>
  )
}