import styled from "styled-components";
import { Form as Unform } from "@unform/web";

export const Form = styled(Unform)`
	display: grid;
	grid-template-columns: 250px 30px;
	justify-content: space-between;
	align-items: center;
	margin-top: 3rem;
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
