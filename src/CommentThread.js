// @flow strict-local

import type {Comment} from './server';

import CommentBody from './CommentBody';
import CommentForm from './CommentForm';
import * as React from 'react';

type Props = $ReadOnly<{|
  comment: Comment,
  depth: number,
|}>;

class CommentThread extends React.Component<Props> {
  render(): React.Element<'li'> {
    return (
      <li>
        <CommentBody
          author={this.props.comment.author}
          text={this.props.comment.text}
        />
        <ul>
          {this.props.comment.replies.map(reply => (
            <CommentThread comment={reply} depth={this.props.depth + 1} />
          ))}
          {this.props.depth === 0 ? (
            <li>
              <CommentForm
                parentCommentID={this.props.comment.id}
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
