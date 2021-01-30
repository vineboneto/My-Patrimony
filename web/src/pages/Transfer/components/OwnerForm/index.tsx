import React, { forwardRef, useContext } from "react";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";

import Input from "components/Inputs/Input";
import AsyncSelectOwner from "components/Selects/AsyncSelectOwner";
import api from "services/api";
import Button from "components/Button";
import { PatrimonyTransferContext } from "pages/Transfer/PatrimonyTransferContext";

interface Props {
	handleSubmit?: () => void;
}

interface FormData {
	patrimonyNumber: string;
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

const OwnerForm: React.ForwardRefRenderFunction<FormHandles, Props> = (
	{ handleSubmit },
	ref
) => {
	const { setValuesPatrimonies } = useContext(PatrimonyTransferContext);

	const handleSubmitTest: SubmitHandler<FormData> = async (data) => {
		const patrimoniesValues = await getApiPatrimoniesDataById(data.optionOwner);
		setValuesPatrimonies(convertToStatePropsData(patrimoniesValues));
	};

	const getApiPatrimoniesDataById = async (id: number) => {
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
		<Form ref={ref} onSubmit={handleSubmitTest}>
			<AsyncSelectOwner name="optionOwner" label="Nome" />
			<Input name="patrimonyNumber" label="Patriônio" />
			<Button>Search</Button>
		</Form>
	);
};

export default forwardRef(OwnerForm);
