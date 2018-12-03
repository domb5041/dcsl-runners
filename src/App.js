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
import "./App.css";

class App extends Component {
	state = {
		runners: [
			{
				name: "Spongebob",
				count: 0,
				total: "--:--:--",
				totalRaw: 0,
				average: "--:--:--",
				last: "--:--:--"
			},
			{
				name: "Patrick",
				count: 0,
				total: "--:--:--",
				totalRaw: 0,
				average: "--:--:--",
				last: "--:--:--"
			},
			{
				name: "Squidward",
				count: 0,
				total: "--:--:--",
				totalRaw: 0,
				average: "--:--:--",
				last: "--:--:--"
			}
		],
		newRunner: { name: "" },
		rawTime: 0,
		cookedTime: "00:00:00",
		timeRunning: false,
		adding: false
	};

	convertTime = rawTime => {
		let minutes = Math.floor(rawTime / 6000);
		let seconds = Math.floor((rawTime % 6000) / 100);
		let millsecs = Math.floor(rawTime % 100);

		if (millsecs < 10) {
			millsecs = "0" + millsecs;
		}
		if (seconds < 10) {
			seconds = "0" + seconds;
		}
		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		let convertTime = minutes + ":" + seconds + ":" + millsecs;

		return convertTime;
	};

	startTime = () => {
		this.setState({
			timeRunning: true
		});
		this.runTime();
		if (!this.state.timeRunning) {
			setTimeout(this.startTime, 1);
		}
	};

	runTime = () => {
		if (this.state.timeRunning) {
			let rawTime = this.state.rawTime;

			rawTime++;
			this.setState({
				rawTime: rawTime,
				cookedTime: this.convertTime(rawTime)
			});

			setTimeout(this.runTime, 1);
		}
	};

	stopTime = () => {
		this.setState({
			timeRunning: false
		});
	};

	resetTime = () => {
		this.setState({ rawTime: 0, cookedTime: "00:00:00" });

		for (let i = 0; i < this.state.runners.length; i++) {
			let runner = ({ ...this.state.runners[i] } = {
				name: [...this.state.runners[i].name],
				count: 0,
				total: "--:--:--",
				totalRaw: 0,
				average: "--:--:--",
				last: "--:--:--"
			});

			this.setState({ runner });
		}
	};

	recordRunner = index => {
		let name = this.state.runners[index].name;
		let count = this.state.runners[index].count;
		let total = this.state.runners[index].total;
		let totalRaw = this.state.runners[index].totalRaw;
		let average = this.state.runners[index].average;
		let last = this.state.runners[index].last;

		last = this.state.rawTime - totalRaw;
		count++;
		total = this.state.rawTime;
		average = total / count;

		let runner = ({ ...this.state.runners[index] } = {
			name: name,
			count: count,
			total: this.convertTime(total),
			totalRaw: total,
			average: this.convertTime(average),
			last: this.convertTime(last)
		});

		this.setState({ runner });
	};

	setNewRunnerName = event => {
		this.setState({ newRunner: { name: event.target.value }, adding: true });
	};

	addNewRunner = e => {
		if (this.state.newRunner.name.length > 0 && e.key === "Enter") {
			let newRunner = {
				name: this.state.newRunner.name,
				count: 0,
				total: "--:--:--",
				totalRaw: 0,
				average: "--:--:--",
				last: "--:--:--"
			};
			let newRunners = this.state.runners.push(newRunner);
			this.setState({ newRunners });
			this.setState({ newRunner: { name: "" }, adding: false });
		}
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
					timeRunning={this.state.timeRunning}
				/>
			);
		});

		let addNew;

		if (this.state.adding) {
			addNew = (
				<input
					type="text"
					value={this.state.newRunner.name}
					onChange={this.setNewRunnerName}
					disabled={this.state.rawTime > 0}
					onKeyPress={this.addNewRunner}
					autoFocus={true}
				/>
			);
		} else {
			addNew = (
				<button
					onClick={this.setNewRunnerName}
					disabled={this.state.rawTime > 0}
				>
					Add Runner
				</button>
			);
		}

		return (
			<div className="App">
				<Timer
					time={this.state.rawTime}
					start={this.startTime}
					stop={this.stopTime}
					reset={this.resetTime}
					cookedTime={this.state.cookedTime}
					timeRunning={this.state.timeRunning}
				/>

				<div className="runnerGrid">
					<div className="runnerCell">NAME</div>
					<div className="runnerCell">LAP COUNT</div>
					<div className="runnerCell">TOTAL TIME</div>
					<div className="runnerCell">AVERAGE TIME</div>
					<div className="runnerCell">LAST LAP TIME</div>
					<div className="runnerCell">RECORD LAPS</div>
					{runners}
					<div className="runnerCell">{addNew}</div>
					<div className="runnerCell" />
					<div className="runnerCell" />
					<div className="runnerCell" />
					<div className="runnerCell" />
					<div className="runnerCell" />
				</div>
			</div>
		);
	}
}

export default App;
