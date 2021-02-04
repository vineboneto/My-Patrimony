import React from "react";
import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import ValidateForm from "./ValidationForm";
import OwnerItem from "pages/Transfer/components/OwnerItem";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";
import * as loadPatrimonies from "pages/Transfer/components/PatrimonyItems/loadPatrimonies";
import api from "services/api";

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
			try {
				const filterSelectedPatrimony = patrimoniesFirstOwner.filter(
					(patrimony) => patrimony.isSelect === true
				);
				const datasFistOwner = {
					optionOwner: firstOwner.ownerId,
					isSelect: filterSelectedPatrimony.length,
				};
				const validateFistOwner = new ValidateForm(datasFistOwner);

				await validateFistOwner.validate();
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					setFirstOwner({ ownerId: firstOwner.ownerId, error: err.message });
					throw Yup.ValidationError;
				}
			}

			try {
				const datasSecondOwner = {
					optionOwner: secondOwner.ownerId,
				};
				const validateSecondOwner = new ValidateForm(datasSecondOwner);

				await validateSecondOwner.validate();
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					setSecondOwner({ ownerId: secondOwner.ownerId, error: err.message });
					throw Yup.ValidationError;
				}
			}

			const patrimoniesSelected = patrimoniesFirstOwner.filter(
				(patrimony) => patrimony.isSelect === true
			);

			patrimoniesSelected.forEach((patrimony) => {
				console.log(patrimony.id);
				const url = `patrimonies/${patrimony.id}`;
				api
					.patch(url, {
						ownerId: secondOwner.ownerId,
					})
					.then(() => {
						alert("Patrimônio transferido com sucesso");
					});
			});

			const updatedFistOwner = await loadPatrimonies.getApiPatrimoniesDataById(
				firstOwner.ownerId
			);
			const updatedSecondOwner = await loadPatrimonies.getApiPatrimoniesDataById(
				secondOwner.ownerId
			);

			setPatrimoniesFirstOwner(updatedFistOwner);
			setPatrimoniesSecondOwner(updatedSecondOwner);
		} catch (err) {
			console.log(err);
		}
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
