import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap';
import moment from "moment";
import { connect } from 'react-redux';
import { deletePost, likePost } from '../actions/postActions';

class PostCard extends Component {
  handleDelete = () => {
    console.log("D", this.props.post.id)
    this.props.deletePost(this.props.post.id);
  }

  showDelete = () => {
    const now = moment(Date.now())
    const duration = moment.duration(now.diff(this.props.post.date)).asSeconds();
    // console.log("DURATION", this.props.user.duration);
    if (duration < this.props.user.duration && this.props.user.myAccount === this.props.post.user)
      return (
        <Button variant="secondary" style={{ float: "right" }} onClick={this.handleDelete}>Delete</Button>
      )
    else
      return
  }

  likePost = () => {
    console.log("LIKE")
    this.props.likePost(this.props.post.id)
  }

  loadImgUrl = () => {
    if (this.props.post.file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        return reader.result
      }
      reader.readAsDataURL(this.props.post.file)
    }
    else return null

  }

  render() {
    let { post } = this.props;
    let time = moment(post.date).format("MMMM Do YYYY, h:mm:ss a");

    return (
      <Card>
        {/* <Card.Header>Featured</Card.Header> */}
        <Card.Body>
          <Card.Title>
            {post.title}
            {this.showDelete()}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{post.category}</Card.Subtitle>
          <Card.Text>
            {post.content}
          </Card.Text>
        </Card.Body>
        <Card.Img variant="bottom" src={this.loadImgUrl()} />
        <Card.Footer className="text-muted" style={{ height: "45px" }}>
          {time}
          <p className="text-primary" style={{ float: "right" }}>
            <span onClick={this.likePost} style={{ cursor: "pointer" }}>Like</span>
            <span className="badge badge-pill badge-primary" style={{ marginLeft: "10px" }}>{post.likes}</span>
          </p>
        </Card.Footer>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { deletePost, likePost })(PostCard);
