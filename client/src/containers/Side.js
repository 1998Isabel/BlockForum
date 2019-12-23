import React, { Component } from "react";
import "./../css/bootstrap.min.css";
import { connect } from "react-redux";
import { getCategories, changeCategory } from "../actions/categoryActions";
import { getPosts } from "../actions/postActions";

class Side extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    const { post, category, changeCategory } = this.props;
    const sidelist = category.categories.map((c, index) => {
      const postnum = post.posts.filter(p => p.category === c).length;
      return (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
          onClick={()=>changeCategory(c)}
          style={{cursor: "pointer"}}
        >
          {c}
          <span className="badge badge-primary badge-pill">{postnum}</span>
        </li>
      );
    });
    return (
      <div>
        <h5>Catagories</h5>
        <ul className="list-group">{sidelist}</ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category,
  post: state.post
});

export default connect(mapStateToProps, { getCategories, getPosts, changeCategory })(Side);
