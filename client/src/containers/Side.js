import React, { Component } from 'react';
import './../css/bootstrap.min.css';

var topics = [
	{
		name: "News",
		postnum: 4,
	},
	{
		name: "International",
		postnum: 18,
	},
	{
		name: "Sports",
		postnum: 20,
	},
	{
		name: "Entertainment",
		postnum: 5,
	},
	{
		name: "Economics",
		postnum: 9,
	}
]

class Side extends Component {
	sidelist = topics.map((t, index) => {
		return (
			<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
				{t.name}
				<span className="badge badge-primary badge-pill">{t.postnum}</span>
			</li>
		)
	})

	render() {
		return (
			<div>
				<h5>Catagories</h5>
				<ul className="list-group">
					{this.sidelist}
				</ul>
			</div>
		);
	}
}

export default Side;
