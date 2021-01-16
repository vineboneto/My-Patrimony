import styled from "styled-components";

export const SButton = styled.button`
	width: 23.1rem;
	height: 5.4rem;
	border-radius: 0.8rem;
	border: 1px solid var(--color-border-input);
	background-color: var(--color-primary);
	color: #fff;
	outline: 0;
	padding: 0 1.6rem;
	font: 1.6rem "Archivo";
	cursor: pointer;
`;

export const SPlus = styled.button`
	background-color: #fff;
	cursor: pointer;
	max-width: 15px;
	max-height: 30px;
	outline: 0;
	border: 0;
	z-index: 3;
	justify-self: flex-end;
`;

export const SButtonCollapse = styled.button`
	width: 100%;
	background-color: #808080;
	padding: 1rem 3.4rem;
	color: #fff;
	outline: 0;
	border: 0;
	cursor: pointer;

	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

export const SCreate = styled.button`
	background: none;
	border: 0;
	color: var(--color-primary);
	font: 700 1.6rem "Archivo";
	transition: color 0.2s;
	cursor: pointer;
	z-index: 1;

	&:hover {
		color: #000;
	}
`;
