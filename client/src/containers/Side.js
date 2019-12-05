import React, { Component } from 'react';
import './../css/bootstrap.min.css';
import { connect } from 'react-redux';
import { getCategories } from '../actions/categoryActions';

class Side extends Component {
	componentDidMount() {
		this.props.getCategories();
	}

	render() {
		const sidelist = this.props.category.categories.map((c, index) => {
			return (
				<li key={index} className="list-group-item d-flex justify-content-between align-items-center">
					{c}
					<span className="badge badge-primary badge-pill">{10}</span>
				</li>
			)
		})
		return (
			<div>
				<h5>Catagories</h5>
				<ul className="list-group">
					{sidelist}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
    category: state.category
});

export default connect(mapStateToProps, { getCategories })(Side);
