import React from 'react'

function Selector(props) {
    return (
        <div onChange={props.radiobuttonChanged}>
           <input type="radio" id="0" name={props.title} value="0"></input> 
           <input type="radio" id="1" name={props.title} value="1"></input> 
           <input type="radio" id="2" name={props.title} value="2"></input> 
           <input type="radio" id="3" name={props.title} value="3"></input> 
           <input type="radio" id="4" name={props.title} value="4"></input> 
           <input type="radio" id="5" name={props.title} value="5"></input> 
        </div>
    )
}

export default Selector
