import React from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import sendIcon from "assets/images/icons/sendIcon.svg";
import ValidateForm from "./validationForm";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";

const PatrimonyTransfer = () => {
	const formRefs = React.useRef<(FormHandles | null)[]>([]);

	const [patrimoniesFistOwner, setPatrimoniesFistOwner] = React.useState<
		Context.StateProps[]
	>([]);

	const [patrimoniesSecondOwner, setPatrimoniesSecondOwner] = React.useState<
		Context.StateProps[]
	>([]);

	const handleTransferPatrimony = async (e: React.MouseEvent) => {
		if (formRefs.current[0]) {
			const dataFirstOwner = formRefs.current[0]?.getData();
			const validationForm = new ValidateForm(
				dataFirstOwner,
				formRefs.current[0]
			);
			await validationForm.validate();
		}

		if (formRefs.current[1]) {
			const dataSecondOwner = formRefs.current[1]?.getData();
			const validationForm = new ValidateForm(
				dataSecondOwner,
				formRefs.current[1]
			);
			await validationForm.validate();
		}
	};

	const setValuesPatrimoniesFirstOwner = (values: Context.StateProps[]) => {
		setPatrimoniesFistOwner(values);
	};

	const setValuesPatrimoniesSecondOwner = (values: Context.StateProps[]) => {
		setPatrimoniesSecondOwner(values);
	};

	return (
		<Styled.Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider
				value={{
					patrimonies: patrimoniesFistOwner,
					setValuesPatrimonies: setValuesPatrimoniesFirstOwner,
				}}
			>
				<Styled.OwnerItem>
					<Styled.Title>Primeiro Proprietário</Styled.Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</Styled.OwnerItem>
			</Context.PatrimonyOwnerContext.Provider>

			<Context.PatrimonyOwnerContext.Provider
				value={{
					patrimonies: patrimoniesSecondOwner,
					setValuesPatrimonies: setValuesPatrimoniesSecondOwner,
				}}
			>
				<Styled.OwnerItem>
					<Styled.Title>Segundo Proprietário</Styled.Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</Styled.OwnerItem>
			</Context.PatrimonyOwnerContext.Provider>

			<Styled.ButtonContainer>
				<Styled.ButtonSend onClick={handleTransferPatrimony}>
					Transferir
					<img src={sendIcon} alt="Transferir Patriônio" />
				</Styled.ButtonSend>
			</Styled.ButtonContainer>
		</Styled.Container>
	);
};

export default PatrimonyTransfer;
