import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;

	& > :last-child {
		margin-bottom: 5rem;
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
