const ModuleStyle = `
  color: #c1e9d5;
  display: flex;
  justify-content: center;
  margin: 3vh;

  form {
    background-color: #325c4b;
    border-radius: 15px;
    border: thick solid #b5614c;
    box-shadow: -3px 3px #cf7963;
    display: flex;
    flex-direction: column;
    padding: 3vh 0;
    text-align: center;
    width: 60vw;
    z-index: 10;
  }

  input {
    border: thin solid #517868;
    box-shadow: 0 0 1px #ffffff;
    background-color: #95c4b4;
    color:rgb(73, 28, 7);
    font-family: inherit;
    font-size: 1.25em;
    padding: 7px;
    margin: 5px;
    text-align: center;
  }

  button {
    background-color: #cef2e9;
    border: none;
    border-radius: 5px;
    color: #2e1a16;
    font-size: 1em;
    font-weight: 600;
    margin: 3px;
    margin-left: 50%;
    padding: 5px;

    :hover {
      color: gold;
      background-color: #5d9184;
      box-shadow: -1px 1px grey;
    }
    :active {
      background-color: #4c7369;
      box-shadow: none;
    }
  }
`;

module.exports = { ModuleStyle };
