import { FormHandles } from "@unform/core";
import { throws } from "assert";
import * as Yup from "yup";

export default class ValidateForm {
	private readonly ref: FormHandles;
	private readonly datas: object;

	constructor(datas: object, ref: FormHandles) {
		this.datas = datas;
		this.ref = ref;
	}

	public validate = async () => {
		try {
			await this.tryValidate();
			this.ref.setErrors({});
		} catch (err) {
			this.setValidationErrors(err);
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
			optionOwner: Yup.number().moreThan(-1, "Nome obrigatório").required(),
			patrimonyNumber: Yup.string(),
		});
		return schema;
	};

	private readonly setValidationErrors = async (err: any) => {
		if (err instanceof Yup.ValidationError) {
			await this.setErrors(err);
			throw Yup.ValidationError;
		}
	};

	private readonly setErrors = async (err: Yup.ValidationError) => {
		err.inner.forEach((error) => {
			if (error.path) this.ref.setFieldError(error.path, error.message);
		});
	};
}
