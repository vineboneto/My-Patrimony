import styled from "styled-components";

interface PropsPatrimonyItem {
	select?: boolean;
}

export const PatrimonyContainer = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
`;

export const PatrimonyItem = styled.div<PropsPatrimonyItem>`
	cursor: pointer;
	padding: 1rem 2rem;
	height: 17rem;
	width: 15rem;
	margin: 2rem 1.7rem 0 0;
	border: 3px solid;
	border-color: ${(props) =>
		props.select ? "var(--color-success)" : "#cecece"};
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
