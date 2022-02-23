import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'
import { useRouter } from "next/router";

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import { vuroxContext } from '../context'
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import Acount from '../Components/RepositoryUser'

const AcountComponent = () => {

  const { menuState } = useContext(vuroxContext);
  const toggleClass = menuState ? 'menu-open' : 'menu-closed';
	const { toggleMenu } = useContext(vuroxContext)

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
        <Acount />
    </React.Fragment>
  );
}


class Login extends React.Component {
	render() {
    
		return (
      <AcountComponent />
		);
	}
}

export default connect(state=>state)(Login);