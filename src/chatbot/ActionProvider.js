class ActionProvider {
  constructor(createChatbotMessage, setStateFunc, createClientMessage) {
    this.createChatbotMessage = createChatbotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  login = () => {
    const loginForm = this.createChatbotMessage(
      "Enter your Username and Password",
      {
        widget: "Login",
      }
    );
    this.addMessageToState(loginForm);
  };

  signup = () => {
    const signupForm = this.createChatbotMessage(
      "Enter your Name, email, Username and Password",
      {
        widget: "Signup",
      }
    );
    this.addMessageToState(signupForm);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
