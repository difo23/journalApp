import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {


    const dispatch = useDispatch();
    const state = useSelector(state => state)


    const [values, handleInputChange] = useForm({
        name: 'username',
        email: 'correo@email.com',
        password: 'password',
        password2: 'password',

    })


    const { name, email, password, password2 } = values;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }

    }


    const isFormValid = () => {


        if (name.trim().length === 0) {
            dispatch(setError('Name is required'))

            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not email'))

            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('No son iguales los pass'))

            return false;
        }
        dispatch(removeError('No son iguales los pass'))
        return true;
    }
    return (
        <>
            <h3 className="auth__title">Register</h3>

            {state.ui.msgError != null && <h4 className="auth__alert-error">{state.ui.msgError}</h4>}


            <form onSubmit={handleRegister}>

                <h4 className=".auth__alert-error"></h4>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}

                />

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

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"

                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
