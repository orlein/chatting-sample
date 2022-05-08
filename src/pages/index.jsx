import React from "react";
import InputBox from "../frontend/components/InputBox";
import styles from "./index.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const fetchLogin = ({ nickname, password }) =>
  axios.post("/api/v1/auth/login", {
    nickname,
    password,
  });

const initialLoginForm = {
  nickname: "",
  password: "",
};

const validateLoginForm = (loginForm) => {
  if (loginForm.nickname === "") {
    return { result: false, message: "Please enter a nickname" };
  }

  if (loginForm.password === "") {
    return { result: false, message: "Please enter a password" };
  }

  return { result: true };
};

export default function Index() {
  const router = useRouter();
  const [loginForm, setLoginForm] = React.useState(initialLoginForm);
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleChangeLoginForm = (e) => {
    setErrorMessage("");
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
    setErrorMessage("");
    const validation = validateLoginForm(loginForm);
    if (!validation.result) {
      setErrorMessage(validation.message);
      return;
    }
    try {
      await fetchLogin(loginForm);
      setLoginForm(initialLoginForm);
      router.push("/rooms");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  const handleJoin = () => {
    router.push("/join");
  };

  return (
    <div className={styles.loginBox}>
      <h2>Login</h2>
      <InputBox
        name="nickname"
        value={loginForm.nickname}
        onChange={handleChangeLoginForm}
        placeholder="nickname"
      />
      <InputBox
        name="password"
        value={loginForm.password}
        onChange={handleChangeLoginForm}
        placeholder="password"
        type="password"
      />
      <p>{errorMessage}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
