/*
 *
 * OfflinePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    background-color: #F6F6F6;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }
`;

const Page = styled.div`
  min-height: 100vh;
  /* medium / wordpress approach https://css-tricks.com/snippets/css/system-font-stack/ */
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif,"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
`;

const TextBody = styled.div`
  margin: auto;
  min-width: 340px;
  width: 80%;
  font-family: "Apple Garamond", "Baskerville", "Times New Roman", "Droid Serif", "Times","Source Serif Pro", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  padding: 20px 0 50px;
  max-width: 680px;
  font-size: 22px;
  animation: 1400ms ease-out 0s 1 fadeIn;
`;

const BlocklyHeader = styled.div`
  animation: 300ms ease-out 0s 1 fadeIn;
  margin: auto;
  min-width: 340px;
  width: 80%;
  font-size: calc(2.5em + 5vmin);
  line-height: 130%;
  color: #F6F6F6;
  font-weight: 700;
  padding: 50px 0 10px;
  h1 {
    display: inline;
    background-color: ${(p) => p.highlighterColor};
    font-size: 100%;
  }
  h2 {
    display: inline;
    background-color: ${(p) => p.highlighterColor};
    font-size: 25px;
    margin: 0;
    padding: 0;
    line-height: 170%;
  }
`;

const Online = () => (
  <Page style={{ backgroundColor: '#A0A9BB' }}>
    <BlocklyHeader highlighterColor="#181E1E">
      <h1>
        Please<br />
        disconnect<br />
        from the<br />
        internet.
      </h1>
      <br />
      <h2>
        Seriously. Trust me.
      </h2>
    </BlocklyHeader>
  </Page>
);

const Offline = () => (
  <Page>
    <BlocklyHeader highlighterColor="#7f8ed1">
      <h1>
        Offline:<br />
        Intentional<br />
        Attention
      </h1>
      <br />
      <h2>
        Less might be more.
      </h2>
    </BlocklyHeader>
    <TextBody>
      <p>
        Want to be productive? Go offline. Literally disconnect the Wi-Fi, because to maintain a constant connection to the internet is to maintain a constant connection to interruptions, both external and internal.
      </p>

      <p>
        The external interruptions are legion and well-documented: you have a new message on Gmail, Slack, Twitter, Facebook, Instagram, Snapchat, LinkedIn. Friends, family, coworkers, and spammers: each have direct access to your precious attention.
      </p>

      <p>
        But it’s the internal distractions that are truly pernicious. You can mute Twitter notifications and log off of Slack, but how do you stop your own mind from derailing you? I have spent hours caught in webs of my own curiosity. Most dangerous is the split-second whim, apropos of nothing: “I wonder what the second most common first language is?” Those 500 milliseconds could change your day, because it is never just one Google search, just one Wikipedia article. Disconnecting from the internet short-circuits those whims, allowing you to move on unencumbered. (It’s Hindi, by the way.)
      </p>

      <p>
        This page itself is an experiment in this vein: what if certain content required us to disconnect? What if readers had access to that glorious attention that makes devouring a novel for hours at a time so satisfying? What if creators could pair that ancient attention with the power of modern devices? Our phones and laptops are an amazing platform for novel content — if only we could harness our own attention.
      </p>

      <p>
        Offline-only content would also force creators to think differently. Look at this page: there is not a single link, no footnote offering to distract readers. How many good articles have you left half-read because you bit a shinny underlined apple?
      </p>

      <p>
        I can already hear the groans: “But I have to be online for my job.” I don’t care. Make time. I bet the thing that makes you valuable is not your ability to Google something, but the ability to synthesize information. Do your research online, but create offline. Have your quick conversations online, but truly connect offline.
      </p>

      <p>
        Now back to your regularly scheduled internet. Just remember to give yourself an occasional gift of disconnection.
      </p>

      <p>
        ❤️ Chris
      </p>
    </TextBody>
  </Page>
);

export class OfflinePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.state = {
      online: navigator.onLine,
    };
  }
  componentDidMount() {
    window.addEventListener('online', () => this.setState({ online: true }));
    window.addEventListener('offline', () => this.setState({ online: false }));
    window.addEventListener('keydown', ({ keyCode, shiftKey }) =>
      (keyCode === 187 && shiftKey) ? this.setState({ online: !this.state.online }) : null
    );
  }
  render() {
    return this.state.online ? <Online /> : <Offline />;
    // return <Offline />;
  }
}

OfflinePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(OfflinePage);
