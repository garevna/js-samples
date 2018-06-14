function getCurrentPostComments ( postId ) {
        var res = []
        for ( var x in comments ) {
                if ( comments [ x ].postId === postId ) {
                        res.push ({
                                autor: users [ comments [ x ].author ].name,
                                text: comments [ x ].text
                        })
                }
        }
        return res
}
