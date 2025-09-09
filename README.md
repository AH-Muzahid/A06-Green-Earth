# Green Earth Project – JavaScript ES6 Concepts

## 1. What is the difference between `var`, `let`, and `const`?

- **`var`**:  
  - It is function scope or global scope variable.
  - Can  be reassigned a new value.
  - Initialized as `undefined`. So, it can be used before declaration without any error.
- **`let`**:  
  - Block scoped variable.
  - Can be reassigned a new value.
  - Not initialized. So, use it before declaration show an `ReferenceError`.
- **`const`**:  
  - Block scoped variable.
  - Cannot be updated or reassigned a new value..
  - Must be initialized at declaration.
  - For objects/arrays, the reference cannot change, but properties/elements can be modified.

## 2. What is the difference between `map()`, `forEach()`, and `filter()`?

- **`map()`**:  
  - The method creates a new array, which contains the result of applying a function to each element of the original array.
  - Does not modify the original array.
  - It can chain other methods like `filter()` or `reduce()` after it.
- **`forEach()`**:  
  - The method executes a specific function for each element of the array.
  - It is used to perform some action on each item in the array
  - Does not return anything or returns `undefined`.
  - It cannot be chained with any other method.
- **`filter()`**:  
  - This method creates a new array containing only those elements that meet a specific condition..
  - This condition is determined by a function that returns `true` or `false`.
  - Does not modify the original array.
  
## 3. What are arrow functions in ES6?

- Short syntax: It is shorter and simpler way to write functions using the `=>` syntax.
- They do **not** have their own `this`, `arguments`, or `super`.
- It's often used as callback functions.

**Example:**
```javascript
const add = (a, b) => a + b;
```

## 4. How does destructuring assignment work in ES6?

- Destructuring assignment is a quick and easy way  to unpack values from arrays or properties from objects into separate variables.

**Array destructuring:**
```js
const [a, b] = [1, 2];
// a = 1, b = 2
```

**Object destructuring:**
```js
const {name, age} = {name: 'Muzahid', age: 21}; 
// name = 'Alice', age = 25
```

## 5. Explain template literals in ES6. How are they different from string concatenation?
**Template literals are strings enclosed in backticks (`), which allow strings to be created more easily and with more features than string concatenation**

- Template literals use backticks (`` ` ``) instead of quotes.
- Allow embedded expressions using `${}`.
- Support multi-line strings, without the need for the `\n` character.

**Example:**
```js
const name = 'Muzahid';
const greeting = `Hello, ${name}!`;
```