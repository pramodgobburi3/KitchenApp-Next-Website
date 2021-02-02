import React from 'react';
import { Layout } from 'antd';

import NavBar from '../components/NavBar';
import Home from './home';

const { Header, Content } = Layout;


const Main = props => {
  return (
    <div className="App">
      <Layout>
        <Header style={{backgroundColor: 'white', boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)', position: 'relative', zIndex: 99999, paddingTop: 5, paddingBottom: 5, height: 'auto'}}>
          <NavBar />
        </Header>
        <Content style={{backgroundColor: 'white'}}>
          <Home />
        </Content>
      </Layout>
    </div>
  );
}

export default Main;
