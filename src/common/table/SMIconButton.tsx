import React from 'react'

function SMIconButton({className,action,id,icon,text}:any) {
    console.log(icon,text)
    return (
        <div>
            <a className={className} onClick={()=>action(id)}><i className={icon}>{icon===""?text:""}</i></a>
        </div>
    )
}

export default React.memo(SMIconButton)
