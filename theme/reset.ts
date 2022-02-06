import { css } from '@emotion/react'

export const reset = css`
  html,
  body {
    height: 100%;
    padding: 0;
    margin: 0;
    letter-spacing: -0.4px;
    font-family: 'Nanum Gothic', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  select {
    font-family: inherit;
    appearance: none;
    outline: none;
  }

  a,
  button,
  svg {
    cursor: pointer;
  }

  svg {
    width: 24px;
  }

  address {
    font-style: normal;
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  * {
    box-sizing: border-box;
  }

  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`
