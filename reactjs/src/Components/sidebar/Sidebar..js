import React from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import "./Sidebar.css";

import {
  BsCurrencyExchange,
  BsPiggyBankFill,
  BsFillBarChartFill,
  BsGridFill,
} from "react-icons/bs";

const Sidebar = ({ activeLink, setActivelink }) => {
  const handleClick = (e, link) => {
    e.preventDefault();
    setActivelink(link);
  };

  return (
    <>
      <ProSidebar>
        <SidebarContent>
          <Menu>
            <MenuItem
              icon={<BsGridFill />}
              active={activeLink === "/"}
              onClick={(e) => handleClick(e, "/")}
            >
              <span className="title">Dashboaord</span>
            </MenuItem>
            <hr />
            <MenuItem
              icon={<BsCurrencyExchange />}
              active={activeLink === "/transaction"}
              onClick={(e) => handleClick(e, "/transaction")}
            >
              <span className="title">Transactions</span>
            </MenuItem>
            <hr />
            <MenuItem
              icon={<BsPiggyBankFill />}
              active={activeLink === "/account"}
              onClick={(e) => handleClick(e, "/account")}
            >
              <span className="title">Accounts</span>
            </MenuItem>
            <hr />
            <MenuItem
              icon={<BsFillBarChartFill />}
              active={activeLink === "/report"}
              onClick={(e) => handleClick(e, "/report")}
            >
              <span className="title">Reports</span>
            </MenuItem>
            <hr />
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </>
  );
};

export default Sidebar;
