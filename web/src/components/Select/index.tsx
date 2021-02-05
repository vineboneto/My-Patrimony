import React from "react";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import * as Styled from "./styled";

interface Props extends SelectProps<OptionTypeBase> {
	name: string;
	label: string;
	error?: string;
}

export interface OptionValues {
	value: string;
	label: string;
}

const Select: React.FC<Props> = ({ name, label, error, ...rest }) => {
	return (
		<Styled.Block>
			<Styled.Label error={error}>{error ? error : label}</Styled.Label>
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
