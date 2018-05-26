// @flow strict-local

import type {Author} from './server';

import * as React from 'react';

import getPixelRatio from './getPixelRatio';

type Props = $ReadOnly<{|
  author: Author,
  text: string,
|}>;

const AVATAR_SIZE = 32;

class CommentBody extends React.Component<Props> {
  render(): React.Element<typeof React.Fragment> {
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
