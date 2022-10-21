import React, { Component } from "react";
import instance from "../eth_contracts/factory.js";
import { Button, Card } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import Layout from "../components/layout.js";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await instance.methods.getDeployedCampaigns().call();
        return { campaigns: campaigns };
    }
    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View campaign</a>,
                fluid: true
            }
        });
        return (
            <Card.Group items={items}> 
            </Card.Group>
        );
    }
    render() {
        return (
            <Layout>
            <div>
                <h3>Open campaigns:</h3>
                <div>{this.renderCampaigns()}</div>
                <Button content="Create Campaign" icon="add circle" primary/>
            </div>
            </Layout>
        );
    }
}

export default CampaignIndex;