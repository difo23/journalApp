import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';


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


                    <Route
                        path="/auth"
                        component={AuthRouter}
                    />
                    <Route
                        exact
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />


                </Switch>
            </div>
        </Router>
    )
}
