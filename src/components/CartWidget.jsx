import React from "react"

const onClick = () =>{
    const object = document.getElementById("itemListContainer");
    if(object.style.display === "none"){
        object.style.display = 'block'
    }
    else{
        object.style.display = 'none'
    }
    
}

export const CartWidget = () =>{
    return(
        <img src="https://cdn-icons-png.flaticon.com/512/1599/1599861.png" onClick={() => onClick() } id="cartWidget" alt=""width="25px" />
    )
    
}