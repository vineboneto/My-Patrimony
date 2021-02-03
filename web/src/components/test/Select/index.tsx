import React from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import * as Styled from "./styled";

export interface OptionValues {
	value: number;
	label: string;
}

interface Props extends SelectProps<OptionTypeBase> {
	name: string;
	label: string;
	// options: OptionValues[];
}

const Select: React.FC<Props> = ({ name, label, ...rest }) => {
	return (
		<Styled.Block>
			<Styled.Label>{label}</Styled.Label>
			<Styled.Select
				defaultValue="Selecione"
				classNamePrefix="react-select"
				className="basic-single"
				{...rest}
			/>
		</Styled.Block>
	);
};
export default Select;
