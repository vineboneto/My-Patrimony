import React, { useRef, useEffect } from 'react';
import {
	OptionTypeBase,
	Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { StyledSelect, SelectBlock, Label } from './styled';

interface Props extends SelectProps<OptionTypeBase> {
	name: string
	label: string
}

export interface OptionSelect {
	value: number;
	label: string;
}

const Select: React.FC<Props> = ({ name, label, options, ...rest }) => {
	const selectRef = useRef(null);
	const { fieldName, defaultValue, registerField, error } = useField(name);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: selectRef.current,
			clearValue: (ref) => {
				ref.select.clearValue();
				ref?.select?.setValue(defaultValue)
			},
			getValue: (ref: any) => {
				if (rest.isMulti) {
					if (!ref.state.value) {
						return [];
					}
					return ref.state.value.map((option: OptionTypeBase) => option.value);
				}
				if (!ref.state.value) {
					return '';
				}
				return ref.state.value.value;
			},
			setValue: (ref: any, value: any) => {
				if (rest.isMulti && Array.isArray(value)) {
					const items = ref?.props?.options?.filter((option: any) =>
						value.includes(option.value)
					);
					ref?.select.setValue(items);
				} else {
					const item = ref?.props?.options?.filter(
						(option: any) => option.value === value
					);
					if (item && item.length > 0) {
						ref?.select?.setValue(item);
					}
				}
			},
		});
	}, [fieldName, registerField, rest.isMulti]);


	return (
		<SelectBlock error={error}>
			<Label error={error}>{error ? error : label}</Label>
			<StyledSelect
				defaultValue={defaultValue ? defaultValue : { value: -1, label: 'Selecione' }}
				ref={selectRef}
				classNamePrefix="react-select"
				className="basic-single"
				options={options}
				{...rest}
			/>
		</SelectBlock>
	);
};
export default Select;
