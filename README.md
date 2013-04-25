# MultiItemPicker jQuery Plugin [![Build Status](https://travis-ci.org/theJoeBiz/MultiItemPicker.png?branch=master)](https://travis-ci.org/theJoeBiz/MultiItemPicker)

A jQuery plugin to create two multi-select boxes that are connected to each other. This solution was originally developed as a replacement for SharePoint's GroupedItemPicker control.

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/theJoeBiz/MultiItemPicker/master/dist/MultiItemPicker.min.js
[max]: https://raw.github.com/theJoeBiz/MultiItemPicker/master/dist/MultiItemPicker.js

Include script *after* the jQuery library:
```
<script src="/path/to/multiitempicker.min.js"></script>
```
**Do not include the script directly from GitHub.** The file is being served as text/plain and as such being blocked in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Usage
Basic usage:
```
$('#targetElement').MultiItemPicker();
```
Advanced usage with options:
```
$('#targetElement').MultiItemPicker({
  keepAlphabetical: true,
  leftBoxItems: [
    ["Test Item 1", "1"],
    ["Test Item 2", "2"]
  ],
  beforeAdding: function(leftBox, rightBox) {
    alert('Current item count in right box: ' + rightBox.find('option').length);
  },
  afterAdded: function(leftBox, rightBox) {
    alert('New item count in right box: ' + rightBox.find('option').length);
  }
});
```
Method usage:
```
var rightBoxItems = $('#targetElement').MultiItemPicker('getRightBoxItems');
```

## Options
Cookie attributes can be set globally by setting properties of the `$.MultiItemPicker.defaults` object or individually for each call to `$.MultiItemPicker()` by passing a plain object to the options argument. Per-call options override the default options.
### generateElements (boolean)
The `generateElements` flag is **true** by default. It should only be set to false if the element you are performing on has all of the required elements already. If you want to do this, you need to have at least a select box with class "leftBox" and a select box with "rightBox". If you want buttons and are setting this flag to false, you need to include buttons with class "addButton" and "removeButton".
```
generateElements: false
```
### styleElements (boolean)
The `styleElements` flag is **true** by default. It should only be set to false if you want to style your own elements using CSS. If left as true, a table will be created containing the necessary elements to make this plugin work.
```
styleElements: false
```
### keepAlphabetical (boolean)
The `keepAlphabetical` flag is **true** by default. This option runs a sort option after each move between boxes to keep everything in order instead of just appending to the end of the destination box.
```
keepAlphabetical: false
```
### leftBoxItems (Array)
The `leftBoxItems` array is empty by default. If you want to prepopulate the box, you can pass them as an array to this option. If you want to pass a text AND a value, you can pass an array of arrays. In the inner array, the first value is the text and the second value is the value of the resulting <option> element.
```
leftBoxItems: [
  ["Test1", "1"],
  ["Test2"],
  "Test3"
]
```
will produce:
```html
<select multiple="multiple" class="leftBox">
  <option value="1">Test1</option>
  <option value="Test2">Test2</option>
  <option value="Test3">Test3</option>
</select>
```
### rightBoxItems (Array)
The `rightBoxItems` array is empty by default. If you want to prepopulate the box, you can pass them as an array to this option. If you want to pass a text AND a value, you can pass an array of arrays. In the inner array, the first value is the text and the second value is the value of the resulting <option> element.
```
rightBoxItems: [
  ["Test 4", "4"],
  ["Test5"],
  "Test 6"
]
```
will produce:
```html
<select multiple="multiple" class="rightBox">
  <option value="4">Test 4</option>
  <option value="Test5">Test 5</option>
  <option value="Test 6">Test 6</option>
</select>
```
### styles (Object)
The styles object give you the ability to style any of the created elements without having to do it manually in a seperate css file. Below are the default styles set by the plugin. If you don't want any styles to be added, set the `styleElements` flag to false.
```
styles: {
  leftBox: {
    minWidth: 150,
    minHeight: 200
  },
  rightBox: {
    minWidth: 150,
    minHeight: 200
  },
  addButton: {
    display: 'block',
    width: '100%'
  },
  removeButton: {
    display: 'block',
    width: '100%'
  },
  middleCell: {
    paddingLeft: 10,
    paddingRight: 10
  }
}
```
### beforeAdding (Function)
The `beforeAdding` function will be called before an item is moved from the leftBox to the rightBox. The response passes two parameters, **leftBox** and **rightBox**. Those variables are the respective DOM elements.
```
beforeAdding: function(leftBox, rightBox) {
  // Do stuff
}
```
### afterAdded (Function)
The `afterAdded` function will be called after an item is moved from the leftBox to the rightBox. The response passes two parameters, **leftBox** and **rightBox**. Those variables are the respective DOM elements.
```
afterAdded: function(leftBox, rightBox) {
  // Do stuff
}
```
### beforeRemoving (Function)
The `beforebeforeRemovingAdding` function will be called before an item is moved from the rightBox to the leftBox. The response passes two parameters, **leftBox** and **rightBox**. Those variables are the respective DOM elements.
```
beforeRemoving: function(leftBox, rightBox) {
  // Do stuff
}
```
### afterRemoved (Function)
The `afterRemoved` function will be called after an item is moved from the rightBox to the leftBox. The response passes two parameters, **leftBox** and **rightBox**. Those variables are the respective DOM elements.
```
afterRemoved: function(leftBox, rightBox) {
  // Do stuff
}
```

## Tests

Open in browser:

    $ open test/MultiItemPicker.html

For quick *non cross-browser* testing use grunt, install grunt CLI and project dependencies as outlined in this guide: <http://gruntjs.com/getting-started>, then run:
    
    $ grunt

## Development
- Source hosted at [GitHub](https://github.com/theJoeBiz/MultiItemPicker)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/theJoeBiz/MultiItemPicker/issues)

Pull requests are very welcome! Make sure your patches are well tested. Please create a topic branch for every separate change you make.

## Authors
[Joe Duchnowski](https://github.com/theJoeBiz)
