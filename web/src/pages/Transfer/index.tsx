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

	const handleTransfer = async (e: React.MouseEvent) => {
		try {
			try {
				const filterSelectedPatrimony = reducerFistOwner.patrimoniesData.filter(
					(patrimony: Types.PatrimonyData) => patrimony.isSelect === true
				);
				const datasFistOwner = {
					optionOwner: reducerFistOwner.ownerData.ownerId,
					isSelect: filterSelectedPatrimony.length,
				};
				const validateFistOwner = new ValidateForm(datasFistOwner);

				await validateFistOwner.validate();
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					dispatchFirstOwner({
						type: Types.ActionsProps.SET_ERRORS,
						messageError: err.message,
					});
					throw Yup.ValidationError;
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const valuesFirstOwner = {
		state: reducerFistOwner,
		dispatch: dispatchFirstOwner,
	};

	return (
		<Styled.Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider value={valuesFirstOwner}>
				<OwnerItem title="Primeiro proprietário" />
			</Context.PatrimonyOwnerContext.Provider>

			{/* <Context.PatrimonyOwnerContext.Provider value={valuesSecondOwner}>
				<OwnerItem title="Segundo proprietário" />
			</Context.PatrimonyOwnerContext.Provider> */}

			<Submit handleSubmit={handleTransfer} />
		</Styled.Container>
	);
};

export default PatrimonyTransfer;
