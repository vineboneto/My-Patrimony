import ReactSelect from "react-select";
import styled from "styled-components";

interface SelectStyled {
	error?: string;
}

export const SelectBlock = styled.div<SelectStyled>``;

export const Label = styled.label<SelectStyled>`
	font-size: 1.4rem;
	color: ${(props) =>
		props.error ? "var(--color-danger)" : "var(--color-label-input)"};

	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const StyledSelect = styled(ReactSelect)`
	.react-select__control {
		width: 100%;
		height: 4rem;
		margin-top: 0.8rem;
		border: 1px solid var(--color-border-input);
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
		padding: 0 1.6rem;
		font: 1.6rem "Archivo";
		font-weight: 700;
	}

	.react-select__control:focus-within::after {
		width: calc(100% - 3.2rem);
		height: 2px;
		content: "";
		background: var(--color-success);
		position: absolute;
		left: 1.6rem;
		right: 1.6rem;
		bottom: 0;
	}

	.react-select__control:hover {
		border: 1px solid var(--color-border-input);
	}
`;
