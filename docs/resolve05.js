function getCurrentPostComments ( postId ) {
        var res = []
        for ( var x of comments ) {
                if ( x.postId === postId ) {
                        for ( var user of users ) {
                                
                        }
                        var user = -1
                        var index = 0
                        do {
                                user = users [ index ].userId === x.author ? index : user
                                index += 1
                        }
                        while ( index < users.length )
                        res.push ({
                                autor: user < 0 ? "anonymous" : users [ user ] .name,
                                text: x.text
                        })
                }
        }
        return res
}
