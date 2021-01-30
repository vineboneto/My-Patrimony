import React, { MouseEvent, useRef, useState } from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import { Container, ButtonSend, ButtonContainer, OwnerItem } from "./styled";

import sendIcon from "assets/images/icons/sendIcon.svg";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import * as Context from "./PatrimonyTransferContext";
import { Title } from "./styled";
import PatrimonyItems from "./components/PatrimonyItems";

const Swap = () => {
	const formRefs = useRef<(FormHandles | null)[]>([]);

	const [patrimoniesFistOwner, setPatrimoniesFistOwner] = useState<
		Context.StateProps[]
	>([]);

	const [patrimoniesSecondOwner, setPatrimoniesSecondOwner] = useState<
		Context.StateProps[]
	>([]);

	const handleTransferPatrimony = (e: MouseEvent) => {
		e.preventDefault();
		console.log(formRefs.current[0]?.getData());
		console.log(formRefs.current[1]?.getData());
	};

	const setValuesPatrimoniesFirstOwner = (values: Context.StateProps[]) => {
		setPatrimoniesFistOwner(values);
	};

	const setValuesPatrimoniesSecondOwner = (values: Context.StateProps[]) => {
		setPatrimoniesSecondOwner(values);
	};

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />

			<Context.PatrimonyOwnerContext.Provider
				value={{
					patrimonies: patrimoniesFistOwner,
					setValuesPatrimonies: setValuesPatrimoniesFirstOwner,
				}}
			>
				<OwnerItem>
					<Title>Primeiro Proprietário</Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</OwnerItem>
			</Context.PatrimonyOwnerContext.Provider>

			<Context.PatrimonyOwnerContext.Provider
				value={{
					patrimonies: patrimoniesSecondOwner,
					setValuesPatrimonies: setValuesPatrimoniesSecondOwner,
				}}
			>
				<OwnerItem>
					<Title>Segundo Proprietário</Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</OwnerItem>
			</Context.PatrimonyOwnerContext.Provider>

			<ButtonContainer>
				<ButtonSend onClick={handleTransferPatrimony}>
					Transferir
					<img src={sendIcon} alt="Transferir Patriônio" />
				</ButtonSend>
			</ButtonContainer>
		</Container>
	);
};

export default Swap;
