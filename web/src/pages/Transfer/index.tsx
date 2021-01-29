import React, {
	createContext,
	MouseEvent,
	useCallback,
	useRef,
	useState,
} from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import { Container, ButtonSend, ButtonContainer } from "./styled";

import sendIcon from "assets/images/icons/sendIcon.svg";
import OwnerForm from "pages/Transfer/components/OwnerForm";
import { OwnerItem } from "./components/OwnerItem/styled";

export interface StateProps {
	id: number;
	model: string;
	categoryName: string;
	patrimonyNumber: string;
	isSelect?: boolean;
}

interface ContextProps {
	patrimonies: StateProps[];
	setValuesPatrimonies: (values: StateProps[]) => void;
}

export const TransferContext = createContext<ContextProps>(undefined!);

const Swap = () => {
	const formRefs = useRef<(FormHandles | null)[]>([]);
	const [patrimonies, setPatrimonies] = useState<StateProps[]>([]);

	const handleTransferPatrimony = (e: MouseEvent) => {
		e.preventDefault();
		console.log(formRefs.current[0]?.getData());
		console.log(patrimonies);
	};

	const setValuesPatrimonies = (values: StateProps[]) => {
		setPatrimonies(values);
	};

	return (
		<Container>
			<PageHeader title="Escolha os Proprietários" prev="/" />
			<TransferContext.Provider value={{ patrimonies, setValuesPatrimonies }}>
				<OwnerItem>
					<OwnerForm ref={(ref) => formRefs.current.push(ref)} />
				</OwnerItem>
			</TransferContext.Provider>

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
