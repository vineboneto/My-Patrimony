import styled from "styled-components";

export const SearchBlock = styled.div`
	margin-bottom: 3rem;

	& > :nth-child(2) {
		max-width: 350px;
	}
`;

export const Title = styled.h2`
	padding-bottom: 2rem;
	margin-bottom: 3rem;
	border-bottom: 1px solid var(--color-border-input);
`;
