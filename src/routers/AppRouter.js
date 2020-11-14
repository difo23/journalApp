import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,

} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRouters';
import { PublicRoute } from './PublicRouters';


export const AppRouter = () => {


    const dispatch = useDispatch();

    const [cheking, setcheking] = useState(true);

    const [isLoggedIn, setisLoggedIn] = useState(false)



    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {

            if (user?.uid) {

                dispatch(
                    login(user.uid, user.displayName)
                );
                setisLoggedIn(true)

            } else {
                setisLoggedIn(false);
            }


            setcheking(false);

        })
    }, [dispatch, setcheking, isLoggedIn])


    if (cheking) {
        return (
            <div className="auth__main">
                <div className="spinner meter"></div>
            </div>
        )
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                </Switch>
            </div>
        </Router>
    )
}
