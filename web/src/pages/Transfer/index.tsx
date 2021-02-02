import React from "react";
import { FormHandles } from "@unform/core";

import PageHeader from "components/PageHeader";
import Submit from "pages/Transfer/components/Submit";
import OwnerItem from "pages/Transfer/components/OwnerItem";
import ValidateForm from "./validationForm";
import * as Context from "pages/Transfer/hooks/context";
import * as Styled from "./styled";
import api from "services/api";

const PatrimonyTransfer = () => {
	const formRefs = React.useRef<(FormHandles | null)[]>([]);

	const [patrimoniesFistOwner, setPatrimoniesFistOwner] = React.useState<
		Context.StateProps[]
	>([]);

	const [patrimoniesSecondOwner, setPatrimoniesSecondOwner] = React.useState<
		Context.StateProps[]
	>([]);

	const handleTransferPatrimony = async (e: React.MouseEvent) => {
		if (formRefs.current[0] && formRefs.current[1]) {
			try {
				const dataFirstOwner: any = formRefs.current[0]?.getData();
				await factoryValidateForm(dataFirstOwner, formRefs.current[0]);
				const dataSecondOwner: any = formRefs.current[1]?.getData() || {};
				await factoryValidateForm(dataSecondOwner, formRefs.current[1]);

				const patrimoniesSelected = filterPatrimoniesSelected();

				// const updatedOwnerIdStatePatrimony = filterPatrimoniesSelected.map(
				// 	(patrimony) => {
				// 		return {
				// 			...patrimony,
				// 			ownerId: dataSecondOwner.optionOwner,
				// 		};
				// 	}
				// );

				// const filterPatrimoniesUnSelected = patrimoniesFistOwner.filter(
				// 	(patrimony) => patrimony.isSelect === false
				// );

				// setPatrimoniesFistOwner(filterPatrimoniesUnSelected);

				// setPatrimoniesSecondOwner(
				// 	patrimoniesSecondOwner.concat(updatedOwnerIdStatePatrimony)
				// );

				// for (let i = 0; i < filterPatrimoniesSelected.length; i++) {
				// 	api
				// 		.patch(`patrimonies/${filterPatrimoniesSelected[i].id}`, {
				// 			ownerId: dataSecondOwner.optionOwner,
				// 		})
				// 		.then(() => {
				// 			alert("Transferido com sucesso");
				// 		});
				// }
			} catch (err) {
				console.log(err);
			}
		}
	};

	const filterPatrimoniesSelected = () => {
		const selected = patrimoniesFistOwner.filter(
			(patrimony) => patrimony.isSelect === true
		);
		return selected;
	};

	const updatedOwnerIdStatePatrimony = (datas: Context.StateProps[]) => {
		const updated = datas.map((patrimony) => {
			return {
				...patrimony,
				ownerId: dataSecondOwner.optionOwner,
			};
		});
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

			<Submit handleSubmit={handleTransferPatrimony} />
		</Styled.Container>
	);
};

export default PatrimonyTransfer;
