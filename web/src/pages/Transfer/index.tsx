import React, { MouseEvent, useRef, useState } from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import sendIcon from "assets/images/icons/sendIcon.svg";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";

const PatrimonyTransfer = () => {
	const formRefs = useRef<(FormHandles | null)[]>([]);

	const [patrimoniesFistOwner, setPatrimoniesFistOwner] = useState<
		Context.StateProps[]
	>([]);

	const [patrimoniesSecondOwner, setPatrimoniesSecondOwner] = useState<
		Context.StateProps[]
	>([]);

	const handleTransferPatrimony = async (e: MouseEvent) => {
		e.preventDefault();
		try {
			const dataFistOwner = formRefs.current[0]?.getData();
			const schema = Yup.object().shape({
				optionOwner: Yup.number().moreThan(-1, "Nome obrigatório").required(),
				patrimonyNumber: Yup.string(),
			});

			await schema.validate(dataFistOwner, {
				abortEarly: false,
			});
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				err.inner.forEach((error) => {
					if (error.path) {
						formRefs.current[0]?.setFieldError(error.path, error.message);
					}
				});
			}
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
