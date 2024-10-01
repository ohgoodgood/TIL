'use strict';

////////////////// Default Parameters //////////////////

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers // ES6의 새로운 방식에서는, 기본값으로 어떠한 value도 다 넣을 수 있다. 그래서 (이 parameter 이전에 정의된) 다른 parameter를 동적 value로 쓸 수도 있다.
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000); // 위와 같이 동적 value 정의해 두었을 때, 'numPassengers' argument를 기본값으로 두고 싶으면 그냥 비워 둘 수는 없고 'undefined' 지정해 주어야 함
