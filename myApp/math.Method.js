let sum = (a, b) => {
  if (typeof a != 'number' || typeof b != 'number') {
    return 'Please enter numbers';
  }
  return a + b;
};

let square = (a) => {
 if (typeof a != 'number' || !a) {
    return 'Please Enter a Number';
  }
  return a * a;
};

console.log(square());
module.exports = {
  sum,
  square,
};
