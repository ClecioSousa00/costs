import './Modal.css'

export const Modal = ({buttonModal}) =>{

  const handleClickButton = (value) =>{
    buttonModal(value)
  }

  return(
    <div className='modal'>
      <h3>Atenção</h3>
      <span>Ao excluir você não tera mais acesso ao Projeto</span>
      <button onClick={() => handleClickButton(false)}>Cancelar</button>
      <button onClick={() => handleClickButton(true)}>Deletar</button>
    </div>
  )
}