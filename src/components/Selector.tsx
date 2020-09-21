import React from 'react'

type Props = {
    radiobuttonChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
    title: string
}

function Selector({radiobuttonChanged, title}: Props) {
    return (
        <div onChange={radiobuttonChanged}>
           <input type="radio" id="0" name={title} value="0"></input> 
           <input type="radio" id="1" name={title} value="1"></input> 
           <input type="radio" id="2" name={title} value="2"></input> 
           <input type="radio" id="3" name={title} value="3"></input> 
           <input type="radio" id="4" name={title} value="4"></input> 
           <input type="radio" id="5" name={title} value="5"></input> 
        </div>
    )
}

export default Selector
