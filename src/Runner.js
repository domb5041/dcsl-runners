import React from "react";

const Runner = props => {
	return (
		<div className="runner">
			<button onClick={props.record}>{props.name}</button>
			<p>{props.count}</p>
			<p>{props.total}</p>
			<p>{props.average}</p>
			<p>{props.last}</p>
		</div>
	);
};

export default Runner;
