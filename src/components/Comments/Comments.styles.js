import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CardItem } from '../../styles/cards';
import { Form } from '../../styles/forms';

export const CommentList = styled.div`
  flex-grow: 1;
  scroll-behavior: smooth;
  overflow-y: auto;
`;

export const CommentForm = styled(Form)`
  flex-shrink: 0;
  gap: 0.5em;

  textarea {
    grid-column: span 2;
    height: auto;
    max-height: 400px;
  }
`;

export const Comment = styled(CardItem)`
  display: flex;
`;

export const CommentContent = styled.div`
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

export const CommentText = styled.div`
  white-space: pre-wrap;
  word-break: break-word;
  hyphens: auto;
  font-size: 0.95rem;
`;

export const CommentCreatedAt = styled.div`
  font-size: 0.8rem;
  font-style: italic;
  text-align: right;
`;

export const Username = styled.div`
  font-weight: 700;
`;

export const SignInToComment = styled(Link)`
  text-align: center;
  transition: color 300ms;

  :hover {
    color: var(--colors-blue);
  }
`;
