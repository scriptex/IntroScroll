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

Just download this repository and link the files located in dist folder:

```
<script src="dist/introscroll.min.js"></script>
```

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
