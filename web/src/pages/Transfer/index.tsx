import React, { MouseEvent, useRef, useState } from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import { Container, ButtonSend, ButtonContainer } from "./styled";

import sendIcon from "assets/images/icons/sendIcon.svg";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import { OwnerItem } from "./components/OwnerItem/styled";
import * as Context from "./PatrimonyTransferContext";

const Swap = () => {
	const formRefs = useRef<(FormHandles | null)[]>([]);
	const [patrimonies, setPatrimonies] = useState<Context.StateProps[]>([]);

	const handleTransferPatrimony = (e: MouseEvent) => {
		e.preventDefault();
		console.log(formRefs.current[0]?.getData());
		console.log(patrimonies);
	};

	const setValuesPatrimonies = (values: Context.StateProps[]) => {
		setPatrimonies(values);
	};

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />
			<Context.PatrimonyTransferContext.Provider
				value={{ patrimonies, setValuesPatrimonies }}
			>
				<OwnerItem>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
				</OwnerItem>
			</Context.PatrimonyTransferContext.Provider>

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
