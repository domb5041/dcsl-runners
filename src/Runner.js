import React from "react";
import Aux from "./Aux";

const Runner = props => {
	return (
		<Aux>
			<div className="runnerCell">{props.name}</div>
			<div className="runnerCell">{props.count}</div>
			<div className="runnerCell">{props.total}</div>
			<div className="runnerCell">{props.average}</div>
			<div className="runnerCell">{props.last}</div>
			<div className="runnerCell">
				<button disabled={!props.timeRunning} onClick={props.record}>
					Update
				</button>
			</div>
		</Aux>
	);
};

export default Runner;
