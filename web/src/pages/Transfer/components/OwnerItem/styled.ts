import styled from "styled-components";

export const OwnerItem = styled.div`
	max-width: 74rem;
	margin: -10rem auto 0;
	background-color: #fff;
	padding: 3.4rem;

	form {
		display: grid;
		grid-template-columns: repeat(2, 250px) 30px;
		justify-content: space-between;
		align-items: center;
		margin-top: 3rem;
	}

	& + & {
		margin-top: 5rem;
	}
`;

export const Title = styled.h2`
	padding-bottom: 2rem;
	border-bottom: 1px solid var(--color-border-input);
`;
