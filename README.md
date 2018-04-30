[![GitHub stars](https://img.shields.io/github/stars/scriptex/IntroScroll.svg?style=social&label=Stars)](https://github.com/scriptex/IntroScroll)
[![GitHub forks](https://img.shields.io/github/forks/scriptex/IntroScroll.svg?style=social&label=Fork)](https://github.com/scriptex/IntroScroll/network#fork-destination-box)
[![GitHub release](https://img.shields.io/github/release/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll/releases/latest)
[![GitHub issues](https://img.shields.io/github/issues/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll/commits/master)
[![Github file size](https://img.shields.io/github/size/scriptex/IntroScroll/dist/introscroll.min.js.svg)](https://github.com/scriptex/IntroScroll)
[![npm](https://img.shields.io/npm/dt/introscroll.svg)](https://www.npmjs.com/package/introscroll)
[![npm](https://img.shields.io/npm/v/introscroll.svg)](https://www.npmjs.com/package/introscroll)
[![license](https://img.shields.io/github/license/scriptex/IntroScroll.svg)](https://github.com/scriptex/IntroScroll)
[![Analytics](https://ga-beacon.appspot.com/UA-83446952-1/github.com/scriptex/IntroScroll/README.md)](https://github.com/scriptex/IntroScroll/)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/scriptex/IntroScroll/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/scriptex/IntroScroll/webpack.config.js/graphs/commit-activity)

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://github.com/scriptex/)
[![ForTheBadge powered-by-electricity](http://ForTheBadge.com/images/badges/powered-by-electricity.svg)](http://ForTheBadge.com)
[![ForTheBadge winter-is-coming](http://ForTheBadge.com/images/badges/winter-is-coming.svg)](http://ForTheBadge.com)

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
