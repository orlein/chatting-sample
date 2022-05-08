import { useRouter } from "next/router";
import React from "react";
import InputBox from "../frontend/components/InputBox";
import styles from "./join.module.css";
import axios from "axios";

const fetchJoin = ({ nickname, password }) =>
  axios.post("/api/v1/auth/join", {
    nickname,
    password,
  });

const initialJoinForm = {
  nickname: "",
  password: "",
};

const validateJoinForm = (joinForm) => {
  if (joinForm.nickname === "") {
    return { result: false, message: "Please enter a nickname" };
  }

  if (joinForm.password === "") {
    return { result: false, message: "Please enter a password" };
  }

  return { result: true };
};

export default function Join() {
  const router = useRouter();
  const [joinForm, setJoinForm] = React.useState(initialJoinForm);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChangeJoinForm = (e) => {
    setErrorMessage("");
    setJoinForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleJoin = async () => {
    setErrorMessage("");
    const validation = validateJoinForm(joinForm);
    if (!validation.result) {
      setErrorMessage(validation.message);
      return;
    }
    try {
      await fetchJoin(joinForm);
      setJoinForm(initialJoinForm);
      router.push("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className={styles.joinBox}>
      <h2>Join</h2>
      <InputBox
        name="nickname"
        value={joinForm.nickname}
        onChange={handleChangeJoinForm}
        placeholder="nickname"
      />
      <InputBox
        name="password"
        value={joinForm.password}
        onChange={handleChangeJoinForm}
        placeholder="password"
        type="password"
      />
      <p>{errorMessage}</p>
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
