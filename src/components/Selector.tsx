import React from 'react'

type Props = {
    radiobuttonChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
    title: string
}

const Selector = ({...props}: Props) => {
    return (
        <div onChange={props.radiobuttonChanged}>
            {[0,1,2,3,4,5].map(v => <input key={v} type="radio" id={String(v)} name={props.title} value={v}></input>)}
        </div>
    )
}

export default Selector
