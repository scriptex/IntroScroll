[![GitHub stars](https://img.shields.io/github/stars/scriptex/IntroScroll.svg?style=social&label=Stars)](https://github.com/scriptex/IntroScroll)
[![npm](https://img.shields.io/npm/dt/introscroll.svg)](https://www.npmjs.com/package/introscroll)
[![npm](https://img.shields.io/npm/v/introscroll.svg)](https://www.npmjs.com/package/introscroll)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll)
[![license](https://img.shields.io/github/license/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll)
[![Github file size](https://img.shields.io/github/size/scriptex/IntroScroll/dist/introscroll.min.js.svg)](https://github.com/scriptex/IntroScroll)

# IntroScroll

Create a fullscreen intro section and dismiss it in a single gesture.

## Description

This library creates a fullscreen intro section and disables the default page scroll.

The page scroll is being enabled again after a single mouse scroll, touch swipe up or any gesture that forces the page to move upwards.

## Install

```
npm i introscroll
```

or

```
yarn add introscroll
```

or

Just download this repository and link the files located in dist folder.

Then

```
import IntroScroll from 'introscroll';
```

and initialize an instance using default settings

```
const intro = new IntroScroll();
```

or add your own settings

```
const intro = new IntroScroll({
  element: '#your-fullscreen-section',
  wrapper: '#your-fullscreen-sections-wrapper',
  container: '#your-fullscreen-sections-container',
  trigger: '#your-fullscreen-sections-link',
  scrollClass: 'intro--scrolled',
  duration: 1000,
  afterScroll(instance) {
    console.log(instance.element);
  }
});
```

For more details please see the [demo](./demo/).

## LICENSE

MIT
