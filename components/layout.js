import React from "react";
import { Container } from "semantic-ui-react"
import Header from "./header.js";
import 'semantic-ui-css/semantic.min.css';

export default props => {
    return (
        <Container>
            <Header></Header>
            {props.children}
            <h1>I'm the footer</h1>
        </Container>
    );
}