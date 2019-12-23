import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPosts, addPost } from '../actions/postActions';
import PostCard from '../components/PostCard';

class HomePage extends Component {
	componentDidMount() {
		this.props.getPosts();
		setInterval(this.props.getPosts, 5000);
	}

	render() {
		const { post, category } = this.props
		let posts = post.posts;
		let header =(<h5>Posts</h5>)
		if (category.show) {
			posts = posts.filter(p => {
				return (p.category === category.show)
			})
			header = (<h5>Posts <em className="text-secondary">{category.show}</em></h5>)
		}
		if (post.selected) {
			posts = post.posts.filter(p => p.id === post.selected)
			header = (<h5>Post <em className="text-secondary">Selected</em></h5>)
		}

		const postlist = posts.map((p, index) => {
			return (
				<PostCard key={index} post={p} />
			)
		})

		return (
			<div>
			<h5>{header}</h5>
				{postlist}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	post: state.post,
	category: state.category
});

export default connect(mapStateToProps, { getPosts, addPost })(HomePage);
