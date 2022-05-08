import React from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import authenticationGuard from "../../frontend/guards/authenticationGuard";
import axios from "axios";
import styles from "./room.module.css";

const fetchMessages = async (roomId) => {
  const response = await axios.get(`/api/v1/room/${roomId}/message`);
  return response;
};

const fetchRoomUsers = async (roomId) => {
  const response = await axios.get(`/api/v1/room/${roomId}/user`);
  return response;
};

export default function ChatRoom(props) {
  const router = useRouter();
  const socket = React.useMemo(() => io(), []);
  const [messages, setMessages] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    socket.emit(
      "/socket/v1/room/join",
      JSON.stringify({ roomId: props.roomId, userId: props.userId })
    );

    socket.on("/socket/v1/room/join", (stringifiedData) => {
      fetchRoomUsers(props.roomId).then((res) => {
        setUsers(res.data);
      });
    });

    socket.on("/socket/v1/room/quit", (stringifiedData) => {
      fetchRoomUsers(props.roomId).then((res) => {
        setUsers(res.data);
      });
    });

    socket.on("/socket/v1/room/chat", (stringifiedData) => {
      const data = JSON.parse(stringifiedData);
      console.log(data);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.emit(
        "/socket/v1/room/quit",
        JSON.stringify({ roomId: props.roomId, userId: props.userId })
      );
      socket.disconnect();
    };
  }, []);

  React.useEffect(() => {
    fetchMessages(props.roomId).then((res) => {
      setMessages(res.data);
    });

    fetchRoomUsers(props.roomId).then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleMessage = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message === "") {
      setErrorMessage("Message cannot be empty");
      return;
    }

    socket.emit(
      "/socket/v1/room/chat",
      JSON.stringify({
        roomId: props.roomId,
        message,
        userId: props.userId,
      })
    );

    setMessage("");
  };

  const handlePressEnterOnMessage = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleClickGoBack = () => {
    router.back();
  };

  return (
    <div>
      <button onClick={handleClickGoBack}>Go Back</button>
      <div className={styles.container}>
        <div className={styles.left}>
          <input
            name="message"
            value={message}
            onChange={handleMessage}
            onKeyDown={handlePressEnterOnMessage}
          />
          <button onClick={handleSendMessage}>Send</button>
          {messages.map((message) => (
            <div key={`message_${message.id}`} className={styles.chatMessage}>
              <p className={styles.nickname}>{message.nickname}</p>
              <p className={styles.message}>{message.message}</p>
            </div>
          ))}
        </div>
        <div className={styles.right}>
          <h4>Joined Members</h4>
          {users.map((user) => (
            <div className={styles.user} key={`user_${user.id}`}>
              <p>* {user.nickname}</p>
            </div>
          ))}
        </div>
      </div>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const guardResult = await authenticationGuard(ctx);
  if (guardResult.type === "REDIRECT") {
    return { redirect: guardResult.redirect };
  }

  return {
    props: {
      roomId: ctx.query.id,
      userId: guardResult.response.data.data[0].id,
    },
  };
};
