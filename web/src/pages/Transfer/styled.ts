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
		grid-template-columns: repeat(2, 250px);
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

export const ContainerBox = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

export const Box = styled.div`
	cursor: pointer;
	padding: 1rem 2rem;
	margin-top: 3rem;
	height: 17rem;
	max-width: 15rem;
	border: 1px solid #cecece;
	border-radius: 0.8rem 0 0.8rem 0;
	display: flex;
	flex-direction: column;

	span {
		font-size: 1.8rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}
`;

export const CategoryName = styled.h4`
	font-size: 2.4rem;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--color-primary-dark);
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

export const ButtonSwap = styled.button`
	background-color: var(--color-danger);
`;

export const ButtonSend = styled.button`
	background-color: var(--color-success);
`;
