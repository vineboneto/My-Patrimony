import React from "react";
import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import SearchBlock from "pages/Transfer/components/SearchBlock";
import ValidateForm from "./validationForm";
import PatrimonyItems from "./components/PatrimonyItems";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";

const PatrimonyTransfer = () => {
	const [firstOwnerId, setFirstOwnerId] = React.useState<Context.OwnerState>(
		Context.defaultValueOwnerState
	);
	const [patrimoniesFirstOwner, setPatrimoniesFirstOwner] = React.useState<
		Context.PatrimonyState[]
	>([]);

	const handleTransfer = async (e: React.MouseEvent) => {
		try {
			const datas = {
				optionOwner: firstOwnerId,
			};

			const validation = new ValidateForm(datas);
			await validation.validate();
		} catch (err) {
			if (err instanceof Yup.ValidationError) console.log(err.message);
		}
	};

	const valuesFirstOwner = {
		ownerState: firstOwnerId,
		setOwnerState: setFirstOwnerId,
		patrimonies: patrimoniesFirstOwner,
		setValuesPatrimonies: setPatrimoniesFirstOwner,
	};

	return (
		<Styled.Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider value={valuesFirstOwner}>
				<Styled.OwnerItem>
					<SearchBlock title="Primeiro Proprietário" />
					<PatrimonyItems />
				</Styled.OwnerItem>
			</Context.PatrimonyOwnerContext.Provider>

			<Submit handleSubmit={handleTransfer} />
		</Styled.Container>
	);
};

export default PatrimonyTransfer;
