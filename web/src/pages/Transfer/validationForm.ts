import * as Yup from "yup";

export default class ValidateForm {
	private readonly datas: object;
	// private readonly schema: Yup.ObjectSchema<any>;

	constructor(datas: object) {
		this.datas = datas;
	}

	public validate = async () => {
		try {
			await this.tryValidate();
		} catch (err) {
			if (err instanceof Yup.ValidationError) throw err;
		}
	};

	private readonly tryValidate = async () => {
		const schema = this.createSchema();
		await schema.validate(this.datas, {
			abortEarly: false,
		});
	};

	private readonly createSchema = () => {
		const schema = Yup.object().shape({
			optionOwner: Yup.number()
				.moreThan(-1, "Nome Obrigatório")
				.required("Nome Obrigatório"),
		});
		return schema;
	};
}
