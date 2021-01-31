import React from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import ValidateForm from "./validationForm";
import OwnerItem from "pages/Transfer/components/OwnerItem";
import sendIcon from "assets/images/icons/sendIcon.svg";
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
			await factoryValidateForm(dataFirstOwner, formRefs.current[0]);
		}

		if (formRefs.current[1]) {
			const dataSecondOwner = formRefs.current[1]?.getData();
			await factoryValidateForm(dataSecondOwner, formRefs.current[1]);
		}
	};

	const factoryValidateForm = async (datas: object, ref: FormHandles) => {
		const validationForm = new ValidateForm(datas, ref);
		await validationForm.validate();
	};

	const setValuesPatrimoniesFirstOwner = (values: Context.StateProps[]) => {
		setPatrimoniesFistOwner(values);
	};

	const setValuesPatrimoniesSecondOwner = (values: Context.StateProps[]) => {
		setPatrimoniesSecondOwner(values);
	};

	const valuesFistOwner = {
		patrimonies: patrimoniesFistOwner,
		setValuesPatrimonies: setValuesPatrimoniesFirstOwner,
	};

	const valuesSecondOwner = {
		patrimonies: patrimoniesSecondOwner,
		setValuesPatrimonies: setValuesPatrimoniesSecondOwner,
	};

	return (
		<Styled.Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider value={valuesFistOwner}>
				<OwnerItem title="Primeiro proprietário" formRefs={formRefs} />
			</Context.PatrimonyOwnerContext.Provider>

			<Context.PatrimonyOwnerContext.Provider value={valuesSecondOwner}>
				<OwnerItem title="Segundo proprietário" formRefs={formRefs} />
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
