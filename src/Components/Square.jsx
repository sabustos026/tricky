export const Square = ({ children, isSelected, updateBoard, index }) =>{
    //Lógica
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }


    //Diseño
    return(

        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}