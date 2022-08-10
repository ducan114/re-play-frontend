import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

* {
  -webkit-tap-highlight-color: transparent;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: var(--colors-primary-dark-2);
  }

  ::-webkit-scrollbar-thumb {
    cursor: pointer;
    border-radius: 5px;
    background-color: var(--colors-secondary);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: var(--colors-secondary-dark);
  }
}

:root {
  --header-height: 60px;
  --colors-primary: #fff;
  --colors-primary-dark-1: #f3f7f7;
  --colors-primary-dark-2: #e7eeef;
  --colors-primary-dark-3: #aeb3b4;
  --colors-secondary: #39424e;
  --colors-secondary-dark: #000;
  --colors-secondary-translucent: #0004;
  --colors-secondary-translucent-dark: #000000b3;
  --colors-success: #1ba94c;
  --colors-success-translucent: #26ff7145;
  --colors-danger: #ff3939;
  --colors-danger-translucent: #ff39394d;
  --colors-warning: #ffce3c;
  --colors-warning-translucent: #ffce3c4f;
  --colors-blue: #1f66ff;
  --colors-green: #1fff8d;
  --shadow-border: 1px 1px 4px 0 #e7eeef;
  --shadow-border-medium: 0 4px 12px 0 #00000026;
  --shadow-border-big: 0 6px 16px 0 #00000033;
  --shadow-border-super-big: 0 0 20px 20px var(--colors-secondary-translucent);
}

body {
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
}

body.modal-open {
  overflow-y: hidden;
}


#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--colors-primary-dark-1)
}

#root main {
  margin-top: var(--header-height);
  flex-grow: 1;
}

a {
  text-decoration: none;
  font-weight: inherit;
  color: inherit;
}

.force-scroll-behavior-normal {
  scroll-behavior: auto !important;
}
`;
