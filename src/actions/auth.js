import { types } from '../types/types';

import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';

export const startLoginEmailWithPassword = (email, password) => {
    return (dispatch) => {

        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))

        }).catch(error => console.log(error))

    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
            user.updateProfile({ displayName: name })
            console.log(user)
            dispatch(login(user.uid, user.displayName))
        }).catch(error => console.warn(error))
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => ({

    type: types.login,
    payload: {
        uid,
        displayName
    }

})