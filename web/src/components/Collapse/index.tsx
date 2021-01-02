import React from 'react'

import './styles.css'

interface CollapseProps {
    isOpen: boolean
}

const Collapse: React.FC<CollapseProps> = ({ isOpen, children }) => {
    
    return(
        <div className="collapse-block">          
            {isOpen &&
            
                <div className="content">
                    {children}
                </div>
            }
        </div> 
    )
}

export default Collapse