import styled from "styled-components";

interface PropsPatrimonyItem {
	select?: boolean;
}

export const PatrimonyContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
`;

export const PatrimonyItem = styled.div<PropsPatrimonyItem>`
	cursor: pointer;
	padding: 1rem 2rem;
	margin-top: 3rem;
	height: 17rem;
	width: 15rem;
	border: 1px solid #cecece;
	border-radius: 0.8rem 0 0.8rem 0;
	display: flex;
	flex-direction: column;
	background-color: ${(props) => (props.select ? "red" : "#fff")};

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
