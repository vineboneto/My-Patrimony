import React, { useState } from "react";
import Select from "react-select";
import * as Styled from "./styled";

const Test: React.FC = () => {
	const options = [
		{ value: "chocolate", label: "Chocolate" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "vanilla", label: "Vanilla" },
	];

	const [value, setValue] = useState({
		value: "",
		label: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(value);
	};

	const handleChange = (value: any) => setValue(value);

	return (
		<Styled.Test>
			<form onSubmit={handleSubmit}>
				<Select
					defaultValue={null}
					options={options}
					value={value}
					onChange={handleChange}
				/>
				<button>Submit</button>
			</form>
		</Styled.Test>
	);
};

export default Test;
