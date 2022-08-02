let currentIndex = 0;
let isMoving = false;

const sliderContainer = document.querySelector('[data-slideContainer]');
const slideBtns = document.querySelectorAll('[data-slideBtn]');
const slides = document.querySelectorAll('[data-slide]');
slides[slides.length - 1].classList.remove('pr-4');

const removeDisabledAttribute = (els) => els.forEach((el) => el.removeAttribute('disabled'));
const addDisabledAttribute = (els) => els.forEach((el) => el.setAttribute('disabled', 'true'));

const handleSlideBtnClick = (event) => {
  if (isMoving) return;
  isMoving = true;

  event.currentTarget.id === 'prev' ? currentIndex-- : currentIndex++;

  sliderContainer.dispatchEvent(new Event('sliderMove'));
};

slideBtns.forEach((btn) => btn.addEventListener('click', handleSlideBtnClick));

sliderContainer.addEventListener('sliderMove', () => {
  sliderContainer.style.transform = `translateX(-${currentIndex * slides[0].clientWidth}px)`;
  removeDisabledAttribute(slideBtns);

  currentIndex === 0 && addDisabledAttribute([slideBtns[0]]);
  currentIndex === slides.length - 1 && addDisabledAttribute([slideBtns[1]]);
});

sliderContainer.addEventListener('transitionend', () => (isMoving = false));

document.querySelectorAll('[data-slide] img').forEach((img) => (img.ondragstart = () => false));

const slideObserver = new IntersectionObserver(
  (slide) => {
    if (slide[0].isIntersecting) {
      addDisabledAttribute([slideBtns[1]]);
    }
  },
  { threshold: 0.75 }
);

slideObserver.observe(slides[slides.length - 1]);
