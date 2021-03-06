import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router-dom';
import { drizzle, BondingCurveContract } from './eth/drizzle.config';

import { AppLoader, Header, Footer } from './common';
import { MemeIndex, MemeLeaderboard, MemeShow } from './memes';
import Portfolio from './memes/meme.portfolio';
import actions from './actions';

class App extends Component {

  componentDidMount() {
    // window.addEventListener('focus', () => {
    //   console.log('focus!');
    //   drizzle.contracts.ProxyFactory.syncEvents();
    // }, false);
    window.addEventListener('hashchange', () => {
      drizzle.contracts.ProxyFactory.syncEvents();
    }, false);
  }

  componentDidUpdate(lastProps) {
    if (this.props.ProxyFactory.events === lastProps.ProxyFactory.events) return;
    this.props.ProxyFactory.events.forEach(e => {
      let address = e.returnValues.proxyAddress;
      if (this.props.memes.indexOf(address) !== -1) return;
      drizzle.addContract(BondingCurveContract, {
        name: address,
        address,
        events: [{
          eventName: 'StoreHash',
          eventOptions: {
            fromBlock: e.blockNumber,
          }
        }]
      });
      this.props.actions.addMeme(address);
    });
  }

  render() {
    return (
      <div className="container">
        <Header />
        <AppLoader>
          <Switch>
            <Route exact path="/" component={MemeIndex} />
            <Route exact path="/leaderboard" component={MemeLeaderboard} />
            <Route exact path="/meme/:address" component={MemeShow} />
            <Route exact path="/portfolio" component={Portfolio} />
            <Route render={() => (<div>404</div>)} />
          </Switch>
        </AppLoader>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ProxyFactory: state.contracts.ProxyFactory || {},
  memes: state.memes.all,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...actions.memeActions }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
