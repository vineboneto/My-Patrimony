import styled from "styled-components";

export const TextareaBlock = styled.div`
	position: relative;

	label {
		font-size: 1.4rem;
		color: var(--color-label-input);
	}

	textarea {
		width: 100%;
		height: 16rem;
		min-height: 8rem;
		margin-top: 0.8rem;
		border-radius: 0.8rem;
		border: 1px solid var(--color-border-input);
		box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
		outline: 0;
		padding: 1.2rem 1.2rem;
		resize: vertical;
		font: 1.6rem "Archivo";
	}

	&:focus-within::after {
		width: calc(100% - 3.2rem);
		height: 2px;
		content: "";
		background: var(--color-success);
		position: absolute;
		left: 1.6rem;
		right: 1.6rem;
		bottom: 7px;
	}
`;
