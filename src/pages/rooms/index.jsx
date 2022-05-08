import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "./rooms.module.css";
import RoomSelectorBox from "../../frontend/components/RoomSelectorBox";

const fetchInfo = async (param) => {
  const isFromServer = param && param.isFromServer;
  const cookie = param && param.cookie;

  const response = await axios.get(
    "/api/v1/auth/info",
    param && {
      baseURL: isFromServer ? "http://localhost:3000/" : "",
      headers: {
        Cookie: cookie,
      },
    }
  );
  return response;
};

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
  const [rooms, setRooms] = React.useState([]);
  const [roomName, setRoomName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetchRooms().then((res) => {
      setRooms(res.data);
    });
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
                isRemoveAvailable={room.creator_user_id === props.user.id}
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

const redirectToHome = {
  redirect: {
    destination: "/",
    permanent: false,
  },
};

export async function getServerSideProps(context) {
  // cookie 검증
  const cookie = context?.req?.headers?.cookie;

  if (!cookie) {
    return redirectToHome;
  }

  try {
    const response = await fetchInfo({
      isFromServer: true,
      cookie: context.req.headers.cookie,
    });

    return {
      props: {
        user: response.data.data[0],
      },
    };
  } catch (error) {
    return redirectToHome;
  }
}
