import styled from "styled-components";

export const Item = styled.div`
	padding: 3.4rem;
	background-color: #fff;
	overflow: hidden;
	max-width: 74rem;
	border-radius: 0.8rem;
	margin: 0 auto;

	& + & {
		margin-top: 3rem;
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-bottom: 2rem;
	border-bottom: 1px solid var(--color-border-input);

	h2,
	span {
		font: 3rem "Archivo";
	}

	span {
		color: var(--color-primary-dark);
	}
`;

export const Content = styled.div`
	margin-top: 1.6rem;
	display: flex;
	justify-content: space-between;
	font: 2rem "Poppins";
`;

export const Info = styled.div`
	h3 {
		font: 2.2rem "Poppins" 600;
		margin-bottom: 1rem;
	}

	p span {
		color: var(--color-primary);
	}
`;

export const Ip = styled.p`
	max-width: 60rem;
	flex-wrap: wrap;
	overflow-wrap: break-word;

	& > :first-child ~ span {
		color: #000;
		margin: 0 5px;
	}
`;

export const Actions = styled.div`
	align-self: flex-end;

	& > :nth-child(2) {
		margin-left: 0.8rem;
	}
`;
