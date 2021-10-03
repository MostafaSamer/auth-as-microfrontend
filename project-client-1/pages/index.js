import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  let windowObjectReference = null;
  let previousUrl = null;

  const openSignInWindow = (url, name) => {
    // const strWindowFeatures =
    //   'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';
    // window.open(url, name, strWindowFeatures);
    // window.addEventListener('message', event => receiveMessage(event), false);


    
    // remove any existing event listeners
    window.removeEventListener('message', receiveMessage);

    // window features
    const strWindowFeatures =
      'toolbar=no, menubar=no, width=600, height=700, top=100, left=100';

    if (windowObjectReference === null || windowObjectReference.closed) {
      /* if the pointer to the window object in memory does not exist
       or if such pointer exists but the window was closed */
      windowObjectReference = window.open(url, name, strWindowFeatures);
    } else if (previousUrl !== url) {
      /* if the resource to load is different,
       then we load it in the already opened secondary window and then
       we bring such window back on top/in front of its parent window. */
      windowObjectReference = window.open(url, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      /* else the window reference must exist and the window
       is not closed; therefore, we can bring it back on top of any other
       window with the focus() method. There would be no need to re-create
       the window or to reload the referenced resource. */
      windowObjectReference.focus();
    }

    // add the listener for receiving a message from the popup
    window.addEventListener('message', event => receiveMessage(event), false);
    // assign the previous URL
    previousUrl = url;
  };

  const receiveMessage = event => {
    alert(event.data)
    // Do we trust the sender of this message? (might be
    // different from what we originally opened, for example).
    if (event.origin !== 'http://localhost:3000') {
      return;
    }
    const { data } = event;
    // if we trust the sender and the source is our popup
    if (data.source === 'lma-login-redirect') {
      // get the URL params and redirect to our server to use Passport to auth/login
      const { payload } = data;
      const redirectUrl = `/auth/google/login${payload}`;
      window.location.pathname = redirectUrl;
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => { openSignInWindow('http://localhost:3000', 'login with auth') }}>
        Open Login with ...
      </button>
    </div>
  )
}
