import styled from "styled-components";

import { TitleStyle } from "./index";

export const Header = styled.header`
	width: 100%;
	height: 405px;
	display: flex;
	flex-direction: column;
	background-color: var(--color-primary);
`;

export const TopBar = styled.div`
	width: 100%;
	padding: 1.6rem 0;
	background-color: var(--color-primary-dark);
	display: flex;
	justify-content: space-between;
	align-items: center;

	a {
		width: 90%;
		margin: 0 auto;
		max-width: 1100px;
		transition: opacity 0.2s;
	}

	a:hover {
		opacity: 0.6;
	}
`;

export const Title = styled.div<TitleStyle>`
	width: 90%;
	flex: 1;
	position: relative;
	margin: ${(props) => props.margin || "0 auto"};
	max-width: 1100px;
	padding-bottom: 48px;

	display: flex;
	flex-direction: column;
	justify-content: ${(props) => props.justifyContent || "center"};
	align-items: flex-start;

	strong {
		font: 700 4.7rem "Poppins";
		max-width: 670px;
		line-height: 4.2rem;
		color: #fff;
	}
`;
