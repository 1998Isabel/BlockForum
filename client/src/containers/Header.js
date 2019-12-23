import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { changeCategory } from '../actions/categoryActions';

class Header extends Component {
	render() {
		const { category, changeCategory } = this.props;
		const categoryItems = category.categories.map((c, idx) => {
			return (
			<NavDropdown.Item key={idx} onClick={()=>changeCategory(c)}>{c}</NavDropdown.Item>
			)
		})
		return (
			<Navbar bg="dark" expand="lg" variant="dark">
				<Navbar.Brand onClick={()=>changeCategory(null)} style={{cursor: "pointer"}}>真。論壇</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<NavDropdown title="Categories" id="basic-nav-dropdown">
							{categoryItems}
						</NavDropdown>
						<Nav.Link >Popular</Nav.Link>
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

export default connect(mapStateToProps, { changeCategory })(Header);
