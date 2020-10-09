import React from 'react'

type CategoryProps = {
    name: string,
    children: JSX.Element[]
}

export const Category = ({...props}: CategoryProps) => {
    return (
        <div>
            <h2>{props.name}</h2>
            {props.children}
        </div>
    )
}
