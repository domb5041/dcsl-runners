import React from "react";

const Timer = props => {
	return (
		<div className="timer">
			<p>{props.cookedTime}</p>
			<button disabled={props.timeRunning} onClick={props.start}>
				Start
			</button>
			<button disabled={!props.timeRunning} onClick={props.stop}>
				Stop
			</button>
			<button
				disabled={props.timeRunning || props.time === 0}
				onClick={props.reset}
			>
				Reset
			</button>
		</div>
	);
};

export default Timer;
