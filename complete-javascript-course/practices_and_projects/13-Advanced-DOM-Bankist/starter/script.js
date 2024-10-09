'use strict';

//// Modal window ////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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
