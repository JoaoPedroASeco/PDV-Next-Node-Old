import React, { Component, useState, setState } from 'react';
import auth from '../../services/auth';
import api from '../../services/api';

import {
	VuroxLayout,
	HeaderLayout,
	ContentLayout,
	VuroxComponentsContainer
} from 'Components/layout'

import ListRelatorioEntrada from './ListRelatorioEntrada/index'
import SidebarComponent from './SidebarComponent'
import {CupomNaoFiscalComponent} from '../RepositoryCupons/CupomRelatorioEntrada/Component'


class RelatorioEntrada extends Component {
  constructor(props){
    super(props)
    this.state = {
      relatorios_entrada: [],
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

  ListRelatorioEntrada (values){
    api.post("relatorioentrada",(values)).then(resp => {
      const data = resp.data
      this.setState({relatorios_entrada: data})
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
            <ListRelatorioEntrada props={this} />
            <CupomNaoFiscalComponent props={this} />
          </VuroxComponentsContainer>
        </ContentLayout>
      </VuroxLayout>
    );
  }
}

export default RelatorioEntrada;