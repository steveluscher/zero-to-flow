// @flow strict-local

import * as React from 'react';

import submitComment from './submitComment';

type Props = $ReadOnly<{|
  parentCommentID: ?number,
  placeholder?: string,
|}>;

type State = {|
  commentText: string,
|};

class CommentForm extends React.Component<Props, State> {
  state = {
    commentText: '',
  };
  handleChange = (e: SyntheticInputEvent<>): void => {
    this.setState({
      commentText: e.target.value,
    });
  };
  handleSubmit = async (e: SyntheticEvent<>): Promise<void> => {
    e.stop();
    await submitComment(this.state.commentText, this.props.parentCommentID);
    this.setState({
      commentText: null,
    });
  };
  render(): React.Element<'form'> {
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
