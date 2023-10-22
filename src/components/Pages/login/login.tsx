import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import './login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LogIn = () => {
    const navigate = useNavigate();
    const { login, logout } = useAuth();
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [passwordType, setPasswordType] = useState("password");

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    useEffect(() => {
        logout()
    }, [])

    const goToSignUp = () => {
        navigate("/signup")
    }
    const submitForm = (e: any) => {
        e.preventDefault();
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!email) {
            setErrorEmail('Field required')
        } else if (!emailRegex.test(email)) {

            setErrorEmail('invalid address')
        }
        if (!password) {
            setErrorPassword('Field required')
        } else if (!passwordRegex.test(password)) {
            setErrorPassword('Please Enter 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
        }
        if (email && emailRegex.test(email) && passwordRegex.test(password) && password) {
            fetch("http://localhost:3001/user")
                .then(response => response.json())
                .then(data => {
                    const accessToken = data.token;
                    const expiresIn = data.expires_in;
                    login(accessToken, expiresIn);
                    if (data.code === 200) {
                        navigate('/')
                    }
                }).catch(error => console.log(error))

        }
    }
    return (
        <div className='container login-body'>
            <div className='row justify-content-center mt-5'>
                <div className='col-sm-12'>
                    <h2 className='text-center'>Sign in</h2>
                    <p className='text-center'>Not a member yet?<a onClick={goToSignUp} className="signup-btn">Sign up now</a></p>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-sm-4'>
                    <p>Sign in with your username and password</p>
                    <p>If you are an Administrator you must sign in here</p>
                    <form onSubmit={submitForm}>
                        <div className='form-group'>
                            <label htmlFor="username-input">Email</label><br />
                            <input id="username-input" onChange={(e: any) => setEmail(e.target.value)} className={`form-control ${errorEmail ? 'error-input' : ''} `} type="text" placeholder='Email' value={email} />
                            {errorEmail && (<p className='error-message'>{errorEmail}</p>)}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password-input">Password</label><br />
                            <div className='input-container-password'>
                                <input id="password-input" type={passwordType} onChange={(e: any) => setPassword(e.target.value)} className={`form-control ${errorPassword ? 'error-input' : ''} `} placeholder='Password' value={password} />
                                <span className="input-icon-password" onClick={togglePassword}>
                                    {passwordType === 'password' ? (
                                        <i className="bi bi-eye"></i>
                                    ) : (
                                        <i className="bi bi-eye-slash"></i>
                                    )}
                                </span>
                            </div>
                            {errorPassword && (<p className='error-message'>{errorPassword}</p>)}
                        </div>
                        <div className='form-group mb-4 mt-4'>
                            <input id="remember" type="checkbox" />
                            <span>Remember me on this computer</span>
                        </div>
                        <div className='form-group button-space'>
                            <a href="#">Forgot your password?</a>
                            <input type="submit" id="signinButton" value="Sign in" className="btn btn-primary pull-right" />
                        </div>

                    </form>
                </div>
            </div>
            {/* <hr/> */}
        </div>
    )
}
export default LogIn;