// @flow strict-local

import fetchJSON from './fetchJSON';

async function submitComment(
  text: string,
  parentCommentID: ?number,
): Promise<void> {
  await fetchJSON('/comments/add', {parentCommentID, text});
}

export default submitComment;
