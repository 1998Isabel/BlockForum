import React, { Component } from 'react';
import './../css/bootstrap.min.css';
import uuid from "uuid";
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';
import { getCategories } from '../actions/categoryActions';
import { Button, Modal, Form } from 'react-bootstrap';

const defaultState = {
	show: false,
	title: "",
	content: "",
	category: "News",
	file: null,
	imgUrl: null,
};

class CreatePost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			...defaultState,
			category: this.props.category.categories[0]
		}
	}

	componentDidMount = async () => {
		this.props.getCategories();
	}

	handleShow = () => this.setState({ ...defaultState, show: true });
	handleClose = () => this.setState({ show: false });
	changeTitle = (event) => this.setState({ title: event.target.value });
	changeContent = (event) => this.setState({ content: event.target.value });
	changeCategory = (event) => this.setState({ category: event.target.value });
	changeFile = (event) => {
		this.setState({
      file: event.target.files[0]
    })
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imgUrl: reader.result
      });
    }
    reader.readAsDataURL(event.target.files[0])
	}
	handleSubmit = async () => {
		const { web3, myAccount, serverAccount } = this.props.user;
		var txnObject = {
			"from": myAccount,
			"to": serverAccount,
			"value": 1000000000000000000,
			"gas": 21000,          // (optional)
			"gasPrice": 4500000,   // (optional)
			// "data": 'For testing', // (optional)
			"nonce": 10            // (optional) 
		};
		await web3.eth.sendTransaction(txnObject);
		const balance1 = await web3.eth.getBalance(serverAccount);
		console.log(balance1);
		const balance2 = await web3.eth.getBalance(serverAccount);
		console.log(balance2);
		this.props.addPost({
			id: uuid.v1(),
			category: this.state.category,
			title: this.state.title,
			content: this.state.content,
			date: Date.now(),
			user: myAccount,
			img: this.state.imgUrl,
		});
		this.handleClose()
	}

	render() {
		const { show } = this.state;
		const categoryOption = this.props.category.categories.map((c, idx) => (<option key={idx}>{c}</option>))

		return (
			<div>
				<h5>Create Post</h5>
				<form>
					<div className="form-group">
						<div className="input-group mb-3" onClick={this.handleShow}>
							<input type="text" className="form-control" placeholder="Say something..." aria-label="Recipient's username" aria-describedby="button-addon2" />
							<div className="input-group-append">
								<button className="btn btn-outline-secondary" type="button" id="button-addon2">Post</button>
							</div>
						</div>
						<Modal show={show} onHide={this.handleClose}>
							<Modal.Header closeButton>
								<Modal.Title>Create Post</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group controlId="ControlInput1">
										<Form.Label>Title</Form.Label>
										<Form.Control type="text" onChange={this.changeTitle} />
									</Form.Group>
									<Form.Group controlId="ControlSelect1">
										<Form.Label>Select category</Form.Label>
										<Form.Control as="select" onChange={this.changeCategory}>
											{categoryOption}
										</Form.Control>
									</Form.Group>
									<Form.Group controlId="ControlTextarea1">
										<Form.Label>Content</Form.Label>
										<Form.Control as="textarea" rows="3" onChange={this.changeContent} />
									</Form.Group>
									<Form.Group controlId="ControlInput2">
										<Form.Label>Image</Form.Label>
										<Form.Control type="file" accept="image/*" onChange={this.changeFile} />
										<img src={this.state.imgUrl} alt="file" style={{marginTop: "10px",width: "100%", textAlign:"center"}}></img>
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="secondary" onClick={this.handleClose}>
									Cancel
          			</Button>
								<Button variant="primary" onClick={this.handleSubmit}>
									Submit
          			</Button>
							</Modal.Footer>
						</Modal>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	category: state.category,
	user: state.user,
});

export default connect(mapStateToProps, { addPost, getCategories })(CreatePost);
