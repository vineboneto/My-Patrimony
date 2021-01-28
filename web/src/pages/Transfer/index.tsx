import React, { MouseEvent, useCallback, useRef } from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import { Container, ButtonSend, ButtonContainer } from "./styled";
import OwnerItem from "./components/OwnerItem";

import sendIcon from "assets/images/icons/sendIcon.svg";

const Swap = () => {
	const formPrimaryRef = useRef<FormHandles>(null);
	const formSecondRef = useRef<FormHandles>(null);

	const handleTransferPatrimony = useCallback((e: MouseEvent) => {
		e.preventDefault();
		console.log(formPrimaryRef.current?.getData());
	}, []);

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />
			<OwnerItem title="Primeiro proprietário" ref={formPrimaryRef} />
			<OwnerItem title="Segundo proprietário" ref={formSecondRef} />
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
