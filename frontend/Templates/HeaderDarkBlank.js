import React, {useContext} from 'react'
import Header from './Head'
import Link from 'next/link'
import {Space} from 'antd'
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


const HeaderDark = () => {
	const { toggleMenu, menuState } = useContext(vuroxContext)
	
	return (
		<div>
			<Header />
			<VuroxHeader version='light'>
				<Row align="middle">
					<Col span={12}>
					</Col>
					<Col span={12}>
						<div className='justify-content-end d-flex flex-row'>
							<VuroxDropdown position='vurox-dropdown-top-right'>
								<button className='dropbtn'><i className="ti-settings"></i></button>
								<DropdownItems>
									<DropdownItem link='/login'>Account</DropdownItem>
								</DropdownItems>
							</VuroxDropdown>
						</div>
					</Col>
				</Row>
			</VuroxHeader>
		</div>
	);
}
export default HeaderDark;