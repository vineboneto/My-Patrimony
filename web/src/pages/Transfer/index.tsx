import React, { MouseEvent, useRef, useState } from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import { Container, ButtonSend, ButtonContainer, OwnerItem } from "./styled";

import sendIcon from "assets/images/icons/sendIcon.svg";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import * as Context from "./PatrimonyTransferContext";
import { Title } from "pages/Home/styled";
import PatrimonyItems from "./components/PatrimonyItems";

const Swap = () => {
	const formRefs = useRef<(FormHandles | null)[]>([]);

	const [patrimonies, setPatrimonies] = useState<Context.StateProps[]>([]);
	const [patrimonies2, setPatrimonies2] = useState<Context.StateProps[]>([]);

	const handleTransferPatrimony = (e: MouseEvent) => {
		e.preventDefault();
		console.log(formRefs.current[0]?.getData());
	};

	const setValuesPatrimonies = (values: Context.StateProps[]) => {
		setPatrimonies(values);
	};

	const setValuesPatrimonies2 = (values: Context.StateProps[]) => {
		setPatrimonies2(values);
	};

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />
			<Context.FirstOwnerContext.Provider
				value={{ patrimonies, setValuesPatrimonies }}
			>
				<OwnerItem>
					<Title>Primeiro Proprietário</Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</OwnerItem>
			</Context.FirstOwnerContext.Provider>

			{/* <Context.PatrimonyTransferContext.Provider
				value={{ patrimonies2, setValuesPatrimonies2 }}
			>
				<OwnerItem>
					<Title>Segundo Proprietário</Title>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
					<PatrimonyItems />
				</OwnerItem>
			</Context.PatrimonyTransferContext.Provider> */}

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
