import './Modal.css'

export const Modal = ({buttonModal}) =>{

  const handleClickButton = (value) =>{
    buttonModal(value)
  }

  return(
    <div className='modal'>
      <div className='modal_box'>
        <h3>Atenção</h3>
        <span>Ao excluir você não tera mais acesso ao Projeto</span>
        <div className='modal_buttons'>
          <button onClick={() => handleClickButton(false)}>Cancelar</button>
          <button onClick={() => handleClickButton(true)}>Deletar</button>
        </div>
      </div>
    </div>
  )
}