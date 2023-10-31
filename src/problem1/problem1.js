/* 
    # Task

    Provide 3 unique implementations of the following function in JavaScript.

    **Input**: `n` - any integer

    *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.

    **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`. 
*/

var sum_to_n_a = function (n) {
    // Use for loop
    if (n <= 1) {
      return n;
    } else {
      let sum = 0;
      for (let i = 1; i <= n; i++) {
        sum += i;
      }
      return sum;
    }
  };
  
  var sum_to_n_b = function (n) {
    // Use recursive algorithm
    if (n <= 1) {
      return n;
    } else {
      return n + sum_to_n_b(n - 1);
    }
  };
  
  var sum_to_n_c = function (n) {
    if (n <= 1) {
      return n;
    } else {
      // Generate a sequence of numbers
      // Since the array is initialized with `undefined` on each position,
      // the value of `v` below will be `undefined`
      return Array.from({ length: n }, (_, i) => i + 1).reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0);
    }
  };
  