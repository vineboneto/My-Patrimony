import
React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState
} from 'react'
import { useField } from '@unform/core'
import { Delete } from './styled'
import closeIcon from 'assets/images/icons/closeIcon.svg'
import { InputBlock } from '../Input/styled'

export interface MultiInputsHandles {
	addLine: () => void
}

export interface Field {
	name: string
	label: string
	placeholder: string
}

interface MultiInputsProps {
	name: string
	fields: Field[]
	itemData: {}
}

const MultiInputs: React.ForwardRefRenderFunction<
	MultiInputsHandles,
	MultiInputsProps
> = ({ name, fields, itemData }, ref) => {

	const { fieldName, registerField } = useField(name)
	const arrayInputsRef = useRef({ value: [itemData] })

	useEffect(() => {
		console.log('Effect')
		registerField({
			name: fieldName,
			ref: arrayInputsRef.current,
			getValue: (ref: any) => {
				return ref.value
			},
		})
	}, [fieldName, registerField])

	const [lines, setLines] = useState([itemData])

	const updateLines = (datas: any) => {
		arrayInputsRef.current.value = datas
		setLines(datas)
	}

	const addLine = () => {
		updateLines([...lines, itemData])
	}

	useImperativeHandle(ref, () => {
		return {
			addLine,
		}
	})

	const removeLine = (index: number) => {
		const __lines__ = lines.filter((line, i) => i !== index)
		updateLines(__lines__)
	}


	const handleChange = (field: string, value: string, index: number) => {
		const __lines__ = lines.map((line: any, i: number) => {
			return index !== i ? line : { ...line, [field]: value };
		});
		updateLines(__lines__)
	}

	return (
		<>
			{lines?.map((line: any, index: number) => (
				<div key={index}>
					{fields.map((field, indexField) => (
						<InputBlock key={indexField}>
							<label htmlFor={field.name}>{field.label}</label>
							<input
								name={field.name}
								value={line[field.name]}
								onChange={((e) => handleChange(field.name, e.target.value, index))}
								placeholder={field.placeholder}
							/>
						</InputBlock>
					))}

					<Delete tabIndex={-1} type="button" onClick={() => removeLine(index)}>
						<img src={closeIcon} alt="Excluir Ip" />
					</Delete>
				</div>
			))}
		</>
	)
}

export default forwardRef(MultiInputs)
