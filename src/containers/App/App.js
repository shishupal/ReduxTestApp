import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { IndexLink } from 'react-router';
/* import { LinkContainer } from 'react-router-bootstrap'; */
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Alert from 'react-bootstrap/lib/Alert';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { Notifs, InfoBar } from 'components';
import config from 'config';
import { asyncConnect } from 'redux-connect';

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    notifs: state.notifs
  }))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    notifs: PropTypes.object
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { notifs, children } = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head} />
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <IndexLink to="/" activeStyle={{ color: '#33e0ff' }}>
                <div className={styles.brand} />
                <span>{config.app.title}</span>
              </IndexLink>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>

          <Navbar.Collapse eventKey={0}>
            <Nav navbar>
              {/* <LinkContainer to="/example">
                <NavItem eventKey={1}>Example</NavItem>
              </LinkContainer> */}
            </Nav>
            <Nav navbar pullRight>
              <NavItem
                eventKey={1} target="_blank" title="View on Github"
                href="https://github.com/bertho-zero/react-redux-universal-hot-example">
                <i className="fa fa-github" />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <div className={styles.appContent}>
          {notifs.global && <div className="container">
            <Notifs
              className={styles.notifs}
              namespace="global"
              NotifComponent={props => <Alert bsStyle={props.kind}>{props.message}</Alert>}
            />
          </div>}

          {children}
        </div>
        <InfoBar />

        <div className="well text-center">
          Have questions? Ask for help{' '}
          <a href="https://github.com/bertho-zero/react-redux-universal-hot-example/issues" target="_blank">
            on Github
          </a>
          {' '}or in the{' '}
          <a href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a>
          {' '}Discord channel.
        </div>
      </div>
    );
  }
}
