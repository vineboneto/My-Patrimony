import React, { useCallback, useRef, useState } from 'react'
import { Form } from '@unform/web'
import { FormHandles, SubmitHandler } from '@unform/core'
import * as Yup from 'yup'

import { Dialog } from '@material-ui/core'
import Input from 'components/Inputs/Input'
import Select from 'components/Select'
import Button, { Plus } from 'components/Button'
import { DialogContainer, Title } from 'components/DialogContainer/styled'
import { Content } from './styled'

import SectorForm from '../SectorForm'

interface FormData {
    owner: string,
    sectorId: number
}

const OwnerForm = () => {

    const DEFAULT_DATA = {
        sectors: { value: -1, label: 'Selecione' }
    }

    const optionsSector = [
        { value: 1, label: 'UPA' },
        { value: 2, label: 'Compras' },
    ]

    const [open, setOpen] = useState(false)
    const handleCloseDialog = useCallback(() => {
        setOpen(false)
    }, [])

    const handleOpenDialog = useCallback(() => {
        setOpen(true)
    }, [])

    const formRef = useRef<FormHandles>(null)
    const handleSubmit: SubmitHandler<FormData> = async (data, { reset }) => {
        try {
            const messageError = 'obrigatório'
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome ' + messageError),
                sectors: Yup.number().moreThan(-1, 'Setor ' + messageError).required(messageError),
            })

            await schema.validate(data, {
                abortEarly: false
            })

            formRef.current?.setErrors({})

            reset()
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    if (error.path) {
                        formRef.current?.setFieldError(error.path, error.message)
                    }
                })
            }
        }
    }

    return (
        <DialogContainer>
            <Form ref={formRef} onSubmit={handleSubmit} initialData={DEFAULT_DATA}>
                <Content>

                    <Title>Novo Proprietário</Title>

                    <Input name="name" label="Nome" />

                    <Plus type="button" onClick={handleOpenDialog} />
                    <Select name="sectors" label="Setor" options={optionsSector} />

                    <Button>
                        Salvar
                    </Button>
                </Content>
            </Form>
            {/**
             * Dialogs Forms em Forms diferentes
             */}
            <Dialog open={open} onClose={handleCloseDialog}>
                <SectorForm />
            </Dialog>
        </DialogContainer>
    )
}

export default OwnerForm
