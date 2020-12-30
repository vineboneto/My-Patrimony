import React, { MouseEvent, useState } from 'react'

import './styles.css'

interface CollapseProps {
    title: string
}

const Collapse: React.FC<CollapseProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    function togglePanel(e: MouseEvent) {
        console.log(e)
        setIsOpen(!isOpen)
    }

    return(
        <div className="collapse-block">
           
            <button className="collapse" onClick={(e) => togglePanel(e)}>
                {title}
            </button>
            
             
            {isOpen &&
                <div className="content">
                    {children}
                </div> 
                
            }      
        </div> 
    )
}

export default Collapse