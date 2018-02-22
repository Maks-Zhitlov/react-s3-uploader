import React, {Component} from 'react';
import S3Uploader from "./s3ImageUploader/index";

class ExampleApp extends Component {
    render() {
        return (
            <div className="example-app">
                <br/>
                <h2>Example of usage <a href="#" target="_blank">s3ImageUploader</a></h2>
                <br/>
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

export default ExampleApp;
