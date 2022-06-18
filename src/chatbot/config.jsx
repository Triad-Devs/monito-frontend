import { createChatBotMessage } from "react-chatbot-kit";
import MonitoAvatar from "./MonitoAvatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const config = {
  initialMessages: [createChatBotMessage(`Hello world`)],
  botName: "Monito",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#1F1B24",
    },
    userMessageBox: {
      backgroundColor: "#1F1B24",
    },
    chatButton: {
      backgroundColor: "#1F1B24",
    },
  },
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
