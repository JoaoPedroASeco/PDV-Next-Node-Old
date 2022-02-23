import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'
import { useRouter } from "next/router";
import api from '../services/api';
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import { vuroxContext } from '../context'
import PDV from '../Components/RepositoryPDV'

const PDVComponent = () => {
  const { menuState } = useContext(vuroxContext);
  const toggleClass = menuState ? 'menu-open' : 'menu-closed';
	const { toggleMenu } = useContext(vuroxContext)

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
        <PDV />
    </React.Fragment>
  );
}


class ContainerPDV extends React.Component {
	render() {
    
  return (
    <PDVComponent/>
		);
	}
}

export default connect(state=>state)(ContainerPDV);