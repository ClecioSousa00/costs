import './MenuToogle.css'

export const MenuToogle = ({isOpen, fnClickMenu}) =>{

    const handleClickMenu = () =>{
        fnClickMenu()
    }

    return(
        <button className={`${'menu_button'} ${isOpen && 'active'}`} onClick={handleClickMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>
    )
}