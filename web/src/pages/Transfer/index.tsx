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

const PatrimonyTransfer = () => {
	const [reducerFistOwner, dispatchFirstOwner] = React.useReducer(
		Reducer.reducer,
		Reducer.INITIAL_STATE
	);

	const [reducerSecondOwner, dispatchSecondOwner] = React.useReducer(
		Reducer.reducer,
		Reducer.INITIAL_STATE
	);

	const filterPatrimoniesSelected = () => {
		const selected = reducerFistOwner.patrimoniesData.filter(
			(patrimony: Types.PatrimonyData) => patrimony.isSelect === true
		);
		return selected;
	};

	const patrimoniesSelected = filterPatrimoniesSelected();
	const datasFistOwner = {
		optionOwner: reducerFistOwner.ownerData.ownerId,
		isSelect: patrimoniesSelected.length,
	};
	const dataSecondOwner = {
		optionOwner: reducerSecondOwner.ownerData.ownerId,
	};

	const handleTransfer = async (e: React.MouseEvent) => {
		try {
			await tryValidateFistOwner();
			await tryValidateSecondOwner();
		} catch (err) {
			console.log(err);
		}
	};

	const tryValidateFistOwner = async () => {
		try {
			await validateData(datasFistOwner);
		} catch (err) {
			if (existsErrorValidation(err)) {
				setErrorsFistOwner(err.message);
				throw Yup.ValidationError;
			}
		}
	};

	const tryValidateSecondOwner = async () => {
		try {
			await validateData(dataSecondOwner);
		} catch (err) {
			if (existsErrorValidation(err)) {
				setErrorsSecondOwner(err.message);
			}
		}
	};

	const setErrorsFistOwner = (messageError: string) => {
		dispatchFirstOwner({
			type: Types.ActionsProps.SET_ERRORS,
			messageError: messageError,
		});
	};

	const setErrorsSecondOwner = (messageError: string) => {
		dispatchSecondOwner({
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
