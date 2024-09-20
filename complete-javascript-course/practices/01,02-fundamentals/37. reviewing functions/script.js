'use strict';

const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const yearsUntilRetirement = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years.`);
        return retirement; // return 이후에는 함수에서 exit 한다.
    } else {
        console.log(`${firstName} has already retired`);
        return -1;
    }

    // return `${firstName} retires in ${retirement} years.`
}

console.log(yearsUntilRetirement(1991, `Jonas`));
console.log(yearsUntilRetirement(1950, `Mike`));