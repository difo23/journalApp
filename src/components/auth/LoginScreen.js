import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleLogin, startLoginEmailWithPassword } from '../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [values, handleInputChange] = useForm({
        email: 'lizandro23difo@gmail.com',
        password: '1234',

    })

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailWithPassword(email, password))
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>
          
            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={state.ui.loading}
                >
                    Login
                </button>


                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                        onClick={handleGoogleLogin}
                        disabled={state.ui.loading}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
