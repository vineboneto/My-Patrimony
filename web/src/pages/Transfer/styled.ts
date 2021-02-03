import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;

	& > :last-child {
		margin-bottom: 5rem;
	}
`;

export const OwnerItem = styled.div`
	max-width: 74rem;
	margin: -10rem auto 0;
	background-color: #fff;
	padding: 3.4rem;

	& + & {
		margin-top: 5rem;
	}
`;
