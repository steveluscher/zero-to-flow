import CatNames from 'cat-names';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

const app = express();

/**
 * Assign a user account; save it in a session cookie.
 */
const authors = {};
let nextAuthorID = 0;
app.use(cookieParser(`sekrit-${Date.now()}`));
app.use((req, res, next) => {
  const authorID = req.signedCookies['authorID'];
  if (isNaN(authorID)) {
    const authorID = nextAuthorID++;
    res.setCookie('authorID', JSON.stringify(authorID), {signed: true});
    authors[authorID] = {
      id: authorID,
      name: CatNames.random(),
    };
  }
  req.author = authors[authorID];
  next();
});

/**
 * Vend the comment thread.
 */
const comments = [];
app.get('/comments', (req, res) => {
  res.json(comments);
});

/**
 * Add a comment to the thread.
 */
const commentsIndex = {};
let nextCommentID = 0;
app.use(bodyParser.json());
app.post('/comments/add', (req, res) => {
  const parentCommentID = req.body.parentCommentID;
  const text = req.body.text;
  let threadToAppendCommentTo;
  if (parentCommentID == null) {
    threadToAppendCommentTo = comments;
  } else {
    const parentComment = commentsIndex[parentCommentID];
    threadToAppendCommentTo = parentComment.replies;
  }
  const newComment = {
    author: req.author,
    id: nextCommentID++,
    text,
  };
  threadToAppendCommentTo.push(newComment);
  commentsIndex[newComment.id] = newComment;
  res.json(comments);
});

app.listen(5000);
