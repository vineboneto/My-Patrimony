import React from "react";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import AsyncSelectOwner from "components/Selects/AsyncSelectOwner";
import searchIcon from "assets/images/icons/searchIcon.svg";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";

import api from "services/api";

export interface FormData {
	optionOwner: number;
}

interface ApiPatrimoniesData {
	id: number;
	model: string;
	number: string;
	Category: {
		id: number;
		name: string;
	};
}

const OwnerForm: React.ForwardRefRenderFunction<FormHandles, {}> = (
	{},
	ref
) => {
	const { setValuesPatrimonies } = React.useContext(
		Context.PatrimonyOwnerContext
	);

	const handleSubmit: SubmitHandler<FormData> = async (data) => {
		const patrimoniesValues = await getApiPatrimoniesDataById(data);
		setValuesPatrimonies(convertToStatePropsData(patrimoniesValues));
	};

	const getApiPatrimoniesDataById = async (data: FormData) => {
		const id = data.optionOwner;
		const url = `owners/${id}/patrimonies`;
		const response = await api.get(url);
		return response.data;
	};

	const convertToStatePropsData = (datas: ApiPatrimoniesData[]) => {
		const patrimonies = datas.map((data) => {
			return {
				id: data.id,
				model: data.model,
				patrimonyNumber: data.number,
				categoryName: data.Category.name,
				isSelect: false,
			};
		});
		return patrimonies;
	};

	return (
		<Form ref={ref} onSubmit={handleSubmit}>
			<AsyncSelectOwner name="optionOwner" label="Nome" />
			<Styled.SearchButton>
				<img src={searchIcon} alt="Buscar" />
			</Styled.SearchButton>
		</Form>
	);
};

export default React.memo(React.forwardRef(OwnerForm));
