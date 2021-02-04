import styled from "styled-components";

export const OwnerItem = styled.div`
	max-width: 74rem;
	margin: -10rem auto 0;
	background-color: #fff;
	padding: 3.4rem;

	& + & {
		margin-top: 5rem;
	}
`;

export const Title = styled.h2`
	padding-bottom: 2rem;
	margin-bottom: 3rem;
	border-bottom: 1px solid var(--color-border-input);
`;
