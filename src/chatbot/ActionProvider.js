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

  postSignup = (res) => {
    let postSignupMessage;
    if (res.status === 201) {
      postSignupMessage = this.createChatbotMessage(
        `Congratulations ${res.data.first_name}! You have created an account.\n Go ahead and Login.`,
        { widget: "Login" }
      );
    } else {
      postSignupMessage = this.createChatbotMessage(
        `OOPS! I met an error please try again.`,
        { widget: "Signup" }
      );
    }
    this.addMessageToState(postSignupMessage);
  };

  postLogin = (res) => {
    let postLoginMessage;
    if (res.status === 200) {
      postLoginMessage = this.createChatbotMessage(
        `Welcome ${res.data.user.first_name}! What would you like to work on?`,
        { widget: "Options" }
      );
    } else {
      postLoginMessage = this.createChatbotMessage(
        `OOPS! I met an error please try again.`,
        { widget: "Login" }
      );
    }
    this.addMessageToState(postLoginMessage);
  };

  monitoNewUrl = () => {
    const newUrlMessage = this.createChatbotMessage(
      `Enter the URL details to monitor`,
      { widget: "MonitorNewUrlForm" }
    );
    this.addMessageToState(newUrlMessage);
  };

  checkExistingUrls = () => {
    const newUrlMessage = this.createChatbotMessage(
      `Here are the URLs currently being monitored.`,
      { widget: "URLList" }
    );
    this.addMessageToState(newUrlMessage);
  };

  // checkCurrentStatus = (data) => {
  //   const newMessage = this.createChatbotMessage(
  //     `Here are the current status.`,
  //     { widget: "URLList" }
  //   );
  //   this.addMessageToState(newUrlMessage);
  // };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
