import React, {useContext,useState} from 'react'
import Header from './Head'
import Link from 'next/link'
import {Space} from 'antd'
import {connect} from 'react-redux'
import VuroxHeader, {VuroxBrand, VuroxMenuToggler} from 'Components/Header'
import VuroxFormSearch from 'Components/search'
import ProfileBadge from 'Components/profile'
import VuroxDropdown, { DropdownItems, DropdownItem, DropdownItemSeperator, DropdownBigItems, DropdownItemsHead } from 'Components/dropdown'
import { 
	VuroxProgressbar
} from 'Components/progressbar';
import { Search, GridFill ,Grid } from 'react-bootstrap-icons'
import { vuroxContext } from '../context'

import Nav, { Navitem, SubNavItems } from 'Components/nav'
import { Row, Col } from 'antd'
import { useRouter } from "next/router";
import api from '../services/api'


const HeaderDark = () => {
	const { toggleMenu, menuState } = useContext(vuroxContext)
	const [nome, setNome] = useState("");
	const router = useRouter()

	const fetchUser = async () => {
    api.post("userlist",({busca: ""})).then(resp => {
      const id = localStorage.getItem("user-id");
      const data = resp.data;

      for (var i = 0; i < data.length; i++) {
        if(data[i].us_id == id) {
					setNome(`${data[i].username}`);
        }
      }
    })
	}

	const logOut = () => {
    const id = localStorage.removeItem("user-id");
		router.push("/login")
	}

	fetchUser()

	return (
		<div>
			<Header />
			<VuroxHeader version='light'>
				<Row align="middle">
					<Col span={12}>
						<Space direction="horizontal" size="large" align="center">
							{
								menuState ? 
								<Link href='#'><Grid className="vurox-menu-toggler" onClick={ toggleMenu } /></Link>
								:
								<GridFill className="vurox-menu-toggler" onClick={ toggleMenu } />
							}
							<VuroxFormSearch border='rounded-pill border-0' placeholder='Search Components' icon={<Search />}/>
						</Space>
					</Col>
					<Col span={12}>
						<div className='justify-content-end d-flex flex-row rigth_side_header'>

							<VuroxDropdown position='vurox-dropdown-top-right'>
								<ProfileBadge name='User'  size='md' shape='rounded' version='dark' className='mt-3 m-2 vurox-dropdown' badge='' badgeColor='bg-purple-6' badgeShape='circle' />
								<DropdownItems width={200} className='py-2'>
									<DropdownItem link='#' className='disabled-hover'>
										<DropdownBigItems>
											<img className='flex-fill' src="/image/propic/5.jpg" alt=""/>
											<div className="dropdown-big-items-content">
												<p>Bem-vindo, {nome}</p>
											</div>
										</DropdownBigItems>
									</DropdownItem>
									<DropdownItem link='/acount'><i className='ti-user'></i>Sua Conta</DropdownItem>
									<DropdownItem link='/settings'><i className='ti-user'></i>Configurações</DropdownItem>
								</DropdownItems>
							</VuroxDropdown>

							<div className="log_out_header">
								<button onClick={logOut}><img src="./image/log_out.svg" /></button>
							</div>

						</div>
					</Col>
				</Row>
			</VuroxHeader>
		</div>
	);
}

export default connect(state=>state)(HeaderDark);