import App, { Container } from "next/app";
import { Provider } from "react-redux";
import React, { useEffect,useState,Component } from "react";
import { useRouter } from "next/router";
import withRedux from "next-redux-wrapper";
import configureStore from "../store";
import { VuroxContextProvider } from "../context";
import Router from 'next/router'
import api from '../services/api'

import "Styles/styles.less";
import "Styles/go_food.less"
import "antd/dist/antd.less";

function MyComponent({ children, path }) {
  const [nome, setNome] = useState("");
  const router = useRouter();
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    const id = localStorage.getItem("user-id");
    const token = localStorage.getItem("app-token");
    api.get(`auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((resp) => {
        const email = resp.data.Usuario.email;
        setNome(`Hello! ${email}`);
        setLoaded(true)
      })
      .catch((err) => {
        router.push("/login")
      });
  },[]);

  if(path != "/login") {
    if(!loaded){
        return <div></div>
    }else {
      return ( 
      <>{children}</>
    )
  }
  }else {
    return (
      <>{children}</>
    )
  }
}

class VuroxApp extends App {
  state = {
    width: "",
  };
  
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  componentWillMount() {
    const isClient = typeof window === "object";
    const width = isClient ? window.innerWidth : undefined;
    this.setState({ width: width });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <MyComponent path={this.props.router.asPath}>
        <Provider store={store}>
          <VuroxContextProvider pageWidth={this.state.width}>
            <Component>{this.pageProps}</Component>
          </VuroxContextProvider>
        </Provider>
      </MyComponent>
    );
  }
}

export default withRedux(configureStore)(VuroxApp);
