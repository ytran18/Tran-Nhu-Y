// Problem 1: Three ways to sum to n

// use for loop
var sum_to_n_a = function(n) {
    let sum = 0;
    let absN = Math.abs(n); // use absolute if n is negative

    for (let i = 1; i <= absN; i++) {
        sum += i * Math.sign(n);
    };

    return sum;
};

// use recursion
var sum_to_n_b = function(n) {
    let absN = Math.abs(n); // use absolute if n is negative
    if (absN === 1) return n;
    return n + sum_to_n_b(n - Math.sign(n));
};


// use arithmetic progression formula
var sum_to_n_c = function(n) {
    let absN = Math.abs(n); // use absolute if n is negative
    return ((absN * (absN + 1)) * Math.sign(n)) / 2;
};