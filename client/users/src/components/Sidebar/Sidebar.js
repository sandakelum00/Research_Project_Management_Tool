import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div
      style={{ display: 'flex', height: '100%', overflow: 'scroll initial' }}
    >
      <CDBSidebar textColor="#fff" bg="primary"  variant="dark"  >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: 'inherit' }}
          >
            Quick Access
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem
               icon="home" iconSize="2x" style={{ marginTop:"50px", marginRight:"40px" }}>&emsp;&nbsp;Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/team" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users" iconSize="2x" style={{ marginTop:"50px", marginRight:"40px" }}>&emsp;&nbsp;Teams</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="download" iconSize="2x" style={{ marginTop:"50px", marginRight:"40px" }}>&emsp;&nbsp;Downloads</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/upload" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="folder" iconSize="2x" style={{ marginTop:"50px", marginRight:"40px" }}>&emsp;&nbsp;Document</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>  
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
