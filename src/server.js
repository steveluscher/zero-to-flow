// @flow strict-local

import type {NextFunction, $Request, $Response} from 'express';

import CatNames from 'cat-names';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import invariant from 'invariant';

type CustomRequest = $Request & {|
  author: Author,
|};

const app = express();

/**
 * Assign a user account; save it in a session cookie.
 */
export type Author = {|
  id: number,
  name: string,
|};
const authors: {[id: number]: Author} = {};
let nextAuthorID = 0;
app.use(cookieParser(`sekrit-${Date.now()}`));
app.use((req: CustomRequest, res: $Response, next: NextFunction) => {
  const authorID = parseInt(req.signedCookies['authorID'], 10);
  if (isNaN(authorID)) {
    const authorID = nextAuthorID++;
    res.cookie('authorID', JSON.stringify(authorID), {signed: true});
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
export type Comment = {|
  author: Author,
  id: number,
  replies: Array<Comment>,
  text: string,
|};
const comments: Array<Comment> = [];
app.get('/comments', (req: CustomRequest, res: $Response) => {
  res.json(comments);
});

/**
 * Add a comment to the thread.
 */
type CommentMutationParams = {|
  parentCommentID: ?number,
  text: string,
|};
const commentsIndex: {[id: number]: ?Comment} = {};
let nextCommentID = 0;
app.use(bodyParser.json());
app.post('/comments/add', (req: CustomRequest, res: $Response) => {
  invariant(
    req.body != null,
    'You must supply mutation params to create a comment',
  );
  invariant(
    req.body.parentCommentID === null ||
      typeof req.body.parentCommentID === 'number',
    'You must supply a null or numeric `parentCommentID` param when creating ' +
      'a comment.',
  );
  invariant(
    typeof req.body.text === 'string',
    'You must supply a string `text` param when creating a comment.',
  );
  const parentCommentID = req.body.parentCommentID;
  const text = req.body.text;
  let threadToAppendCommentTo;
  if (parentCommentID == null) {
    threadToAppendCommentTo = comments;
  } else {
    const parentComment = commentsIndex[parentCommentID];
    invariant(
      parentComment != null,
      'Could not find a comment with id `%s` to reply to.',
      parentCommentID,
    );
    threadToAppendCommentTo = parentComment.replies;
  }
  const newComment = {
    author: req.author,
    id: nextCommentID++,
    replies: [],
    text,
  };
  threadToAppendCommentTo.push(newComment);
  commentsIndex[newComment.id] = newComment;
  res.json(comments);
});

app.listen(5000);
