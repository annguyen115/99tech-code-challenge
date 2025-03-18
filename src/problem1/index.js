// Solution 1: Iterative approach using a loop
// Complexity: O(n)
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};


// Solution 2: Recursive approach
// Complexity: O(n)
var sum_to_n_b = function(n) {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
};


// Solution 3: Mathematical formula (Gauss' formula)
// Reference: https://letstalkscience.ca/educational-resources/backgrounders/gauss-summation
// Formula: total = (n * (n + 1)) / 2 (https://letstalkscience.ca/sites/default/files/2021-01/gauss_summation_4.png)
// Complexity: O(1)
var sum_to_n_c = function(n) {
    return (n * (n + 1)) / 2;
};

const TEXT_NUMBER= 5;

// Testing
console.log(`solution 1 result: ${sum_to_n_a(TEXT_NUMBER)}`);
console.log(`solution 2 result: ${sum_to_n_b(TEXT_NUMBER)}`);
console.log(`solution 3 result: ${sum_to_n_c(TEXT_NUMBER)}`);
// => result should be 15 (1 + 2 + 3 + 4 + 5)

// Conclusion: The last solution is the best solution since it runs in O(1) time.