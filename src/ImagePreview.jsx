import React, { Component } from 'react';

export default class ImagePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    }
  }

  previewFiles(event) {

    const fileNameRegEx = new RegExp(this.props.extensionRegex, this.props.extensionRegexFlags);
    const files = event.target.files;

    this.setState({
      images: []
    }, () => {
      const readAndPreview = (file) => {

        // Make sure `file.name` matches our extensions criteria
        if (fileNameRegEx.test(file.name)) {

          // Check the file size is under the limit
          if (file.size <= this.props.maxFileSize) {

            // Set the state of the component to reflect the new images array
            this.setState((prevState, props) => {
              const newImages = prevState.images.concat([window.URL.createObjectURL(file)]);
              this.props.onChange(newImages);
              return { images: newImages }
            });
          }
          else {
            // Display error indicating file is too large
            throw exceedMaxFileSizeError(file.name);
          }
        }
        else {
          // Display error indicating unsupported file types
          throw unsupportedTypeError(file.name);
        }

      }

      // If there are files, run `readAndPreview` on each of them
      if (files) {
        [].forEach.call(files, readAndPreview);
      }
    });
  }

  render() {
    return (
      <div>
        <button label="Upload Images">
          <input type="file" onChange={this.previewFiles.bind(this)} multiple />
        </button>
        <div>
          {this.state.images.map((image) => (
            this.props.wrapper(
              <div key={image}>
                <img src={image} />
              </div>
            )
          ))}
        </div>
      </div>
    );
  }
}

ImagePreview.propTypes = {
  wrapper: React.PropTypes.func,
  extensionRegex: React.PropTypes.string,
  extensionRegexFlags: React.PropTypes.string,
  unsupportedTypeError: React.PropTypes.func,
  exceedMaxFileSizeError: React.PropTypes.func,
  maxFileSize: React.PropTypes.number,
  onChange: React.PropTypes.func,
}

ImagePreview.defaultProps = {
  wrapper: (e) => e,
  extensionRegex: '\.(jpe?g|png)$',
  extensionRegexFlags: 'i',
  unsupportedTypeError: (filename) => new Error(`${filename} has an unsupported file type`),
  exceedMaxFileSizeError: (filename) => new Error(`${filename} is too large`),
  maxFileSize: 5242880,
  onChange: () => undefined
}