import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import S3Uploader from "./s3uploaderHOC/index";


class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="app-container">
                    <S3Uploader
                        accept="image/*"
                        signingUrl="/s3/sign"
                        server="http://localhost:7500"
                    />
                </div>
            </div>
        );
    }
}

export default App;
