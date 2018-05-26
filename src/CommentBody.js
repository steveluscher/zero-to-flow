import * as React from 'react';

import getPixelRatio from './getPixelRatio';

const AVATAR_SIZE = 32;

class CommentBody extends React.Component {
  render() {
    return (
      <React.Fragment>
        <img
          alt={`A photo of ${this.props.author}`}
          src={`https://api.adorable.io/avatars/${AVATAR_SIZE *
            getPixelRatio()}/${this.props.author.id}@adorable.png`}
          title={this.props.author.name}
        />
        <strong>{this.props.author.name}</strong> {this.props.text}
      </React.Fragment>
    );
  }
}

export default CommentBody;
