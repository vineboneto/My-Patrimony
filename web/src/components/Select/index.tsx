import React from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import { string } from "yup/lib/locale";
import * as Styled from "./styled";

interface Props extends SelectProps<OptionTypeBase> {
	name: string;
	label: string;
}

export interface OptionValues {
	value: string;
	label: string;
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
	return (
		<Styled.Block>
			<Styled.Label>{label}</Styled.Label>
			<Styled.Select
				defaultValue={{ value: -1, label: "Selecione" }}
				classNamePrefix="react-select"
				className="basic-single"
				{...rest}
			/>
		</Styled.Block>
	);
};
export default Select;
