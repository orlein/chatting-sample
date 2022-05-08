import React from "react";
import { useRouter } from "next/router";

export default function ChatRoom(props) {
  const router = useRouter();
  const [messages, setMessages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleClickGoBack = () => {
    router.back();
  };

  return (
    <div className="chat-room">
      <button onClick={handleClickGoBack}>Go Back</button>
    </div>
  );
}
