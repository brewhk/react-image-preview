# React Image Preview

**Under Development**

Previews images added to file input using Object URLs.

### Browser Support

Chrome 8, FF4, IE10, Safari 6, Opera 15, Edge

iOS Safari 6.1, Android Browser 4, Blackberry Browser 10, Opera Mobile 37, Chrome for Android, Firefox for Android, IE Mobile 11, UC Browser 11, Samsung Internet 4 

### Usage

##### Simple Usage

You can simply `require` or `import` the component and add it into your project.

```
import React from 'react'
import ImagePreview from 'react-image-preview';

function MyComponent() {
  return {
    <div>
      <p>Please add your images below:</p>
      <ImagePreview />
    </div>
  }
}

export default MyComponent;

```

### Props

* `wrapper` *Function* - A higher order component function, which allows you to specify a wrapper component around each of the images being previewed. Defaults to `(e) => e`, which simply does not wrap the components at all
* `extensionRegex` *String* - A RegEx string which is used to limit the filetypes allowed. Defaults to `'\.(jpe?g|png)$'`
* `extensionRegexFlags` *String* - A flag passed into `new RegExp()` alongside `extensionRegex`. Defaults to `'i'`
* `unsupportedTypeError` *Function* - A function which takes a filename and returns an `Error`. Defaults to `(filename) => new Error(`${filename} has an unsupported file type`)`
* `maxFileSize` *int* - The maximum file size (in bytes) for each image. Defaults to `5242880`, or 5MB.
* `onChange` *Function* - A function which is called whenever the images change. It is passed a single argument - an updated array of blob URLs of the images.