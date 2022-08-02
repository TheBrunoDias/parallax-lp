import './style.css';

const elements = [
  { id: 1, title: 'Ocean Wanders' },
  { id: 2, title: 'Waterfall Cave' },
  { id: 3, title: 'Rainbow Falls' },
  { id: 4, title: 'Canyon Peaks' },
  { id: 5, title: 'Montain Inlet' },
  { id: 6, title: 'Angel Cliffs' },
  { id: 7, title: 'Aurora Sound' },
  { id: 8, title: 'Ice Meadows' },
];

const sliderContainer = document.querySelector('[data-slideContainer]');

elements.forEach((slide) => {
  var el = document.createElement('div');
  el.setAttribute('data-slide', '');
  el.className = 'relative w-full xs:w-auto flex-grow flex-shrink-0 xs:basis-96 pr-4';
  el.innerHTML = `<img
    class="object-cover h-full [@media(hover:hover)]:grayscale hover:grayscale-0 transition-all peer"
    src="./images/slider-${slide.id}.jpg"
    alt="${slide.title}"
    />
    <p
    class="absolute bottom-4 left-4 px-4 py-2 font-bold bg-bkg text-lg pointer-events-none tracking-wide [@media(hover:hover)]:opacity-0 peer-hover:opacity-100 transition-opacity"
    >
    ${slide.title}
    </p>`;

  sliderContainer.appendChild(el);
});

let currentIndex = 0;
let isMoving = false;
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

const contactForm = document.querySelector('#contact-form');
const contactButton = document.querySelector('#contact-btn');
const contactInput = document.querySelector('#email');

const fakeSendEmail = (email) => {
  return new Promise((resolve) => setTimeout(resolve, 2000));
};

const contactBtnOptions = {
  pending: `
  <svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="60.1" x2="173.3" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="195.9" y1="195.9" x2="173.3" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="195.9" x2="82.7" y2="173.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="60.1" y1="60.1" x2="82.7" y2="82.7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line></svg>
  <span class="uppercase tracking-wide animate-pulse">Sending...</span>
  `,
  success: `
  <span class="uppercase tracking-wide">Thank you!</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M32,104H80a0,0,0,0,1,0,0V208a0,0,0,0,1,0,0H32a8,8,0,0,1-8-8V112A8,8,0,0,1,32,104Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><path d="M80,104l40-80a32,32,0,0,1,32,32V80h61.9a15.9,15.9,0,0,1,15.8,18l-12,96a16,16,0,0,1-15.8,14H80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path></svg>
  `,
};

const handleFormSubmit = async (event) => {
  event.preventDefault();

  addDisabledAttribute([contactForm, contactButton]);
  contactButton.innerHTML = contactBtnOptions.pending;
  const userEmail = contactInput.value;
  contactInput.style.display = 'none';
  await fakeSendEmail(userEmail);
  contactButton.innerHTML = contactBtnOptions.success;
};

contactForm.addEventListener('submit', handleFormSubmit);

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
