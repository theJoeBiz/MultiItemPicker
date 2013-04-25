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
```
generateElements: false
```
### styleElements
```
styleElements: false
```
### keepAlphabetical
```
keepAlphabetical: false
```
### leftBoxItems
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
### rightBoxItems
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
### styles
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
### beforeAdding
```
beforeAdding: function(leftBox, rightBox) {
  // Do stuff
}
```
### afterAdded
```
afterAdded: function(leftBox, rightBox) {
  // Do stuff
}
```
### beforeRemoving
```
beforeRemoving: function(leftBox, rightBox) {
  // Do stuff
}
```
### afterRemoved
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
