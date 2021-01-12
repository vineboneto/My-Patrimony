import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

import { Container } from './styled'

export interface CollapseHandles{
    openCollapse: () => void
}

interface Props {
    children?: React.ReactNode
}

const Collapse: React.ForwardRefRenderFunction<CollapseHandles, Props> = ({ children }, ref) => {

    const [visible, setVisible] = useState(false)

    const openCollapse = useCallback(() => {
        setVisible(!visible)
    }, [visible])

    useImperativeHandle(ref, () => {
        return {
            openCollapse
        }
    })

    if (!visible) {
        return null
    }

    return(
        <Container visible={visible}>              
            {children}
        </Container>
    )
}

export default forwardRef(Collapse)