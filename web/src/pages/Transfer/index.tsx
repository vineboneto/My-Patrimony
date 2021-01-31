import React from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import PatrimonyItems from "pages/Transfer/components/PatrimonyItems";
import sendIcon from "assets/images/icons/sendIcon.svg";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import * as Yup from "yup";

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
			await validationForm(dataFirstOwner, formRefs.current[0]);
		}

		if (formRefs.current[1]) {
			const dataSecondOwner = formRefs.current[1]?.getData();
			await validationForm(dataSecondOwner, formRefs.current[1]);
		}
	};

	const validationForm = async (datas: object, ref: FormHandles) => {
		try {
			const schema = createSchema();
			await schema.validate(datas, {
				abortEarly: false,
			});
			ref.setErrors({});
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				setErrors(err, ref);
			}
		}
	};

	const createSchema = () => {
		const schema = Yup.object().shape({
			optionOwner: Yup.number().moreThan(-1, "Nome obrigatório").required(),
			patrimonyNumber: Yup.string(),
		});
		return schema;
	};

	const setErrors = (err: Yup.ValidationError, ref: FormHandles) => {
		err.inner.forEach((error) => {
			if (error.path) ref.setFieldError(error.path, error.message);
		});
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
