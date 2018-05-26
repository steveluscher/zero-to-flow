import fetchJSON from './fetchJSON';

async function submitComment(text, parentCommentID) {
  await fetchJSON('/comments/add', JSON.stringify({parentCommentID, text}));
}

export default submitComment;
