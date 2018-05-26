import CommentThread from './CommentThread';
import CommentForm from './CommentForm';
import * as React from 'react';

import fetchCommentThreads from './fetchCommentThreads';

class App extends React.Component {
  state = {
    comments: [],
  };
  componentDidMount() {
    const performFetch = async () => {
      const comments = fetchCommentThreads();
      this.setState({comments});
      setTimeout(300, performFetch);
    };
    performFetch();
  }
  render() {
    return (
      <React.Fragment>
        <h1>Join the conversation</h1>
        <ul>
          {this.state.comments.map(comment => (
            <CommentThread comment={comment} depth="0" />
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
