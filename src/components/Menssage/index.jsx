import "./Menssage.css"

export const Menssage = ({visible}) =>{
  return(
    <div className={`${'menssage'} ${visible && 'visible'}`}>O valor do serviço não pode ser maior que o valor do <strong>orçamento</strong></div>
  )
}