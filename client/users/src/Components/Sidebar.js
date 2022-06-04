import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div
      style={{ display: "flex", height: "100%", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#111827">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/supervisorDashboard"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            Quick Access
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink
              to="/topicacceptance"
              className={(navData) =>
                navData.isActive ? "active-style" : "none"
              }
            >
              <CDBSidebarMenuItem
                iconSize="2x"
                style={{ marginTop: "50px", marginRight: "40px" }}
                icon="table"
              >
                Topics
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/profile"
              className={(navData) =>
                navData.isActive ? "active-style" : "none"
              }
            >
              <CDBSidebarMenuItem
                iconSize="2x"
                style={{ marginTop: "50px", marginRight: "40px" }}
                icon="user"
              >
                My Profile
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to="/evaluation"
              className={(navData) =>
                navData.isActive ? "active-style" : "none"
              }
            >
              <CDBSidebarMenuItem
                iconSize="2x"
                style={{ marginTop: "50px", marginRight: "40px" }}
                icon="chart-line"
              >
                Student Evaluations
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
