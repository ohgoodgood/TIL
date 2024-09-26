'use strict';

// destructuring arrays
const [firstBook, secondBook] = books;

const [, , thirdBook] = books;

const ratings = [
  ['rating', 4.19],
  ['ratingsCount', 144584],
];
const [[, raing], [, ratingsCount]] = ratings;
