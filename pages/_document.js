/* eslint-disable react/react-in-jsx-scope */
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang="ko-KR">
        <Head />
        <body id="jndApp" className="color-scheme-green mac">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
