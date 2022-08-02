import './style.css';

const fadeUbObserverCallback = (els) => {
  els.forEach((el) => {
    if (el.isIntersecting) {
      el.target.classList.add('faded');
      fadeUpObserver.unobserve(el.target);

      el.target.addEventListener(
        'transitionend',
        () => {
          el.target.classList.remove('fade-up', 'faded');
        },
        { once: true }
      );
    }
  });
};

const fadeUpObserver = new IntersectionObserver(fadeUbObserverCallback, { threshold: 0.6 });

document.querySelectorAll('.fade-up').forEach((item) => {
  fadeUpObserver.observe(item);
});
