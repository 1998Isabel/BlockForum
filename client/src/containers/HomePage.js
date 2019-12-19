import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts, addPost } from "../actions/postActions";
import PostCard from "../components/PostCard";

class HomePage extends Component {
  componentDidMount() {
    const { ipfs_node } = this.props.user;
    if (ipfs_node) {
		console.log("GET POST")
		this.props.getPosts(ipfs_node);
		setInterval(this.props.getPosts(ipfs_node), 5000);
	}
  }

  componentDidUpdate(prevProps) {
    const { ipfs_node } = this.props.user;
    if (ipfs_node != prevProps.user.ipfs_node) {
		// console.log("GET POST")
		this.props.getPosts(ipfs_node);
		setInterval(this.props.getPosts(ipfs_node), 5000);
	}
  }

  render() {
    const { posts } = this.props.post;
    console.log(posts);
    const postlist = this.props.post.posts.map((p, index) => {
      return <PostCard key={index} post={p} />;
    });

    return (
      <div>
        <h5>Posts</h5>
        {this.props.user.loading?<h5>Loading</h5>:postlist}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post,
  user: state.user
});

export default connect(mapStateToProps, { getPosts, addPost })(HomePage);
