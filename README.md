![npm](https://img.shields.io/npm/dy/PrototypeJS)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/PrototypeJS)
[![Twitter URL](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Fim_alimohsin)](https://twitter.com/im_alimohsin)
# PrototypeJS
Javascript helper library

[Demos](https://github.com/renadmunna/PrototypeJS/tree/test)

## Table of contents
- [Features](#features)
- [Installation](#installation)
  - [Running](#running)
- [Export / Import](#export-/-import)
  - [Export example](#export-example)
- [Example](#example)
- [License](#license)

## Installation
#### LOCAL
```html
<script src="https://raw.githubusercontent.com/renadmunna/PrototypeJS/main/prototype.js"></script>
```
## Example
#### select element
```javascript
//select element
var $element = $('selector');
var $element_list = $$('selector');
//select element inside child
var $child = $element.$('selector');
var $child_list = $element.$$('selector');
```
