import React from "react";
import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import ValidateForm from "./validationForm";
import OwnerItem from "pages/Transfer/components/OwnerItem";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";

const PatrimonyTransfer = () => {
	const [firstOwner, setFirstOwner] = React.useState<Context.OwnerState>(
		Context.defaultValueOwnerState
	);

	const [secondOwner, setSecondOwner] = React.useState<Context.OwnerState>(
		Context.defaultValueOwnerState
	);

	const [patrimoniesFirstOwner, setPatrimoniesFirstOwner] = React.useState<
		Context.PatrimonyState[]
	>([]);

	const [patrimoniesSecondOwner, setPatrimoniesSecondOwner] = React.useState<
		Context.PatrimonyState[]
	>([]);

	const handleTransfer = async (e: React.MouseEvent) => {
		try {
			const datasFistOwner = {
				optionOwner: firstOwner.ownerId,
			};

			const datasSecondOwner = {
				optionOwner: secondOwner.ownerId,
			};
		} catch (err) {
			if (err instanceof Yup.ValidationError)
				setFirstOwner({ error: err.message, ownerId: firstOwner.ownerId });
		}
	};

	const factoryValidate = async (datas: object) => {
		const validation = new ValidateForm(datas);
		await validation.validate();
	};

	const valuesFirstOwner = {
		ownerState: firstOwner,
		setOwnerState: setFirstOwner,
		patrimonies: patrimoniesFirstOwner,
		setValuesPatrimonies: setPatrimoniesFirstOwner,
	};

	const valuesSecondOwner = {
		ownerState: secondOwner,
		setOwnerState: setSecondOwner,
		patrimonies: patrimoniesSecondOwner,
		setValuesPatrimonies: setPatrimoniesSecondOwner,
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
