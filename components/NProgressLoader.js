import React, { useState } from 'react';
import NProgress from 'nprogress';
import Router from "next/router";
import Loader from './Loader';

/* eslint-disable react/prefer-stateless-function */
class NProgressLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showProgress: false
    }
  }
  timer = null;

  routeChangeStart = () => {
    NProgress.set(this.props.startPosition);
    this.setState({showProgress: true})
    NProgress.start();
  };

  routeChangeEnd = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({showProgress: false})
      NProgress.done(true);
    }, this.props.stopDelayMs);
  };

  render() {
    if (this.state.showProgress) {
      return (
        <Loader overlay={true} hasHeader={false} />
      );
    } else {
      return null;
    }  
  }

  componentDidMount() {
    const { options } = this.props;

    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', this.routeChangeStart);
    Router.events.on('routeChangeComplete', this.routeChangeEnd);
    Router.events.on('routeChangeError', this.routeChangeEnd);
  }
}

export default NProgressLoader;