import { getUserData } from "../utils";
import Button from "@mui/material/Button";

const BotHeader = () => {
  const userData = getUserData();

  const logout = () => {
    localStorage.removeItem("userData");
    window.location.reload();
  };

  return (
    <div className="react-chatbot-kit-chat-header">
      <div>Conversation with Monito</div>
      {userData && (
        <Button
          sx={{ ml: 1, mt: { xs: 1, sm: 0 } }}
          variant="outlined"
          onClick={logout}
          size="small"
        >
          Logout
        </Button>
      )}
    </div>
  );
};

export default BotHeader;
