import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider.js';
import Loading from '../Loading.js';

export default function PostDetails(props){
    const history = useHistory()
    const { loading } = useContext(UserContext)

    return(
        <>
        { loading ? 
            <Loading/>
            :
            <>
                <p> {props.test} </p>
                <h1
                onClick={() => history.goBack()}
                style={{cursor: 'pointer'}}
                > back </h1>
            </>
        }
        </>
    )
}