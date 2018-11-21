import React from "react";

const AddRunner = props => {
	return (
		<div className="add-runner">
			<br />
			<input
				type="text"
				value={props.newName}
				onChange={props.changeName}
				placeholder="runner name"
			/>
			<button onClick={props.add}>Add Runner</button>
		</div>
	);
};

export default AddRunner;
