import React from 'react'

import './styles.css'

interface IpFormProps {
    addNewIp: () => void
}

const IpForm: React.FC<IpFormProps> = ({ addNewIp, children }) => {
    return (
        <div className="ips">
            <div className="legend">
                Ips
                <button type="button" onClick={() => addNewIp()}>
                    + Novo Ip
                </button>
            </div>


            {children}
        </div>
    )
}

export default IpForm