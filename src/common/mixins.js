export const dateFormat = function(date) {
  return date.toISOString().substring(0, 10);
};

export const scrollEvent = {
  _throttle(fn, delay) {
    let timer;

    return function() {
      if (!timer) {
        timer = null;
        timer = setTimeout(() => {
          fn.apply(this, arguments);
          console.log("ddd");
        }, delay);
      }
    };
  },
  infinit: {
    // handler, fetchArticles, 500
    // this.scrollEvent.infinit.set(this.fetch, 500)
    // set get
    target: null,
    set(fn, delay) {
      this.target = fn;

      scrollEvent._throttle(this.handler, delay);
    },
    _getCurrentScrollPercentage() {
      return (
        ((window.scrollY + window.innerHeight) / document.body.clientHeight) *
        100
      );
    },
    handler() {
      const currentScrollPercentage = this._getCurrentScrollPercentage();

      if (currentScrollPercentage > 90) {
        console.log(this.target);
        return this.target;
      }
    }
  }

  // infinitScroll._throttle(loadContent(this.fetch), 500);
};
