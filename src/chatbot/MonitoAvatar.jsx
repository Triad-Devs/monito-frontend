import avatar from "../assets/chatbot.png";

const MonitoAvatar = () => {
  return (
    <div>
      <img
        style={{ width: 35, height: 35, marginRight: 13, marginTop: 3 }}
        src={avatar}
        alt="avatar"
      />
    </div>
  );
};

export default MonitoAvatar;
