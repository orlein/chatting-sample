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
      <h3>Your nickname is: {props.user.nickname}</h3>
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

  console.log("??", response.data.data[0]);

  return {
    props: {
      user: response.data.data[0],
    },
  };
}
