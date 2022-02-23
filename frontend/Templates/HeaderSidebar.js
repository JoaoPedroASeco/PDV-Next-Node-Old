import React, { useContext } from 'react';
import {  VerticalNavHeading, Navitem } from 'Components/nav'
import * as Bsicon from 'react-bootstrap-icons'
import VuroxFormSearch from 'Components/search'

const Sidebar = (props) => {

	return (
			<div className={`${props.className} vurox-vertical-nav`} style={{width: props.width + 'px'}}>
				<ul>
					<VerticalNavHeading>Operacional</VerticalNavHeading>
						<Navitem link='/' text='Home' icon={<Bsicon.House />} />
						<Navitem link='/pdv' text='PDV' icon={<Bsicon.Shop />} />
						<Navitem link='/delivery' text='Cadastrar Delivery' icon={<Bsicon.Truck />} />
						<Navitem link='/pedidos-delivery' text='Acompanhar Delivery' icon={<Bsicon.Truck />} />

					<VerticalNavHeading>Produtos</VerticalNavHeading>
						<Navitem link='/produtocadastro' text='Cadastro de Produtos' icon={<Bsicon.EggFried />}/>
					<VerticalNavHeading>Clientes</VerticalNavHeading>
						<Navitem link='/clientecadastro' text='Cadastro de Clientes' icon={<Bsicon.People />}/>
					<VerticalNavHeading>Funcionarios</VerticalNavHeading>
						<Navitem link='/funcionariocadastro' text='Cadastro de Funcionarios' icon={<Bsicon.People />}/>
					<VerticalNavHeading>Relatorios</VerticalNavHeading>
						<Navitem link='/relatorioentrada' text='Relatorio de Entrada' icon={<Bsicon.UpcScan />}/>
						<Navitem link='/relatoriosaida' text='Relatorio de Saida' icon={<Bsicon.UpcScan />}/>
						<Navitem link='/relatoriobalanco' text='Relatorio de Balanço' icon={<Bsicon.UpcScan />}/>

					<VuroxFormSearch border='rounded' className='ml-4 d-block d-sm-none bg-grey-6' />
				</ul>
			</div>
	);
}
export default Sidebar
