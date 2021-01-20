import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;
`;

export const Main = styled.main`
	background-color: #fff;
	max-width: 74rem;
	border-radius: 0.8rem;
	margin: -8.2rem auto 3.2rem;
	padding-top: 3.4rem;
	/* overflow: hidden; */
	z-index: 3;
`;

export const OwnerData = styled.div`
	display: grid;
	grid-template-columns: 300px 300px;

	grid-template-areas: "owner sector";
	justify-content: space-between;
	align-items: center;
`;

export const PatrimonyData = styled.div`
	display: grid;
	grid-template-areas:
		"category patrimony model"
		"description description description";
	grid-template-columns: repeat(3, 200px);
	justify-content: space-between;
	align-items: center;

	& > :nth-child(1),
	& :nth-child(2) {
		grid-area: category;
	}

	& > :nth-child(5) {
		margin-top: 2.4rem;
		grid-area: description;
	}
`;

export const IpData = styled.div`
	& > div {
		display: grid;
		grid-template-columns: repeat(3, 180px) 1fr;
		grid-template-areas: "ip mask gateway delete";
		justify-content: space-between;
		align-items: center;
		padding: 1.4rem 0;
		column-gap: 3rem;
		row-gap: 3rem;
	}

	&:last-child {
		margin-bottom: 3rem;
	}
`;

export const Delete = styled.button`
	outline: 0;
	border: 0;
	background-color: #fff;
	align-self: flex-end;
	cursor: pointer;
`;

export const Footer = styled.footer`
	height: 138px;
	background-color: var(--color-border-input);
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 3.4rem;
`;
