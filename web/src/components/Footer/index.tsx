import React from 'react'

import { FooterContainer, Content  } from './styled'


const Footer: React.FC  = ({ children }) => {
    return (
        <FooterContainer>
            <Content>   
                {children}
            </Content>
        </FooterContainer>
    )
} 

export default Footer