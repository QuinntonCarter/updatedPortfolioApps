import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from './context/UserProvider.js';
import { AppContext } from './context/AppProvider.js';
import Loading from '../Loading.js';

export default function PostDetails(){
    const history = useHistory();
    const { loading } = useContext(UserContext);
    const { selectedPost } = useContext(AppContext);

    return(
        <>
        { loading ? 
            <Loading/>
            :
            <div>
                {/* Match post id with post in DB and display <Posts/> component here..? */}
                <div className="postDetailsContent">
                    <p> </p>
                </div>
                <div className="postDetailsNavBar">
                    <h1
                    onClick={() => history.goBack()}
                    style={{cursor: 'pointer'}}
                    > back </h1>
                </div>
            </div>
        }
        </>
    )
}