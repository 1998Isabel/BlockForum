import React, { Component } from "react";
import { Button, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addUser } from '../actions/userActions';

class Account extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: this.props.user.username,
		}
	}

	handleNameChange = (e) => {
		console.log(this.state.username)
		this.setState({ username: e.target.value })
	}

	showUsernameInput = () => {
		if (this.props.user.username) {
			return (
				<Col sm="10">
					<Form.Control plaintext readOnly defaultValue={this.props.user.username} />
				</Col>
			)
		}
		else {
			return (
				<Col sm="10">
					<Form.Control as="input" type="username" placeholder="No username yet..." onChange={this.handleNameChange} />
					<p className="text-warning" style={{ margin: "10px" }}>You can only cheange username once!!!</p>
				</Col>
			)
		}
	}

	showSaveButton = () => {
		if (!this.props.user.username) {
			return (
				<Button onClick={this.saveUsername}>Save</Button>
			)
		}
	}

	saveUsername = () => {
		this.props.addUser({
			addr: this.props.user.myAccount,
			name: this.state.username,
		})
	}

	render() {
		return (
			<Modal
				{...this.props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				variant="dark"
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Account
          </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group as={Row} controlId="formPlaintextEmail">
							<Form.Label column sm="2">
								Address
    					</Form.Label>
							<Col sm="10">
								<Form.Control plaintext readOnly defaultValue={this.props.user.myAccount} />
							</Col>
						</Form.Group>

						<Form.Group as={Row} controlId="formPlaintextPassword">
							<Form.Label column sm="2">
								Username
    					</Form.Label>
							{this.showUsernameInput()}
						</Form.Group>
					</Form>

				</Modal.Body>
				<Modal.Footer>
					{this.showSaveButton()}
				</Modal.Footer>
			</Modal>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user,
});

export default connect(mapStateToProps, { addUser })(Account);
