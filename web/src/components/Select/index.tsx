import React, { useRef, useEffect } from 'react';
import {
    OptionTypeBase,
    Props as SelectProps,
} from 'react-select';
import { useField } from '@unform/core';
import { StyledSelect, SelectBlock, Label } from './styled';

interface Props extends SelectProps<OptionTypeBase> {
    name: string;
    label: string
}
const Select: React.FC<Props> = ({ name, label, ...rest }) => {
    const selectRef = useRef(null);
    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
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
        });
    }, [fieldName, registerField, rest.isMulti]);

    return (
        <SelectBlock>
            <Label>{label}</Label>
            <StyledSelect
                defaultValue={defaultValue}
                ref={selectRef}
                classNamePrefix="react-select"
                className="basic-single"
                {...rest}
            />
        </SelectBlock>
    );
};
export default Select;