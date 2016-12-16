"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagePreview = function (_Component) {
  _inherits(ImagePreview, _Component);

  function ImagePreview(props) {
    _classCallCheck(this, ImagePreview);

    var _this = _possibleConstructorReturn(this, (ImagePreview.__proto__ || Object.getPrototypeOf(ImagePreview)).call(this, props));

    _this.state = {
      images: []
    };
    return _this;
  }

  _createClass(ImagePreview, [{
    key: "previewFiles",
    value: function previewFiles(event) {
      var _this2 = this;

      var fileNameRegEx = new RegExp(this.props.extensionRegex, this.props.extensionRegexFlags);
      var files = event.target.files;

      this.setState({
        images: []
      }, function () {
        var readAndPreview = function readAndPreview(file) {

          // Make sure `file.name` matches our extensions criteria
          if (fileNameRegEx.test(file.name)) {

            // Check the file size is under the limit
            if (file.size <= _this2.props.maxFileSize) {

              // Set the state of the component to reflect the new images array
              _this2.setState(function (prevState, props) {
                var newImages = prevState.images.concat([window.URL.createObjectURL(file)]);
                _this2.props.onChange(newImages);
                return { images: newImages };
              });
            } else {
              // Display error indicating file is too large
              throw exceedMaxFileSizeError(file.name);
            }
          } else {
            // Display error indicating unsupported file types
            throw unsupportedTypeError(file.name);
          }
        };

        // If there are files, run `readAndPreview` on each of them
        if (files) {
          [].forEach.call(files, readAndPreview);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "button",
          { label: "Upload Images" },
          _react2.default.createElement("input", { type: "file", onChange: this.previewFiles.bind(this), multiple: true })
        ),
        _react2.default.createElement(
          "div",
          null,
          this.state.images.map(function (image) {
            return _this3.props.wrapper(_react2.default.createElement(
              "div",
              { key: image },
              _react2.default.createElement("img", { src: image })
            ));
          })
        )
      );
    }
  }]);

  return ImagePreview;
}(_react.Component);

exports.default = ImagePreview;


ImagePreview.propTypes = {
  wrapper: _react2.default.PropTypes.func,
  extensionRegex: _react2.default.PropTypes.string,
  extensionRegexFlags: _react2.default.PropTypes.string,
  unsupportedTypeError: _react2.default.PropTypes.func,
  exceedMaxFileSizeError: _react2.default.PropTypes.func,
  maxFileSize: _react2.default.PropTypes.number,
  onChange: _react2.default.PropTypes.func
};

ImagePreview.defaultProps = {
  wrapper: function wrapper(e) {
    return e;
  },
  extensionRegex: '\.(jpe?g|png)$',
  extensionRegexFlags: 'i',
  unsupportedTypeError: function unsupportedTypeError(filename) {
    return new Error(filename + " has an unsupported file type");
  },
  exceedMaxFileSizeError: function exceedMaxFileSizeError(filename) {
    return new Error(filename + " is too large");
  },
  maxFileSize: 5242880,
  onChange: function onChange() {
    return undefined;
  }
};
module.exports = exports["default"];
//# sourceMappingURL=ImagePreview.js.map