import CommentBody from './CommentBody';
import CommentForm from './CommentForm';
import * as React from 'react';

class CommentThread extends React.Component {
  render() {
    return (
      <li>
        <CommentBody
          author={this.props.comment.author}
          text={this.props.comment.text}
        />
        <ul>
          {this.props.comment.replies.map(reply => (
            <CommentThread reply={reply} depth={this.props.depth + 1} />
          ))}
          {this.props.depth === 0 ? (
            <li>
              <CommentForm
                parentCommentId={this.props.comment.id}
                placeholder={'Write a reply\u2026'}
              />
            </li>
          ) : null}
        </ul>
      </li>
    );
  }
}

export default CommentThread;
