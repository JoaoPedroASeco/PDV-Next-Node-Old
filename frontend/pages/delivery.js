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
import Delivery from '../Components/RepositoryDelivery'

const DeliveryComponent = () => {
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => { setFormLayout(layout) };

  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 }, } : null;

  const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 }, } : null;

  const { menuState } = useContext(vuroxContext);

  const toggleClass = menuState ? 'menu-open' : 'menu-closed';

	const { toggleMenu } = useContext(vuroxContext)

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
        <Delivery />
    </React.Fragment>
  );
}


class ContainerDelivery extends React.Component {
	render() {
  return (
    <DeliveryComponent className="" />
		);
	}
}

export default connect(state=>state)(ContainerDelivery);