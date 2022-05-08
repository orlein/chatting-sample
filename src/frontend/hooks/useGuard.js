import React from "react";
import { useRouter } from "next/router";
import fetchInfo from "../api/fetchInfo";

export default function useGuard() {
  const router = useRouter();
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    fetchInfo()
      .then((res) => {
        setUser(res.data.data[0]);
      })
      .catch((res) => {
        router.replace("/");
      });
  }, []);

  return {
    user,
  };
}
