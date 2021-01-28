import React, { forwardRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import AsyncSelectOwner from "components/Selects/AsyncSelectOwner";
import Input from "components/Inputs/Input";

import {
	Title,
	OwnerItem as StyledOwnerItem,
	SearchButton,
	PatrimonyContainer,
	PatrimonyItem,
	CategoryName,
} from "./styled";

import searchIcon from "assets/images/icons/searchIcon.svg";
import api from "services/api";

interface Props {
	title: string;
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

interface StateProps {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect?: boolean;
}

const OwnerItem: React.ForwardRefRenderFunction<FormHandles, Props> = (
	{ title },
	ref
) => {
	const [patrimonies, setPatrimonies] = useState<StateProps[]>([]);
	const handleSubmit: SubmitHandler<FormData> = async (data) => {
		const patrimoniesValues = await getApiPatrimoniesDataById(data.optionOwner);
		setPatrimonies(convertToStatePropsData(patrimoniesValues));
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
			};
		});
		return patrimonies;
	};

	const handleSelectPatrimony = (patrimony: StateProps) => {
		const newPatrimonies = patrimonies.map((value, index) => {
			if (value.id === patrimony.id) {
				value.isSelect = value.isSelect ? !value.isSelect : true;
				return value;
			}
			return value;
		});
		setPatrimonies(newPatrimonies);
	};

	return (
		<StyledOwnerItem>
			<Title>{title}</Title>
			<Form ref={ref} onSubmit={handleSubmit}>
				<AsyncSelectOwner name="optionOwner" label="Nome" />
				<Input name="patrimonyNumber" label="Patrimônio" />
				<SearchButton>
					<img src={searchIcon} alt="Buscar" />
				</SearchButton>
			</Form>
			<PatrimonyContainer>
				{patrimonies.map((patrimony: StateProps) => (
					<PatrimonyItem
						key={patrimony.id}
						select={patrimony.isSelect}
						onClick={() => handleSelectPatrimony(patrimony)}
					>
						<CategoryName>{patrimony.categoryName}</CategoryName>
						<span>{patrimony.model}</span>
						<span>{patrimony.patrimonyNumber}</span>
					</PatrimonyItem>
				))}
			</PatrimonyContainer>
		</StyledOwnerItem>
	);
};

export default forwardRef(OwnerItem);
