*** STOP messing with CSS, pleb. implement functionality first ***

REVIEW:
- overhaul CSS styles
    + IMPLEMENT SASS

# *** Bugs ***
    ## + ** Fix sort delayed flip issue **
    + Fix date/slice issue in comment comp (?)
    + Fix post comment issue--content not displaying
# *** *** ***

GOALS:
- button component for postlist to toggle post views (and user/all view possibly)
- implement backend security features

IMPLEMENT:
- comment component
    + style it
- finish profileComponent
    X add user posts to this page
- finish postDetails component
- viewSortComponent for post view sorting
    + a new component that houses all buttons in postlist view
    + toggle sort view hook
    + .sort() can be appended onto posts.map()
X figure out display on frontend for comments.
X deleteComment function
X restrict comment deletion only if user._id === comment._authId can it be deleted
X add obj keys where missing
X timestamps, maybe on frontend or another way not in schema but

FUTURE DEV:
- post view sorting toolbar = include by votes
- usernames in thread headers link to user profiles
- replies are sub threads in threads like reddit
- checkbox delete functionality in userPosts view
    + maybe send ids into array and delete that array on function call
- nightmode/alt views

RESTYLE THIS

notes:
useEffect(()=> {
    async function checkPosts(){
        if(userState.allPosts.length)
    }
}, [userState.allPosts])