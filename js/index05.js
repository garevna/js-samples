var users = [
  {
    userId: 14587,
    name: 'Ivan',
    email: 'ivan78@gmail.com'
  },
  {
    userId: 28419,
    name: 'Georg',
    email: 'georg.klep@gmail.com'
  },
  {
    userId: 41457,
    name: 'Stephan',
    email: 'stephan.borg@gmail.com'
  }
]

var posts = [
  {
    postId: 7891451,
    author: 14587,
    text: 'Imagine we can encapsulate these secondary responsibilities in functions'
  },
  {
    postId: 7891452,
    author: 28419,
    text: 'Typed arrays provide a way to handle binary data as efficiently as arrays work in C.'
  },
  {
    postId: 7891453,
    author: 28419,
    text: 'Typed arrays are raw memory, so JavaScript can pass them directly to any function without converting the data to another representation.'
  },
  {
    postId: 7891454,
    author: 14587,
    text: 'Typed arrays are serously faster than normal arrays, for passing data to functions that can use raw binary data.'
  }
]

var comments = [
  {
    commentId: 91078454,
    postId: 7891451,
    author: 28419,
    text: `The static String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units.`
  },
  {
    commentId: 91078455,
    postId: 7891451,
    author: 41457,
    text: 'ECMAScript 2017 added the Object.entries() method to objects.'
  },
  {
    commentId: 91078457,
    postId: 7891452,
    author: 41457,
    text: 'ES6 (JavaScript 2015) is supported in all modern browsers since June 2017.'
  },
  {
    commentId: 91078458,
    postId: 7891452,
    author: 14587,
    text: `The Element.namespaceURI read-only property returns the namespace URI of the element, or null if the element is not in a namespace`
  }
]

function getCurrentPostComments (postId) {
  var res = []
        
  return res
}

console.log(getCurrentPostComments(7891451))
