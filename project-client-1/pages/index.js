import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  let windowObjectReference = null;
  let previousUrl = null;

  const openSignInWindow = (url, name) => {    
    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage);

    // window features
    const strWindowFeatures =
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }
    window.addEventListener('message', event => receiveMessage(event), false);
    previousUrl = url;
  };

  const receiveMessage = event => {
    console.log(event)
    alert(event.data)
    if (event.origin !== 'http://localhost:3000') {
      return;
    }
    const { data } = event;
  };

  return (
    <div className={styles.container}>
      <button onClick={() => { openSignInWindow('http://localhost:3000', 'login with auth') }}>
        Open Login with ...
      </button>
      <iframe src="http://localhost:3000" title="W3Schools Free Online Web Tutorials"></iframe>
    </div>
  )
}
