import React, { Component } from 'react';
import './Framework.css';
import RichAppBar from './RichAppBar';

export default class Framework extends Component {
    constructor(props: any) {
        super(props);
    }
    render() {
        return (
            <div id="Framework">
                <RichAppBar />
            </div>
        );
    }
}