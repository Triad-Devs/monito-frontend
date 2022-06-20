import { createChatBotMessage } from "react-chatbot-kit";
import MonitoAvatar from "./MonitoAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Login from "../components/Login";
import Signup from "../components/Signup";
import Options from "../components/Options";
import AuthOptions from "../components/AuthOptions";

const getInitialMessages = () => {
  let initialMessages = [
    createChatBotMessage(
      `Hi! I'm Monito!\n I help you in monitoring your APIs!`
    ),
  ];

  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    initialMessages.push(
      createChatBotMessage(
        `Welcome ${userData.user.first_name}! What would you like to work on?`,
        {
          withAvatar: true,
          delay: 1000,
          widget: "Options",
        }
      )
    );
  } else {
    initialMessages.push(
      createChatBotMessage(`Let's start by creating an account!`, {
        withAvatar: true,
        delay: 1000,
        widget: "AuthOptions",
      })
    );
  }

  return initialMessages;
};

const config = {
  initialMessages: getInitialMessages(),
  botName: "Monito",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1F1B24",
    },
    chatButton: {
      backgroundColor: "#1F1B24",
    },
  },
  widgets: [
    {
      widgetName: "AuthOptions",
      widgetFunc: (props) => <AuthOptions {...props} />,
    },
    {
      widgetName: "Login",
      widgetFunc: (props) => <Login {...props} />,
    },
    {
      widgetName: "Signup",
      widgetFunc: (props) => <Signup {...props} />,
    },
    {
      widgetName: "Options",
      widgetFunc: (props) => <Options {...props} />,
    },
  ],
  customComponents: {
    botAvatar: (props) => <MonitoAvatar {...props} />,
    userAvatar: (props) => (
      <AccountCircleIcon
        style={{ width: 35, height: 35, marginLeft: 13, marginTop: 3 }}
        {...props}
      />
    ),
  },
};

export default config;
