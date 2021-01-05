import React from 'react'

import { Container, Content } from './styled'

interface CollapseProps {
    isOpen: boolean
}

const Collapse: React.FC<CollapseProps> = ({ isOpen, children }) => {
    
    return(
        <Container>          
            {isOpen &&
                <Content>
                    {children}
                </Content>
            }
        </Container>
    )
}

export default Collapse