import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Header() {
  return (
    <div className='header'>
      <Link className='logo' to='/'>
        <h1>
          Meme Lordz
        </h1>
      </Link>
      <p>
        <i>The first fully decentralized meme currency market!</i>
        <br />
        <br />
        Turn any meme into its own currency.
        <br />
        Let the market define its value based on popularity.
        <br />
        Buy and sell meme currency on our platform, and start earning.
        <br />
        The more meme-predicting skills you have, the more you’ll earn!
      </p>
      <p>
        Built on Ethereum and IPFS.
      </p>
    </div>
  );
}

// function Status(props) {
//   return (
//     <table className='status'>
//       <tbody>
//         <tr>
//           <td>Web3</td>
//           <td>{props.status}</td>
//         </tr>
//         <tr>
//           <td>Drizzle</td>
//           <td>{props.drizzleStatus ? 'initialized' : 'initializing...'}</td>
//         </tr>
//         <tr>
//           <td>Account</td>
//           <td>{props.account}</td>
//         </tr>
//         <tr>
//           <td>Network</td>
//           <td>{props.network}</td>
//         </tr>
//       </tbody>
//     </table>
//   )
// }

const mapStateToProps = (state) => ({
  account: state.accounts[0],
  network: state.web3.networkId,
  status: state.web3.status,
  drizzleStatus: state.drizzleStatus.initialized,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);