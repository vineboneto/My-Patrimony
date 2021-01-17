import styled from "styled-components";

export const Container = styled.div`
	width: 100vw;

	&:last-child {
		margin-bottom: 5rem;
	}
`;

export const Main = styled.main`
	margin-top: -1rem;
`;

export const Search = styled.div`
	max-width: 74rem;
	margin: -12.4rem auto 0;
	display: grid;
	grid-template-columns: 250px 250px 190px;
	justify-content: space-between;
	margin-bottom: 3rem;
	row-gap: 2rem;
	column-gap: 2rem;

	label {
		color: #fff;
	}

	& > :last-child {
		align-self: flex-end;
		justify-self: flex-start;
	}

	& > :last-child img {
		background-color: var(--color-primary);
	}
`;

export const SearchIcon = styled.span`
	cursor: pointer;
`;

export const Pagination = styled.div`
	margin: 5rem auto;
	max-width: 74rem;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Pages = styled.div`
	/* display: flex; */
`;

export const Page = styled.button`
	padding: 0.8rem 1.8rem;
	margin: 0 1rem;
	border: 0;
	border-radius: 0.8rem;
	background-color: var(--color-primary);
	color: #fff;
	cursor: pointer;
`;
