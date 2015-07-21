"use strict";

var React = require('react'),
    S3Upload = require('./s3upload.js'),
    objectAssign = require('object-assign');

var ReactS3Uploader = React.createClass({

    propTypes: {
        signingUrl: React.PropTypes.string.isRequired,
        acl: React.PropTypes.string,
        onProgress: React.PropTypes.func,
        onFinish: React.PropTypes.func,
        onError: React.PropTypes.func,
        onPreUpload: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            acl: "authenticated-read",
            onProgress: function(percent, message) {
                console.log('Upload progress: ' + percent + '% ' + message);
            },
            onFinish: function(signResult) {
                console.log("Upload finished: " + signResult.publicUrl)
            },
            onError: function(message) {
                console.log("Upload error: " + message);
            },
            onPreUpload: function(message) {
                console.log("Message: " + message);
            }
        };
    },

    uploadFile: function() {
        new S3Upload({
            fileElement: this.getDOMNode(),
            signingUrl: this.props.signingUrl,
            acl: this.props.acl,
            onPreUpload: this.props.onPreUpload,
            onProgress: this.props.onProgress,
            onFinishS3Put: this.props.onFinish,
            onError: this.props.onError
        });
    },

    render: function() {
        return React.DOM.input(objectAssign({}, this.props, {type: 'file', onChange: this.uploadFile}));
    }

});


module.exports = ReactS3Uploader;
