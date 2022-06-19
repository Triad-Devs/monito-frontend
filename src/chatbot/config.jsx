import { createChatBotMessage } from "react-chatbot-kit";
import MonitoAvatar from "./MonitoAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Login from "../components/Login";
import Signup from "../components/Signup";
import AuthOptions from "../components/AuthOptions";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Hi! I'm Monito!\n I help you in monitoring your APIs!`
    ),
    createChatBotMessage(`Let's start by creating an account!`, {
      withAvatar: true,
      delay: 1000,
      widget: "AuthOptions",
    }),
  ],
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
