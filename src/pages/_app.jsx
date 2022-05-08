export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <h1>Chat Program</h1>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
