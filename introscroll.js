const getElement = selector => document.querySelector(selector);

const swipe = selector => {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  const onSwipeUp = new Event('onswipeup');
  const onSwipeRight = new Event('onswiperight');
  const onSwipeDown = new Event('onswipedown');
  const onSwipeLeft = new Event('onswipeleft');
  const onTap = new Event('tap');

  element.addEventListener(
    'touchstart',
    event => {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    },
    false
  );

  element.addEventListener(
    'touchend',
    event => {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;

      handleTouch();
    },
    false
  );

  const handleTouch = () => {
    if (touchendX < touchstartX) {
      element.dispatchEvent(onSwipeLeft);
    }

    if (touchendX > touchstartX) {
      element.dispatchEvent(onSwipeRight);
    }

    if (touchendY < touchstartY) {
      element.dispatchEvent(onSwipeUp);
    }

    if (touchendY > touchstartY) {
      element.dispatchEvent(onSwipeDown);
    }

    if (touchendY === touchstartY) {
      element.dispatchEvent(onTap);
    }
  };
};

export default class IntroScroll {
  constructor(settings) {
    this.settings = Object.assign(
      {},
      {
        element: '#intro',
        wrapper: '#wrapper',
        container: '#container',
        trigger: '#intro__link',
        scrollClass: 'is-scrolled',
        duration: 1500,
        afterScroll: null
      },
      options
    );
    this.win = window;
    this.doc = document;
    this.element = getElement(settings.element);
    this.wrapper = getElement(settings.wrapper);
    this.container = getElement(settings.container);
    this.trigger = getElement(settings.trigger);
    this.scrollClass = settings.scrollClass;
    this.duration = settings.duration;
    this.afterScroll = settings.afterScroll;
    this.isScrolling = false;

    this.init();
  }

  init() {
    this.bind();
  }

  bind() {
    const win = this.win;
    const trigger = this.trigger;
    const element = this.element;
    const wrapper = this.wrapper;
    const container = this.container;

    swipe(element);
    swipe(wrapper);

    element.addEventListener(
      'mousewheel',
      event => {
        if (event.deltaY > 0) {
          this.enableScroll();
        }
      },
      false
    );

    element.addEventListener(
      'onswipeup',
      event => {
        this.enableScroll();
      },
      false
    );

    wrapper.addEventListener(
      'onswipedown',
      event => {
        if (this.win.pageYOffset <= 0) {
          this.disableScroll();
        }
      },
      false
    );

    container.addEventListener(
      'mousewheel',
      event => {
        if (event.deltaY < 0 && this.win.pageYOffset <= 0) {
          this.disableScroll();
        }
      },
      false
    );

    win.addEventListener(
      'mousewheel',
      event => {
        if (win.pageYOffset <= 0 && wrapper.classList.contains(this.scrollClass) && event.deltaY < 0) {
          this.disableScroll();
        }
      },
      false
    );

    trigger.addEventListener(
      'click',
      event => {
        event.preventDefault();

        if (!wrapper.classList.contains(this.scrollClass) || win.pageYOffset > 1) {
          this.enableScroll();
        }
      },
      false
    );
  }

  enableScroll() {
    this.wrapper.classList.add(this.scrollClass);
    this.isScrolling = true;

    setTimeout(() => {
      this.doc.body.style.overflow = 'visible';
      this.isScrolling = false;

      typeof this.afterScroll === 'function' && this.afterScroll(this);
    }, this.duration);
  }

  disableScroll() {
    if (this.isScrolling) {
      return;
    }

    this.wrapper.classList.remove(this.scrollClass);
    this.doc.body.style.overflow = 'hidden';
  }
}
