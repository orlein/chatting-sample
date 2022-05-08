import fetchInfo from "../api/fetchInfo";

const redirectToHome = {
  type: "REDIRECT",
  redirect: {
    destination: "/",
    permanent: false,
  },
};

export default async function authenticationGuard(context) {
  const cookie = context?.req?.headers?.cookie;

  if (!cookie) {
    console.log("cookie");
    return redirectToHome;
  }

  try {
    const response = await fetchInfo({
      isFromServer: true,
      cookie: context.req.headers.cookie,
    });

    return {
      type: "OK",
      response,
    };
  } catch (error) {
    console.log("error", error);
    return redirectToHome;
  }
}
