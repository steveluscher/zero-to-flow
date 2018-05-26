import fetchJSON from './fetchJSON';

async function fetchCommentThreads() {
  return await fetchJSON('/comments');
}

export default fetchCommentThreads;
