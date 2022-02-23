import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'
import { useRouter } from "next/router";
import api from '../services/api';

import Link from 'next/link' 

import HeaderDark from 'Templates/HeaderDark';
import Sidebar from 'Templates/HeaderSidebar';
import { GridFill ,Grid } from 'react-bootstrap-icons'

import {
	VuroxLayout,
	HeaderLayout,
	VuroxSidebar,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import { vuroxContext } from '../context'

import {   
    Form,
    Input,
    Button,
    Radio,
    Select,
    Typography,
    Space, 
    Row, 
    Col
} from 'antd';

import RelatorioBalanço from '../Components/RepositoryRelatorioBalanço'

const RelatorioBalançoComponent = () => {

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
        <RelatorioBalanço />
    </React.Fragment>
  );
}


class ContainerPDV extends React.Component {
	render() {
  return (
    <RelatorioBalançoComponent className="" />
		);
	}
}

export default connect(state=>state)(ContainerPDV);