import React from 'react'

type Props = {
    radiobuttonChanged: (event: React.ChangeEvent<HTMLInputElement>) => void,
    title: string
}

function Selector({radiobuttonChanged, title}: Props) {
    return (
        <div onChange={radiobuttonChanged}>
            {[0,1,2,3,4,5].map(v => <input type="radio" id={String(v)} name={title} value={v}></input> )}
        </div>
    )
}

export default Selector
