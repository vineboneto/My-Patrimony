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

export const SearchButton = styled.button`
	outline: 0;
	border: 0;
	background-color: #fff;
	cursor: pointer;
	align-self: flex-end;

	img {
		background-color: #fff;
	}
`;

export const ButtonContainer = styled.div`
	max-width: 74rem;
	margin: 3rem auto 0;
	display: flex;
	flex-direction: column;
	align-items: flex-end;

	button {
		color: #fff;
		width: 24rem;
		height: 6rem;
		border-radius: 0.8rem;
		display: flex;
		justify-content: center;
		align-items: center;
		outline: 0;
		border: none;
	}

	button + button {
		margin-top: 3rem;
	}
`;

export const ButtonSend = styled.button`
	background-color: var(--color-success);
`;
