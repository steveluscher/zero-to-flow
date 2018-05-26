import * as React from 'react';

import submitComment from './submitComment';

class CommentForm extends React.Component {
  state = {
    commentText: '',
  };
  handleChange = e => {
    this.setState({
      commentText: e.target.value,
    });
  };
  handleSubmit = async e => {
    e.stop();
    await submitComment(this.state.commentText, this.props.parentCommentID);
    this.setState({
      commentText: null,
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder={this.props.placeholder || 'Write a comment\u2026'}
          onChange={this.handleChange()}
          type="text"
          value={this.state.commentText}
        />
      </form>
    );
  }
}

export default CommentForm;
