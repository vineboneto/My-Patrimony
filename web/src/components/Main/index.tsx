import React from 'react'

import './styles.css'

const Main: React.FC = ({ children }) => {
    return (
        <main className="main-block">
            {children}
        </main>
    )
}

export default Main