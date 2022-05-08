import axios from "axios";

export default async function fetchInfo(param) {
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
}
