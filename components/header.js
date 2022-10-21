import React, { Component } from "react";
import { Menu } from "semantic-ui-react";

export default () => {
    return(
        <Menu>
            <Menu.Item>
                Crowdcoin
            </Menu.Item>
            <Menu.Menu>
                <Menu.Item>
                    Campaigns
                </Menu.Item>
                <Menu.Item>
                    +
                </Menu.Item>

            </Menu.Menu>
        </Menu>
    )
}