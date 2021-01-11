import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import PageHeader from 'components/PageHeader'
import Form from 'components/Form'
import Main from 'components/Main'
import Select from 'components/Select'
import Input from 'components/Input'
import Textarea from 'components/Textarea'
import Footer from 'components/Footer'
import NewButton from 'components/NewButton'
import DialogCreateOwner from './DialogCreateOwner'
import DialogCreateCategory from './DialogCreateCategory'
import CollapseIps from './CollapseIps'


import { Container, PatrimonyData, OwnerData, ButtonFooter } from './styled'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from 'stores'
import * as SectorActions from 'stores/ducks/sectors/action'
import * as OwnerActions from 'stores/ducks/owners/action'
import * as CategoryActions from 'stores/ducks/categories/action'
import * as PatrimonyActions from 'stores/ducks/patrimonies/action'
import { Category } from 'stores/ducks/categories/types'
import { Patrimony } from 'stores/ducks/patrimonies/types'
import { Sector } from 'stores/ducks/sectors/types'
import { Owner } from 'stores/ducks/owners/types'


type Data = Category & Owner & Sector

interface Params {
    id: string
}

const PatrimonyForm: React.FC = () => {
    
    const { id }  = useParams<Params>()
    const patrimonyInputRef = useRef<HTMLInputElement>(null)
    const modelInputRef = useRef<HTMLInputElement>(null)
    const descriptionTextareaRef = useRef<HTMLTextAreaElement>(null)
    const [sectorIdSelectState, setSectorIdSelectState] = useState('')
    const [ownerIdSelectState, setOwnerIdSelectState] = useState('')
    const [categoryIdSelectState, setCategoryIdSelectState] = useState('')
    const ips = useSelector((state: ApplicationState) => state.ips.data)
        
    const owners = useSelector((state: ApplicationState) => state.owners)
    const categories = useSelector((state: ApplicationState) => state.categories)
    const sectors = useSelector((state: ApplicationState) => state.sectors)
    const dispatch = useDispatch()

    const handleOpenDialogOwner = useCallback(() => {
        dispatch(OwnerActions.setDialogIsOpen(!owners.dialogIsOpen))
    }, [owners.dialogIsOpen, dispatch])

    const handleOpenDialogCategory = useCallback((e: MouseEvent) => {
        e.preventDefault()
        dispatch(CategoryActions.setDialogIsOpen(!categories.dialogIsOpen))
    }, [dispatch, categories.dialogIsOpen])

    useEffect(() => {
        dispatch(SectorActions.loadRequest('sectors'))
    }, [sectors.dialogIsOpen, dispatch])

    useEffect(() => {
        dispatch(OwnerActions.loadRequest('owners'))
    }, [owners.dialogIsOpen, dispatch])

    useEffect(() => {
        dispatch(CategoryActions.loadRequest('types'))
    }, [categories.dialogIsOpen, dispatch])

    const handleSetOptions = useCallback((datas) => {
        const options = datas.map((data: Data) => {
            return {
                value: data.id?.toString(),
                label: data.name,
            }
        })
        return options
    }, [])

    const handleOwnerChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setOwnerIdSelectState(e.target.value)

        owners.data.forEach((owner) => {
            if (owner.id?.toString() === e.target.value) {
                setSectorIdSelectState(owner.sectorId.toString())
            }
        })
    }, [owners.data])

    // useEffect(() => {
    //     async function loadDataPatrimony() {
    //         const response = await api.get(`patrimonies/${id}`)
    //         const data = response.data[0]
    //         setOwnerId(data.owner_id.toString())
    //         setSectorId(data.sector_id.toString())
    //         setTypeId(data.type_id)
    //         // setPatrimony(data.patrimony)
    //         setModel(data.model)
    //         setDescription(data.description)
    //         if (data.ips[0][0]) {
    //             // const ips = data.ips.map((ip: any) => { 
    //             //     return {
    //             //         id: ip[0],
    //             //         ip: ip[1],
    //             //         mask: ip[2],
    //             //         gateway: ip[3]
    //             //     }
    //             // })
    //             // setIpItems(ips)
    //         }
    //     }
    //     if (id) {
    //         loadDataPatrimony()
    //     }

    // }, [id])
    
    // async function handleCreatePatrimony(e: MouseEvent) {
    //     e.preventDefault()
    //     api.post('patrimonies', {
    //         patrimony: '',
    //         model: model,
    //         description: description,
    //         owner_id: parseInt(ownerId),
    //         type_id: parseInt(typeId),
    //         // ips: ipItems
    //     })
    //     .then(() => alert('Patrimônio cadastrado com sucesso'))
    //     .catch(() => alert('Erro ao cadastrar Patrimônio'))
    // }
    
    const handleCreatePatrimony = useCallback(() => {
        const patrimony: Patrimony = {
            id: parseInt(id), 
            patrimony: patrimonyInputRef.current?.value || '',
            model: modelInputRef.current?.value || '',
            description: descriptionTextareaRef.current?.value || '',
            ownerId: parseInt(ownerIdSelectState),
            categoryId: parseInt(categoryIdSelectState),
            ips: ips
        }
        dispatch(PatrimonyActions.loadCreateOrUpdate('patrimonies', patrimony))
    }, [ownerIdSelectState, categoryIdSelectState, ips])

    return (
        <Container>
            <PageHeader
                title="Novo Patrimônio"
                linkPrev="/" 
            />

                <Main>
                    <Form
                        clickButton={handleOpenDialogOwner}
                        labelButton="+ Novo Proprietário"
                        legend="Proprietário"
                    >
                        
                        <DialogCreateOwner />


                        <OwnerData>
                            <Select
                                name="owner"
                                label="Proprietário"
                                value={ownerIdSelectState}
                                options={handleSetOptions(owners.data)}
                                onChange={handleOwnerChange}
                            />

                            <Select
                                name="sector"
                                label="Setor"
                                options={handleSetOptions(sectors.data)}
                                value={sectorIdSelectState}
                                onChange={(e) => setSectorIdSelectState(e.target.value)}
                                disabled={true} 
                            />
                        </OwnerData>
                    </Form>

                    <Form legend="Patrimônio">
                        
                        <PatrimonyData>
                            
                            <DialogCreateCategory />
                            
                            <NewButton onClick={handleOpenDialogCategory} />
                            
                            <Select
                                name="type"
                                label="Tipo"
                                options={handleSetOptions(categories.data)}
                                value={categoryIdSelectState}
                                onChange={(e) => setCategoryIdSelectState(e.target.value)}
                            />

                            <Input
                                name="patrimony"
                                label="Patrimônio"
                                ref={patrimonyInputRef}
                            />

                            <Input
                                name="model"
                                label="Modelo"
                                ref={modelInputRef}
                            />
                            <Textarea
                                name="description"
                                label="Descrição"
                                ref={descriptionTextareaRef}
                            />
                        </PatrimonyData>

                    </Form>

                    <CollapseIps />

                    <Footer>
                        <ButtonFooter onClick={handleCreatePatrimony}>
                            Salvar Patrimônio
                        </ButtonFooter>
                    </Footer>   
                    
                </Main>
        </Container>
    )
}

export default PatrimonyForm