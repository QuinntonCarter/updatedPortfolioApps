import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/Navbar.js';
import Auth from './components/Auth.js';
import Main from './components/Main.js';
import Profile from './components/Profile.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import PostDetails from './components/PostDetails.js';

// import Loading from './Loading.js';

import { UserContext } from './components/context/UserProvider.js';

function App() {
  const {
      token,
      logout,
      loading 
    } = useContext(UserContext);

  return (
    <>
      {token && <Navbar logout={logout} token={token}/>}
      <div className="app container">
            <Switch>
              <Route
              exact path='/'
              render={()=> token ? <Redirect to='/main'/>  : <Auth/> }
              />

              <ProtectedRoute
              path='/main'
              component={Main}
              redirectTo='/'
              token={token}
              loading={loading}
              />
              
              <ProtectedRoute
              exact path='/profile'
              component={Profile}
              redirectTo='/'
              token={token}
              loading={loading}
              />

              <ProtectedRoute
              // OR statement is beta, may need to set ternary on PostDetails component
                path={'/posts/:postId'}
                component={PostDetails}
                redirectTo='/'
                token={token}
                loading={loading}
              />

              {/* <ProtectedRoute
                path='/posts/:postId/comments/:commentId'
                component={}
                redirectTo='/'
                token={token}
                loading={loading}
              /> */}
          </Switch>
      </div>
  </>
  )
}

export default App;