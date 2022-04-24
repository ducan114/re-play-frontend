import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import useSocket from '../hooks/useSocket';
import { useAPIContext } from '../contexts/APIContext';
import { Card, CardTitle, CardContent, CardItem } from '../styles/cards';
import { Form, FormControl } from '../styles/forms';
import { BlueButton } from '../styles/buttons';
import { ProfileImage } from '../styles/images';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { getFullname } from '../helpers';

export default function Comments({ room }) {
  const socket = useSocket();
  const { user } = useAPIContext();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const commentsRef = useRef();
  const commentInputRef = useRef();

  useEffect(() => {
    if (!socket) return;
    setComments([]);
    socket.emit('join-chat', room, () =>
      socket.emit('load-old-comments', comments[0])
    );
    socket.on('new-comment', newComment => {
      autoScroll(
        () => setComments(prev => [...prev, newComment]),
        user && newComment.author._id === user._id
      );
    });
    socket.on('old-comments', oldComments =>
      autoScroll(() => setComments(prev => [...oldComments, ...prev]))
    );
    socket.on('error', err =>
      toast.error(err.message, {
        id: 'socket error'
      })
    );

    return () => socket.removeAllListeners();
  }, [socket]);
  // Auto sizing comment input.
  useEffect(() => {
    const ele = commentInputRef.current;
    if (!ele) return;
    ele.style.height = 'auto';
    ele.style.height =
      Math.min(Math.max(ele.scrollHeight, ele.clientHeight), 104) + 'px';
  }, [comment]);

  const handleSubmit = e => {
    if (!comment) return;
    e.preventDefault();
    const { _id, profileImage, firstName, middleName, lastName } = user;
    socket.emit('send-comment', {
      content: comment.trim(),
      author: { _id, profileImage, firstName, middleName, lastName }
    });
    setComment('');
  };

  const autoScroll = (callback, condition = undefined) => {
    const commentsEle = commentsRef.current;
    const firstCommentEle = commentsEle.firstElementChild;
    const oldScrollHeight = commentsEle.scrollHeight;
    callback();
    if (
      condition ||
      commentsEle.clientHeight > oldScrollHeight ||
      Math.abs(
        commentsEle.scrollTop + commentsEle.clientHeight - oldScrollHeight
      ) < 1
    )
      commentsEle.scrollTop = commentsEle.scrollHeight;
    if (firstCommentEle && commentsEle.scrollTop === 0) {
      commentsEle.classList.toggle('force-scroll-behavior-normal');
      firstCommentEle.scrollIntoView(true);
      commentsEle.classList.toggle('force-scroll-behavior-normal');
    }
  };

  return (
    <Card as='section'>
      <CardTitle as='h2' fs='1.25rem' m='0 0 .5em'>
        Comments
      </CardTitle>
      <CardContent mh='50vh' flex col rg='.5em'>
        <CommentList
          ref={commentsRef}
          onScroll={e => {
            if (e.target.scrollTop === 0)
              socket.emit('load-old-comments', comments[0]);
          }}
        >
          {comments.map(comment => (
            <Comment key={comment._id} pd='.5em .75em'>
              <ProfileImage
                src={comment.author.profileImage}
                alt='user-profile-image'
              />
              <CommentContent>
                <Username>
                  {user && comment.author._id === user._id
                    ? 'You'
                    : getFullname(comment.author)}
                </Username>
                <CommentText>{comment.content}</CommentText>
                <CommentCreatedAt>
                  {new Date(comment.createdAt).toLocaleString('en-GB')}
                </CommentCreatedAt>
              </CommentContent>
            </Comment>
          ))}
        </CommentList>
        {user ? (
          <CommentForm onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              ref={commentInputRef}
              placeholder='Write a comment...'
            ></textarea>
            <FormControl>
              <BlueButton type='submit' disabled={!comment}>
                Send
              </BlueButton>
            </FormControl>
          </CommentForm>
        ) : (
          <SignInToComment to='/login'>Sign in to comment</SignInToComment>
        )}
      </CardContent>
    </Card>
  );
}

const CommentList = styled.div`
  flex-grow: 1;
  scroll-behavior: smooth;
  overflow-y: auto;
`;

const CommentForm = styled(Form)`
  flex-shrink: 0;
  gap: 0.5em;

  textarea {
    grid-column: span 2;
    height: auto;
    max-height: 400px;
  }
`;

const Comment = styled(CardItem)`
  display: flex;
`;

const CommentContent = styled.div`
  flex: 1 1 0;
  position: relative;
  margin-left: 10px;
  background-color: var(--colors-primary-dark-2);
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: var(--shadow-border);

  ::before {
    content: '';
    position: absolute;
    top: 10px;
    right: 100%;
    border: none;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-right: 7px solid var(--colors-primary-dark-2);
  }
`;

const CommentText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  hyphens: auto;
  font-size: 0.95rem;
`;

const CommentCreatedAt = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
`;

const Username = styled.div`
  font-weight: 700;
`;

const SignInToComment = styled(Link)`
  text-align: center;
  transition: color 300ms;

  :hover {
    color: var(--colors-blue);
  }
`;
