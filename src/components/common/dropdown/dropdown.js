import { Dropdown, Menu } from "antd";
import React, { useState } from "react";

import { DownOutlined } from "@ant-design/icons";

export const OverlayVisible = (props) => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = (e) => {
    if (e.key === "3") {
      // this.setState({ visible: false });
      setVisible(false);
    }
  };

  const handleVisibleChange = (flag) => {
    //   this.setState({ visible: flag });
    setVisible(!visible);
  };

  const menu = (
    <Menu onClick={() => handleMenuClick()}>
      <Menu.Item key="1">{props.task && props.task.reward}</Menu.Item>
      {/* <Menu.Item key="2">Clicking me will not close the menu also.</Menu.Item>
      <Menu.Item key="3">Clicking me will close the menu.</Menu.Item> */}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      onVisibleChange={() => handleVisibleChange()}
      visible={visible}
    >
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        style={{ fontSize: "11px" }}
      >
        Reward <DownOutlined style={{ fontSize: "8px" }} />
      </a>
    </Dropdown>
  );
};
