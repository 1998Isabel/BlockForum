import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeCategory } from '../actions/categoryActions';
import { selectPost } from '../actions/postActions';

class Header extends Component {
	handleChange = (c) => {
		this.props.changeCategory(c);
		this.props.selectPost(null);
	}
	render() {
		const { category } = this.props;
		const categoryItems = category.categories.map((c, idx) => {
			return (
			<NavDropdown.Item key={idx} onClick={()=>this.handleChange(c)}>{c}</NavDropdown.Item>
			)
		})
		return (
			<Navbar bg="dark" expand="lg" variant="dark">
				<Navbar.Brand onClick={()=>this.handleChange(null)} style={{cursor: "pointer"}}>Block Forum</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="Categories" id="basic-nav-dropdown">
							{categoryItems}
						</NavDropdown>
					</Nav>
					<Form inline>
						<FormControl type="text" placeholder="Search post..." className="mr-sm-2" />
						<Button variant="outline-primary" onClick={this.props.showAccount}>Account</Button>
					</Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => ({
	category: state.category,
});

export default connect(mapStateToProps, { changeCategory, selectPost })(Header);
