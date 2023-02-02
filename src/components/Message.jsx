import React from 'react'
import "../styles/Message.css"
function Message({ message, user, classs }) {
    if(user){
        return (
            <div className={`messageBox ${classs}`}>
                {`${user} : ${message}`}
            </div>
        )
    }
    return (
        <div className={`messageBox ${classs}`}>
            {`You : ${message}`}
        </div>
    )
    
}

export default Message