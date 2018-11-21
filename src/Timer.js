import React from "react";

const Timer = props => {
	return (
		<div className="timer">
			<button onClick={props.start}>Start Race</button>
			<button onClick={props.stop}>End Race</button>
			<p>
				{props.time} // {props.minutes}:{props.seconds}
			</p>
		</div>
	);
};

export default Timer;
