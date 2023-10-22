import recat, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './changePassword.css';
const ChangePassword=()=>{
    const [password,setPassword]=useState<any>();
    const [newPassword,setNewPassword]=useState<any>();
    const [confirmPassword,setConfirmPassword]=useState<any>();
    const navigate=useNavigate();
    const goToProfile=(e:any)=>{
        e.preventDefault()
        navigate('/profile')
    }
return(
    <div className='container'>
        <div className='row mt-4'>
            <div className='col-sm-8'>
                <h1>Change Password</h1>
                <form  className='mt-5'>
                <div className='form-group mt-4'>
                            <label htmlFor="password">Password</label><br/>
                            <input id="password" onChange={(e:any)=>setPassword(e.target.value)} className='form-control' type="text" placeholder='password' value={password}/>
                        </div>
                       
                        <div className='form-group mt-4'>
                            <label htmlFor="new-password">New Password</label><br/>
                            <input id="new-password" onChange={(e:any)=>setNewPassword(e.target.value)} className='form-control' type="text"  placeholder='First name' value={newPassword}/>
                        </div>
                        <div className='form-group mt-4'>
                            <label htmlFor="confirm-password">Confirm Password</label><br/>
                            <input id="confirm-password" onChange={(e:any)=>setConfirmPassword(e.target.value)} className='form-control' type="text"  placeholder='Last name' value={confirmPassword}/>
                        </div>
                        
                        <div className='mt-5'>
                            <button className='save-btn'>save</button>
                            <button className='cancel-button' onClick={goToProfile}>cancel</button>
                        </div>
                </form>
            </div>
        </div>

    </div>
)
}
export default ChangePassword;