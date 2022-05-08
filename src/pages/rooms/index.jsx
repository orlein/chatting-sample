import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { io } from "socket.io-client";
import RoomSelectorBox from "../../frontend/components/RoomSelectorBox";
import authenticationGuard from "../../frontend/guards/authenticationGuard";
import styles from "./rooms.module.css";

const fetchLogout = async () => {
  const response = await axios.post("/api/v1/auth/logout");
  return response;
};

const fetchRooms = async () => {
  const response = await axios.get("/api/v1/room");
  return response;
};

const fetchCreateRoom = async (roomName) => {
  const response = await axios.post("/api/v1/room", { roomName });
  return response;
};

const fetchRemoveRoom = async (roomId) => {
  const response = await axios.delete(`/api/v1/room/${roomId}`);
  return response;
};

const fetchJoinRoom = async (roomId) => {
  const response = await axios.post(`/api/v1/room/${roomId}/join`);
  return response;
};

export default function Rooms(props) {
  const router = useRouter();
  const socket = React.useMemo(() => io(), []);
  const [rooms, setRooms] = React.useState([]);
  const [roomName, setRoomName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetchRooms().then((res) => {
      setRooms(res.data);
    });
  }, []);

  React.useEffect(() => {
    socket.on("/socket/v1/room", (stringified) => {
      const data = JSON.parse(stringified);

      if (data.type === "ROOM_CREATED" || data.type === "ROOM_REMOVED") {
        fetchRooms().then((res) => {
          setRooms(res.data);
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleLogout = async () => {
    await fetchLogout();
    router.push("/");
  };

  const handleRoomName = (e) => {
    setRoomName(e.target.value);
  };

  const handleCreateRoom = async () => {
    if (roomName === "") {
      setErrorMessage("Please enter a room name.");
      return;
    }

    try {
      const res = await fetchCreateRoom(roomName);
      socket.emit("/socket/v1/room", JSON.stringify({ type: "ROOM_CREATED" }));
      setRooms((prev) => [...prev, res.data]);
      setRoomName("");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleClickRemoveRoom = (roomId) => {
    return async (e) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        await fetchRemoveRoom(roomId);
        socket.emit(
          "/socket/v1/room",
          JSON.stringify({ type: "ROOM_REMOVED" })
        );
        setRooms((prev) => prev.filter((room) => room.id !== roomId));
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
  };

  const handleClickJoinRoom = (roomId) => {
    return async (e) => {
      e.stopPropagation();
      e.preventDefault();

      try {
        await fetchJoinRoom(roomId);
        router.push(`/rooms/${roomId}`);
      } catch (error) {
        setErrorMessage(error.response.data.message);
      }
    };
  };

  return (
    <>
      <h2>Chat Rooms</h2>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.roomListBox}>
            <input
              name="roomName"
              value={roomName}
              onChange={handleRoomName}
              placeholder="room name"
            />
            <button onClick={handleCreateRoom}>Create Room</button>

            {rooms.length === 0 && (
              <>
                <p>No Rooms</p>
              </>
            )}

            {rooms.map((room) => (
              <RoomSelectorBox
                key={`room_${room.id}`}
                {...room}
                isRemoveAvailable={room.creatorUserId === props.user.id}
                onClickJoin={handleClickJoinRoom(room.id)}
                onClickRemove={handleClickRemoveRoom(room.id)}
              />
            ))}
          </div>
        </div>

        <div className={styles.right}>
          <button onClick={handleLogout}>Logout</button>
          <div className={styles.userBox}>
            <h3>Your nickname is: {props.user.nickname}</h3>
            <p>User ID: {props.user.id}</p>
          </div>
        </div>
      </div>
      <div className={styles.errorMessageBox}>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const guardResult = await authenticationGuard(context);
  if (guardResult.type === "REDIRECT") {
    return { redirect: guardResult.redirect };
  }

  return {
    props: {
      user: guardResult.response.data.data[0],
    },
  };
}
