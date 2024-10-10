'use strict';

//// Elements ////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

//// Modal window ////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//// Implementing smooth scroll ////

btnScrollTo.addEventListener('click', function (e) {
  // geting coordinates

  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  // 참고

  // console.log(e.target.getBoundingClientRect());
  // console.log('Current scroll (X/Y)', window.scrollX, scrollY);
  // console.log(
  //   'height/width vidwport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // scrolling (old-school ways)

  // window.scrollTo(
  //   s1coords.left + window.scrollX, // 뷰포트에서 보이는 위치 + 이미 스크롤된만큼의 좌표값 -> 스크롤 위치와 관계없는 절대적인 위치 지정
  //   s1coords.top + window.scrollY // 뷰포트에서 보이는 위치 + 이미 스크롤된만큼의 좌표값 -> 스크롤 위치와 관계없는 절대적인 위치 지정
  // );

  window.scrollTo({
    left: s1coords.left + window.scrollX, // 뷰포트에서 보이는 위치 + 이미 스크롤된만큼의 좌표값 -> 스크롤 위치와 관계없는 절대적인 위치 지정
    top: s1coords.top + window.scrollY, // 뷰포트에서 보이는 위치 + 이미 스크롤된만큼의 좌표값 -> 스크롤 위치와 관계없는 절대적인 위치 지정
    behavior: 'smooth',
  });

  // scrolling (modern way. only works in modern browsers)

  section1.scrollIntoView({ behavior: 'smooth' });
});

//// Page navigation with smooth scrolling ////

// W/O event delegation: it works, but not efficient especially when there are lots of elements to be attached with event handlers

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href'); // getting relative url, not absolute one
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// WITH event delegation

// 1. Add event listener to the common parent element
// 2. Identify the element from which the event originated
// 3. Match the functionality we want to the element from NO.2

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href'); // getting relative url, not absolute one
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//// Tabbed component ////

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if (!clicked) return;

  // remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // activate tab
  clicked.classList.add('operations__tab--active');

  // activate content area
  console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//// Menu fade animation ////

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing an "argument" into a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//// Sticky navigation ////
/*
const initalCoords = section1.getBoundingClientRect();
console.log(initalCoords);

window.addEventListener('scroll', function () {
  console.log(window.scrollY);

  if (this.window.scrollY > initalCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});
*/

//// Sticky navigation: with Intersection observer API ////

// whenever the obsereved element(section1) is intersecting the root(viewport) at the threshold(0.1), the callback function(obsCallback) is called
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//// Revealing elements on scroll ////

// reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//// Event propagation: capturing and bubbling ////
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;
console.log(randomColor(0, 255));

// e.target: where an event happened, e.currentTarget: where an event handler is attached
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener(
  'click',
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log('NAV', e.target, e.currentTarget);
  }
  // true: 3rd parameter for setting the handler to read event in the capturing phase, not in the bubbling phase
);
*/

//////////////////////////////////// Lecture //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

///////////////////// Selecting, Creating, and Deleting Elements //////////////////////
/*
//// selecting elements ////
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections); // nodelist 출력. 얘는 변동사항 실시간 반영 안됨

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons); // live html collection 출력. 얘는 변동사항 실시간 반영됨

console.log(document.getElementsByClassName('btn')); // live html collection 출력

//// creating and inserting elements ////
const message = document.createElement('div'); // create & store an element, but not yet in the DOM tree
message.classList.add('cookie-message');
// message.textContent = 'We us cookies for improved functionality and analytics.'
message.innerHTML =
  'We us cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

header.prepend(message); // inserting the element into our HTML(DOM) as the 1st child
header.append(message); // inserting(actually moving) the element into our HTML(DOM) as the last child
// !NOTE! it isn't inserted twice. only once. every DOM element is unique and can only exist in one place at a time. //
// copying an element and letting it exist at several places
// header.append(message.cloneNode(true));

// adding an element before or after another as a sibling
// header.before(message);
// header.after(message);

//// deleting elements ////
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message); // used to be this way
  });

/////////////////////////// Styles, Attributs and Classes ////////////////////////////

//// styles ////
message.style.backgroundColor = `#37383d`;
message.style.width = `120%`;

console.log(message.style.height); // nothing printed: height is not written as a in-line css.
console.log(message.style.backgroundColor); // background color printed

// getComputedStyle: css에 작성했는지와 관계없이, 화면에 출력되고 있는 스타일의 계산값을 알려줌
console.log(getComputedStyle(message)); // prints all of the properties
console.log(getComputedStyle(message).color); // prints color only
console.log(getComputedStyle(message).height);

// 현재 화면에 출력되는 요소 높이에 일정 높이를 더해보자
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// working with CSS variables
document.documentElement.style.setProperty(`--color-primary`, 'orangered');

//// attributes ////
// reading attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// setting attributes
logo.alt = 'Beautiful minimalist logo';
console.log(logo.alt);

// working with non-standard attributes
console.log(logo.designer); // undefined
console.log(logo.getAttribute('designer')); // Jonas

logo.setAttribute('company', 'Bankist');
console.log(logo.getAttribute('company')); // Bankist

// getting absolute and relative url
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.twitter-link');
console.log(link.href);
console.log(link.getAttribute('href')); // in this case they're both the same but anyway...

const link2 = document.querySelector('.nav__link--btn');
console.log(link2.href);
console.log(link2.getAttribute('href'));

//// data attributes ////
console.log(logo.dataset.versionNumber);

//// classes ////
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not 'includes'

// we can set a classname like this, but DON'T DO THIS
// logo.className = 'jonas';
*/

//////////////////////// Types of events and event handlers /////////////////////////
/*
const h1 = document.querySelector('h1');

// old-school
// h1.onmouseenter = function (e) {
//   alert('addEventListener: Great! You are reading the heading :D');
// };

// modern (and better): we can attach multiple functions to an event listener, and we can even remove an event listener
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');

  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

// 이런 것도 가능
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);
*/

////////////////////////////////// DOM traversing ///////////////////////////////////
/*
const h1 = document.querySelector('h1');

// Going downwards: selecting child elements
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: selecting parent elements
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going sideways: selecting siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

// example: working with all the siblings
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});
*/
