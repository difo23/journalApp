import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { startLoading, setError, removeError, finishLoading } from './ui'

export const startLoginEmailWithPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(removeError())
            dispatch(finishLoading())
        }).catch(error => {
            console.log('user no log', error);
            dispatch(setError('No estas registrado'))
            dispatch(finishLoading())
        })

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
        dispatch(startLoading())
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {

                dispatch(
                    login(user.uid, user.displayName)
                )

                dispatch(finishLoading())
                dispatch(removeError())
            }).catch(error => {
                console.log('user no log', error);
                dispatch(setError('No estas registrado'))
                dispatch(finishLoading())
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