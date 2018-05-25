// @flow strict-local

import type {Comment} from './server';

import fetchJSON from './fetchJSON';

async function fetchCommentThreads(): Promise<$ReadOnlyArray<Comment>> {
  return await fetchJSON('/comments');
}

export default fetchCommentThreads;
