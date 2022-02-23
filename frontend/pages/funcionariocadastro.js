import React, {useState, useContext} from 'react'
import {connect} from 'react-redux'

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

import CrudComponent from '../Components/RepositoryFuncionario/FuncionarioCadastro/index'

const FuncionarioCrud = () => {

  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => { setFormLayout(layout) };

  const formItemLayout = formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 }, } : null;

  const buttonItemLayout = formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 }, } : null;

  return (
    <React.Fragment>
      <HeaderLayout className="sticky-top">
        <HeaderDark />
      </HeaderLayout>
      <CrudComponent />
    </React.Fragment>
  );
}


class ClieteForm extends React.Component {
  
	render() {
		return (
      <FuncionarioCrud />
		);
	}
}

export default connect(state=>state)(ClieteForm);