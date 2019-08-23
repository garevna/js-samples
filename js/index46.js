const text = `Though the concept of a set has proven fruitful in mathematics, the prototype approach in some ways corresponds more closely to the way people seem to acquire knowledge from concrete situations. The difficulty with sets stems from their abstractness; people seem to be a lot better at dealing with specific examples first, then generalizing from them than they are at absorbing general abstract principles first, and later applying them in particular cases. Prototype systems allow creating individual concepts first, then generalizing them by saying what aspects of the concept are allowed to vary. Set-oriented systems require creating the abstract description of the set first, before individual instances can be installed as members\n
        In mathematics, sets are defined either by enumerating their members, or by describing the unifying principles that identify membership in the set. We can neither enumerate all the elephants, nor are we good at making definitive lists the essential properties of an elephant. Yet the major impetus for creating new concepts always seems to be experience with examples. If Clyde is our only experience with elephants, our concept of an elephant can really be no different than the concept of Clyde. After meeting other elephants, the analogies we make between concepts like Fred and Clyde serve to pick out the important characteristics of elephants\n
        Prototypes seem to be better at expressing knowledge about defaults. If we assert grayness as one of the identifying characteristics of membership in the set of elephants, we can't say that there are exceptional white elephants without risking contradictions. Yet it is easy to say that Fred, the white elephant, is just like Clyde, except that he is white. As Wittgenstein observed, it is difficult to say, in advance, exactly what characteristics are essential for a concept. It seems that as new examples arise, people can always make new analogies to previous concepts that preserve some of the "defaults" for that concept and ignore others`
ico = "https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/wink.png"

Notification.requestPermission(
    permission => permission === "granted" ? 
        spawnNotification ( text, ico, "garevna" ) : null
)
    
function spawnNotification( message, icoURL, title ) {
    var options = {
        body: message,
        icon: icoURL,
        badge: "https://cdn.glitch.com/a4e0a9fd-ea7b-47cf-b52a-48fd6359c559%2Fsmoke-monkey.gif"
    }
    var n = new Notification( title, options )
}
