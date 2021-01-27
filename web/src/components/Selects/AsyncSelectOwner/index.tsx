import React, { useEffect, useState } from 'react'

import Select, { OptionValue } from 'components/Selects/Select'
import api from 'services/api'

interface Props {
	name: string;
	label: string;
}

interface ApiData {
	id: number;
	name: string;
}

const AsyncSelectOwner: React.FC<Props> = ({ name, label }) => {
	const [ownerOptions, setOwnerOptions] = useState<OptionValue[]>([])
	useEffect(() => { setOwnerValuesState() }, [])

	const setOwnerValuesState = async () => {
		const ownerValues = await getApiOwnerData();
		setOwnerOptions(convertToOptionsValues(ownerValues))
	}

	const getApiOwnerData = async () => {
		const response = await api.get('owners')
		return response.data
	}

	const convertToOptionsValues = (datas: any) => {
		const options = datas.map((data: ApiData) => {
			return {
				value: data.id,
				label: data.name
			}
		})
		return options
	}

	return <Select name={name} label={label} options={ownerOptions} />
}

export default AsyncSelectOwner