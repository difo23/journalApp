import { types } from '../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { startLoading, setError, removeError, finishLoading } from './ui'
import Swal from 'sweetalert2'


export const startLoginEmailWithPassword = (email, password) => {
    return (dispatch) => {

        dispatch(startLoading())

        firebase.auth().signInWithEmailAndPassword(email, password).then(({ user }) => {
            dispatch(login(user.uid, user.displayName))
            dispatch(removeError())
            dispatch(finishLoading())
        }).catch(e => {
            console.log('user no log', e);
            dispatch(setError(e.message))
            dispatch(finishLoading())
            Swal.fire('Error', e.message, 'error')
        })

    }
}


export const startRegisterWithEmailPasswordName = (email, password, name) => {

    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(async ({ user }) => {
            user.updateProfile({ displayName: name })
            console.log(user)
            dispatch(login(user.uid, user.displayName))
        }).catch(e => {
            console.warn(e)
            Swal.fire('Error', e.message, 'error')
        })
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
            }).catch(e => {
                console.log('user no log', e);
                dispatch(setError(e.message))
                dispatch(finishLoading())
                Swal.fire('Error', e.message, 'error')
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


export const startLogout = () => {

    return (dispatch) => {

        firebase.auth().signOut().then(() => {
            dispatch(logout());
        })


    }
}


export const logout = () => ({
    type: types.logout
})