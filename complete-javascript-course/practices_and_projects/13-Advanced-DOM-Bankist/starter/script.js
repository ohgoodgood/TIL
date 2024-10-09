'use strict';

///////////////////////////////////////////////////////////////////////////////////////
// Modal window

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

//////////////////////////////////// Lecture //////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////

///////////////////// Selecting, Creating, and Deleting Elements //////////////////////

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
