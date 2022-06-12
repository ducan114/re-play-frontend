import styled from 'styled-components';

export default styled.div`
  border: 5px solid var(--colors-primary-dark-2);
  border-top: 5px solid var(--colors-secondary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto;
  animation: animatedSpinner 0.8s linear infinite;

  @keyframes animatedSpinner {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
