import React from "react";
import axios from "axios";
import { useRouter } from "next/router";

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

export default function Rooms(props) {
  const router = useRouter();
  const [user, setUser] = React.useState({});
  const [rooms, setRooms] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    fetchInfo().then((res) => {
      setUser(res.data.data[0]);
    });
  }, []);

  return (
    <div>
      <h2>Chat Rooms</h2>
      <h3>Your nickname is: {user.nickname}</h3>

      <div>
        <p>Room1</p>
        <p> id: 1</p>
        <button>Join Room</button>
      </div>
      <div>
        <p>Room2</p>
        <p> id: 2</p>
        <button>Join Room</button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const response = await fetchInfo({
    isFromServer: true,
    cookie: context.req.headers.cookie,
  });

  if (response.status > 400) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: response.data.data[0],
    },
  };
}
