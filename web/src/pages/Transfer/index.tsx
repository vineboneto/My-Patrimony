import React from "react";
import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import SearchBlock from "pages/Transfer/components/SearchBLock";
import ValidateForm from "./validationForm";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import PatrimonyItems from "./components/PatrimonyItems";

const PatrimonyTransfer = () => {
	const [firstOwnerId, setFirstOwnerId] = React.useState<number>(-1);
	const [patrimoniesFirstOwner, setPatrimoniesFirstOwner] = React.useState<
		Context.PatrimoniesItemData[]
	>([]);

	const handleTransfer = (e: React.MouseEvent) => {
		console.log(firstOwnerId);
	};

	const valuesFirstOwner = {
		ownerId: firstOwnerId,
		setOwnerId: setFirstOwnerId,
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
