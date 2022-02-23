import React, { Component,useState, useContext } from 'react';
import { vuroxContext } from '../../../../context'
import Sidebar from 'Templates/HeaderSidebar';

import {
	VuroxSidebar,
} from 'Components/layout'

export default function SidebarComponent ({ props }) {
  const { menuState } = useContext(vuroxContext);

  const toggleClass = menuState ? 'menu-open' : 'menu-closed';

	const { toggleMenu } = useContext(vuroxContext)

  return (
    <VuroxSidebar width={240} className={`sidebar-container ${toggleClass}`}>
      <Sidebar className={toggleClass} />
    </VuroxSidebar>
  );
}