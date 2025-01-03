import '../styles/globals.css';
import 'prismjs/themes/prism-tomorrow.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <span className="theme-idk" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
