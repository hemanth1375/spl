import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
const SignUp = () => {
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [firstName, setFirstName] = useState<any>();
    const [lastName, setLastName] = useState<any>();
    const [mobileNum, setMobileNum] = useState<any>();
    const [emailError, setEmailError] = useState<any>();
    const [passwordError, setPasswordError] = useState<any>();
    const navigate = useNavigate();
    const submitForm = (e: any) => {
        e.preventDefault()
        var userData = {
            email, password, firstName, lastName, mobileNum
        }
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        if (!email) {
            setEmailError('Required Field')
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid Email address')
        }
        if (!password) {
            setPasswordError('Field required')
        } else if (!passwordRegex.test(password)) {
            setPasswordError('Please Enter 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character')
        }
        if (email && emailRegex.test(email) && password && passwordRegex.test(password)) {
            console.log(userData)
        }
    }
    const goToSignin = () => {
        navigate('/login')
    }
    return (
        <div className='container signup-body'>
            <div className='row mt-5'>
                <div className='col-sm-12'>
                    <h2 className='text-center'>Sign Up</h2>
                    <p className='text-center'>Already a member?<a onClick={goToSignin} className="signin-btn">Sign in</a></p>
                </div>
            </div>

            <div className='row justify-content-center'>
                <div className='col-sm-4'>
                    <p>Create a new API Management account</p>
                    <form onSubmit={submitForm}>
                        <div className='form-group'>
                            <label htmlFor="username-input">Email</label><br />
                            <input id="username-input" onChange={(e: any) => setEmail(e.target.value)} className={`form-control ${emailError ? 'error-input' : ''}`} type="text" placeholder='Email' value={email} />
                            {emailError && (<p className='user-input-error'>{emailError}</p>)}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password-input">Password</label><br />
                            <input id="password-input" onChange={(e: any) => setPassword(e.target.value)} className={`form-control ${passwordError ? 'error-input' : ''}`} type="password" placeholder='Password' value={password} />
                            {passwordError && (<p className='user-input-error'>{passwordError}</p>)}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="confirm-password-input">Confirm Password</label><br />
                            <input id="confirm-password-input" className='form-control' type="password" placeholder='Confirm Password' />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="first-name">First name</label><br />
                            <input id="first-name" onChange={(e: any) => setFirstName(e.target.value)} className='form-control' type="text" placeholder='First name' value={firstName} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="last-name">Last name</label><br />
                            <input id="last-name" onChange={(e: any) => setLastName(e.target.value)} className='form-control' type="text" placeholder='Last name' value={lastName} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="mobile-num">Mobile number</label><br />
                            <input id="mobile-num" onChange={(e: any) => setMobileNum(e.target.value)} className='form-control' type="number" placeholder='Mobile number' value={mobileNum} />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="national-id">National Id</label><br />
                            <input id="national-id" className='form-control' type="text" placeholder='National Id' />
                        </div>
                        <div className='form-group mt-4'>

                            <input type="submit" id="signupButton" value="Sign up" className="btn btn-primary" />
                        </div>
                        {/* <button id="login-button" type="submit" className='btn btn-primary'>
                            Sign In
                        </button> */}
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SignUp;