import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react'
import { useField } from '@unform/core'

import { TextareaBlock } from './styled'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string
	label: string
}

const Textarea: React.FC<TextareaProps> = ({ name, label, ...rest }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const { fieldName, defaultValue, registerField, error } = useField(name)

	useEffect(() => {
		registerField({
			name: fieldName,
			path: 'value',
			ref: textareaRef.current
		})
	}, [fieldName, registerField])

	return (
		<TextareaBlock>
			<label htmlFor={name}>{label}</label>
			<textarea
				id={name}
				ref={textareaRef}
				defaultValue={defaultValue}
				{...rest}
			/>

			{ error && <span>{error}</span>}
		</TextareaBlock>
	)
}

export default Textarea
