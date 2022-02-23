import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'
import { useRouter } from "next/router";
import api from '../services/api';
import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import Swal from 'sweetalert2'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'
import { vuroxContext } from '../context'
import ListConfig from '../Components/RepositoryConfig'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

const SettingsComponent = () => {
  const { menuState } = useContext(vuroxContext);
  const toggleClass = menuState ? 'menu-open' : 'menu-closed';
	const { toggleMenu } = useContext(vuroxContext)

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
        <ListConfig />
    </React.Fragment>
  );
}


class Settings extends React.Component {
	render() {
		return (
      <SettingsComponent />
		);
	}
}

export default connect(state=>state)(Settings);