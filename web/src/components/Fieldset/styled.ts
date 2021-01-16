import styled from "styled-components";

interface StyleProps {
	padding?: string;
}

export const Fieldset = styled.fieldset<StyleProps>`
	border: 0;
	padding: ${(props) => (props.padding ? props.padding : "3.4rem")};

	& + & {
		margin-top: 1.4rem;
	}
`;

export const Legend = styled.legend<StyleProps>`
	font: 600 2.4rem "Archivo";
	color: #000;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: ${(props) => (props.padding ? props.padding : "0 0 3.4rem 0")};
	padding-bottom: 2.6rem;
	border-bottom: 1px solid var(--color-border-input);
`;
