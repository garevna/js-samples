/* you should write the code of function  getCurrentPostComments */

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
    text: 'Imagine we can encapsulate these secondary responsibilities in functions.'
  },
  7891452: {
    author: 28419,
    text: `For creating these images, you could use graphic design tools like Adobe Illustrator, Canva, or even online services that provide customizable icons and graphics.
           If you prefer hand-drawn style graphics, apps like Procreate or drawing tablets with appropriate software could be helpful.
           Make sure the images are vibrant, modern, and use bold colors to appeal to a younger audience.`
  },
  7891453: {
    author: 28419,
    text: `The browser provides a set of Web APIs, which include the event handling mechanisms often referred to as the Event Loop and Event Handling APIs.
           These APIs facilitate the interaction between the browser's internal processes and the JavaScript engine, enabling the management of events like user interactions, network requests, and timers.`
  },
  7891454: {
    author: 14587,
    text: `The simplest example of a browser API is the global object's setTimeout method.
           With it, we pass the browser a callback and specify how many milliseconds before this callback should go into the task queue.
           After that, the engine "washes its hands" because the callback is in the safe hands of the browser API.
           After the specified time, the browser puts the callback into the task queue, and its job is done.
           From the task queue, the engine pulls this callback into the call stack if it's free.`
  }
}
var comments = {
  91078454: {
    postId: 7891451,
    author: 28419,
    text: 'The static String.fromCharCode() method returns a string created from the specified sequence of UTF-16 code units.'
  },
  91078455: {
    postId: 7891451,
    author: 41457,
    text: `Functions are like the muscles of JS. Everything here revolves around functions.
           So, code can only run if it's "wrapped" in a function.
           Why? Because to execute code, you first need to create an execution context, which will go into the call stack.
           That's why it's called the call stack.
           When you're called, your execution context is created, put into the stack, and your code runs.`
  },
  91078457: {
    postId: 7891452,
    author: 41457,
    text: `There are two ways for a function to get "called."
           The first is the "main entrance," where you're called directly from the main flow (which itself is a function).
           The second is the "back door," where you're not just a function, but a callback.
           Then you go through the Event Loop.
           This means you're tied to an event.
           You'll be called only if that specific event happens.
           This is your shot to get into the call stack.`
  },
  91078458: {
    postId: 7891452,
    author: 14587,
    text: 'The Element.namespaceURI read-only property returns the namespace URI of the element, or null if the element is not in a namespace.'
  }
}

function getCurrentPostComments (postId) {
  var res = []
  return res
}

console.log(getCurrentPostComments(7891451))
