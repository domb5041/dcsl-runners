//
// -------- FIND THE APP DEPLOYED HERE:
// -------- https://dcsl-runners.herokuapp.com
//
// -------- MORE OF MY WORK HERE:
// -------- www.dominicbutler.uk
//
// -------- GITHUB REPO:
// -------- https://github.com/domb5041/dcsl-runners

import React, { Component } from "react";
import Runner from "./Runner";
import Timer from "./Timer";
import AddRunner from "./AddRunner";
import "./App.css";

class App extends Component {
	state = {
		runners: [
			{ name: "tom", count: 0, total: 0, average: 0, last: 0 },
			{ name: "dom", count: 0, total: 0, average: 0, last: 0 },
			{ name: "ron", count: 0, total: 0, average: 0, last: 0 }
		],
		newRunner: { name: "" },
		currentTime: 0,
		minutes: 0,
		seconds: 0,
		timeRunning: true
	};

	// fireTime = () => {
	// 	this.state.timeRunning = true;
	// 	time = 0;
	// 	this.startTime();
	// };

	startTime = () => {
		let time = this.state.currentTime;
		let seconds = this.state.seconds;
		let minutes = this.state.minutes;
		seconds++;
		if (seconds >= 60) {
			minutes++;
			seconds = 0;
		}
		time++;
		this.setState({ currentTime: time, seconds: seconds, minutes: minutes });
		if (this.state.timeRunning) {
			setTimeout(this.startTime, 1000);
		}
	};

	stopTime = () => {
		this.state.timeRunning = false;
	};

	recordRunner = index => {
		let name = this.state.runners[index].name;
		let count = this.state.runners[index].count;
		let total = this.state.runners[index].total;
		let average = this.state.runners[index].average;
		let last = this.state.runners[index].last;

		count++;
		last = this.state.currentTime - total;
		total = this.state.currentTime;
		average = total / count;

		let runner = (this.state.runners[index] = {
			name: name,
			count: count,
			total: total,
			average: average,
			last: last
		});

		this.setState({ runner });
	};

	setNewRunnerName = event => {
		this.setState({ newRunner: { name: event.target.value } });
	};

	addNewRunner = () => {
		let newRunner = {
			name: this.state.newRunner.name,
			count: 0,
			total: 0,
			average: 0,
			last: 0
		};
		let runners = this.state.runners;
		runners.push(newRunner);

		this.setState({ runners });
	};

	render() {
		const runners = this.state.runners.map((runner, index) => {
			return (
				<Runner
					key={index}
					name={runner.name}
					count={runner.count}
					total={runner.total}
					average={runner.average}
					last={runner.last}
					record={() => this.recordRunner(index)}
				/>
			);
		});

		return (
			<div className="App">
				<Timer
					time={this.state.currentTime}
					start={this.startTime}
					stop={this.stopTime}
					seconds={this.state.seconds}
					minutes={this.state.minutes}
				/>
				<p>runners: {this.state.runners.length}</p>
				<div className="header">
					<p>name</p>
					<p>lap count</p>
					<p>total time</p>
					<p>average time</p>
					<p>last lap time</p>
				</div>

				{runners}
				{/* <AddRunner add={this.addNewRunner} /> */}

				<div className="add-runner">
					<br />
					<input
						type="text"
						value={this.state.newRunner.name}
						onChange={this.setNewRunnerName}
						placeholder="runner name"
					/>
					<button onClick={this.addNewRunner}>Add Runner</button>
				</div>
			</div>
		);
	}
}

export default App;
