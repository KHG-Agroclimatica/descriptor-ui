import { ScrollView } from "devextreme-react";
import Drawer from "devextreme-react/drawer";
import Toolbar, { Item } from "devextreme-react/toolbar";
import { Fragment, useState } from "react";
import NavigationList from "./NavigationList";
import "./styles.css";

const SideNavigation = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(true);

  const buttonOptions = {
    icon: "menu",
    onClick: () => {
      setIsOpen((pre) => !pre);
    },
  };

  return (
    <Fragment>
      <Toolbar id="toolbar">
        <Item widget="dxButton" options={buttonOptions} location="before" />
      </Toolbar>
      <Drawer
        opened={isOpen}
        component={NavigationList}
        revealMode="expand"
        openedStateMode="push"
        height={'100vh'}
      >
        <ScrollView>
          <div id="content" className="dx-theme-background-color">
            {children}
          </div>
        </ScrollView>
      </Drawer>
    </Fragment>
  );
};

export default SideNavigation;
