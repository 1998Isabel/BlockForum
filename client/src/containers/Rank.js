import React, { Component } from 'react';
import moment from "moment";
import { ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { selectPost } from '../actions/postActions';

class Rank extends Component {
	render() {
		const { post, selectPost } = this.props;
		let rankposts = post.posts.sort((a, b) => {
			return (b.likes - a.likes)
		})
		const ranklist = rankposts.slice(0, 3).map((p, idx) => {
			const color = (idx === 0) ? " text-white bg-secondary" : null
			const now = moment();
			const timediff = now.diff(p.Date, "days")
			return (
				<a key={idx} onClick={()=>selectPost(p.id)} className={"list-group-item list-group-item-action flex-column align-items-start" + color}>
					<div className="d-flex w-100 justify-content-between">
						<h5 className="mb-1">{p.title}</h5>
						<small className="text-muted">{timediff} days ago</small>
					</div>
					<p class="mb-1">{p.content}</p>
					<small class="text-muted">
						{p.category}
						<span
							className="text-primary"
							style={{ marginLeft: "10px", float: "right" }}
						>
							{p.likes} Likes
						</span>
					</small>
				</a>
			)
		})
		return (
			<ListGroup style={{ marginTop: "20px" }}>
				{ranklist}
			</ListGroup>
		);
	}
}
const mapStateToProps = (state) => ({
	post: state.post,
});

export default connect(mapStateToProps, { selectPost })(Rank);
