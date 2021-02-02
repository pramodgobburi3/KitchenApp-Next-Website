// pages/_app.js
import '../assets/css/App.css';
import "antd/dist/antd.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/override_header.css';
import '../assets/css/override_steps.css';
import '../assets/css/override_ant.css';
import '../assets/css/calendar.css';
import { Layout } from 'antd';

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../ApolloClient";

import NProgressLoader from '../components/NProgressLoader';
import NavBar from '../components/NavBar';
const { Content } = Layout;

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <html>
        <head>
          <meta charSet="utf-8" />
          <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta
            name="description"
            content="Web site created using create-react-app"
          />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Castoro"/>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat"/>
          <link href='https://fonts.googleapis.com/css?family=Sansita Swashed' rel='stylesheet'/>
          <title>Kitchen App</title>
        </head>
        <body>
          <div className="App">
            <NProgressLoader />
            <Layout>
              <div style={{position: 'relative', backgroundColor: 'white', boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)', width: '100%', zIndex: 100, height: 'auto'}}>
                <NavBar />
              </div>
              <Content style={{backgroundColor: 'white'}}>
                <Component {...pageProps} />
              </Content>
            </Layout>
          </div>
        </body>
      </html>
    </ApolloProvider>
  );
}