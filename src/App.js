// @flow strict-local

import type {Comment} from './server';

import CommentThread from './CommentThread';
import CommentForm from './CommentForm';
import * as React from 'react';

import fetchCommentThreads from './fetchCommentThreads';

type Props = empty;

type State = {|
  comments: $ReadOnlyArray<Comment>,
|};

class App extends React.Component<Props, State> {
  state = {
    comments: [],
  };
  componentDidMount(): void {
    const performFetch = async (): Promise<void> => {
      const comments = await fetchCommentThreads();
      this.setState({comments});
      setTimeout(performFetch, 300);
    };
    performFetch();
  }
  render(): React.Element<typeof React.Fragment> {
    return (
      <React.Fragment>
        <h1>Join the conversation</h1>
        <ul>
          {this.state.comments.map(comment => (
            <CommentThread comment={comment} depth={0} />
          ))}
          <li>
            <CommentForm parentCommentID={null} />
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default App;
