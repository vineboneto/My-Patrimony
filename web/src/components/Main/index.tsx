import React from 'react'

import { MainContainer } from './styled'

const Main: React.FC = ({ children }) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Main