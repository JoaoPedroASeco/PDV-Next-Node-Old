import React, { Component, useState, setState } from 'react';
import auth from '../../services/auth';
import api from '../../services/api';

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import ListRelatorioBalanço from './ListRelatorioBalanço/index'
import SidebarComponent from './SidebarComponent'
import {CupomNaoFiscalComponent} from '../RepositoryCupons/CupomRelatorioBalanco/Component'



class RelatorioBalanço extends Component {
  constructor(props){
    super(props)
    this.state = {
      relatorios_balanco: [],
      dados_usuario: [],
    }
  }

  formatMoney () {
		return new Intl.NumberFormat('pt', {
			style: 'currency',
			currency: 'BRL',
		})
	}

  ListDadosUsuario() {
    api.get("configlist").then(resp => {
      const data = resp.data;
      this.setState({dados_usuario: data});
   })
  }

  ListRelatorioBalanço (values){
    api.post("relatoriolucro",(values)).then(resp => {
      const data = resp.data
      this.setState({relatorios_balanco: data})
    })
  }

  componentDidMount() {
  }

  render() {
    return (
      <VuroxLayout>
        <SidebarComponent />
        <ContentLayout width='100%' className='vurox-scroll-x'>
          <VuroxComponentsContainer className="custom_container_100">
            <ListRelatorioBalanço props={this} />
            <CupomNaoFiscalComponent props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    );
  }
}

export default RelatorioBalanço;