import React from "react";
import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import ValidateForm from "./ValidationForm";
import OwnerItem from "pages/Transfer/components/OwnerItem";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";
import * as Reducer from "pages/Transfer/hooks/reducer";
import * as Types from "pages/Transfer/hooks/types";
import * as loadPatrimonies from "pages/Transfer/components/PatrimonyItems/loadPatrimonies";
import * as Utils from "pages/Transfer/utils/filterPatrimonies";
import api from "services/api";

const PatrimonyTransfer = () => {
	const [reducerFistOwner, dispatchFirstOwner] = React.useReducer(
		Reducer.reducer,
		Reducer.INITIAL_STATE
	);

	const [reducerSecondOwner, dispatchSecondOwner] = React.useReducer(
		Reducer.reducer,
		Reducer.INITIAL_STATE
	);

	const patrimoniesSelected = Utils.filterPatrimoniesSelected(
		reducerFistOwner.patrimoniesData
	);
	const datasFistOwner = {
		optionOwner: reducerFistOwner.ownerData.ownerId,
		isSelect: patrimoniesSelected.length,
	};
	const dataSecondOwner = {
		optionOwner: reducerSecondOwner.ownerData.ownerId,
	};

	const handleTransfer = async (e: React.MouseEvent) => {
		try {
			await tryValidateOwner(datasFistOwner, dispatchFirstOwner);
			await tryValidateOwner(dataSecondOwner, dispatchSecondOwner);
			/**
			 * Chamar essas duas próximas funções nesta ordem
			 */
			await transferPatrimoniesSelectedToSecondOwner();
			await updatedPatrimoniesItems();
		} catch (err) {
			console.log(err);
		}
	};

	const updatedPatrimoniesItems = async () => {
		const firstOwnerId = reducerFistOwner.ownerData.ownerId;
		const secondOwnerId = reducerSecondOwner.ownerData.ownerId;
		await updatedPatrimoniesByOwnerId(firstOwnerId, dispatchFirstOwner);
		await updatedPatrimoniesByOwnerId(secondOwnerId, dispatchSecondOwner);
	};

	const updatedPatrimoniesByOwnerId = async (
		id: number,
		dispatch: (values: any) => void
	) => {
		const patrimonies = await loadPatrimonies.getApiPatrimoniesDataById(id);
		dispatch({
			type: Types.ActionsProps.SET_PATRIMONIES,
			patrimoniesData: patrimonies,
		});
	};

	const transferPatrimoniesSelectedToSecondOwner = async () => {
		for (let patrimony of patrimoniesSelected) {
			const url = `patrimonies/${patrimony.id}`;
			await transferPatrimonySelectedToSecondOwner(url);
		}
	};

	const transferPatrimonySelectedToSecondOwner = async (url: string) => {
		await api
			.patch(url, {
				ownerId: reducerSecondOwner.ownerData.ownerId,
			})
			.then(() => {
				alert("Transferido com sucesso");
			});
	};

	const tryValidateOwner = async (
		datas: object,
		dispatch: (value: any) => void
	) => {
		try {
			await validateData(datas);
		} catch (err) {
			if (existsErrorValidation(err)) {
				setErros(dispatch, err.message);
				throw Yup.ValidationError;
			}
		}
	};

	const setErros = (dispatch: (value: any) => void, messageError: string) => {
		dispatch({
			type: Types.ActionsProps.SET_ERRORS,
			messageError: messageError,
		});
	};

	const validateData = async (datas: object) => {
		const validateFistOwner = new ValidateForm(datas);
		await validateFistOwner.validate();
	};

	const existsErrorValidation = (err: any) => {
		if (err instanceof Yup.ValidationError) {
			return true;
		}
		return false;
	};

	const valuesFirstOwner = {
		state: reducerFistOwner,
		dispatch: dispatchFirstOwner,
	};

	const valuesSecondOwner = {
		state: reducerSecondOwner,
		dispatch: dispatchSecondOwner,
	};

	return (
		<Styled.Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider value={valuesFirstOwner}>
				<OwnerItem title="Primeiro proprietário" />
			</Context.PatrimonyOwnerContext.Provider>

			<Context.PatrimonyOwnerContext.Provider value={valuesSecondOwner}>
				<OwnerItem title="Segundo proprietário" />
			</Context.PatrimonyOwnerContext.Provider>

			<Submit handleSubmit={handleTransfer} />
		</Styled.Container>
	);
};

export default PatrimonyTransfer;
