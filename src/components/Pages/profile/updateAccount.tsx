import react, { useState } from 'react';
import './updateAccount.css';
const UpdateAccount=()=>{
    const [email,setEmail]=useState<any>();
    const [firstName,setFirstName]=useState<any>();
    const [lastName,setLastName]=useState<any>();
    const [mobileNum,setMobileNum]=useState<any>();
return(
    <div className='container'>
        <div className='row'>
            <div className='col-sm-8'>
                <h1>Update Account Information</h1>
                <form>
                <div className='form-group'>
                            <label htmlFor="username-input">Email</label><br/>
                            <input id="username-input" onChange={(e:any)=>setEmail(e.target.value)} className='form-control' type="text" placeholder='Email' value={email}/>
                        </div>
                       
                        <div className='form-group'>
                            <label htmlFor="first-name">First name</label><br/>
                            <input id="first-name" onChange={(e:any)=>setFirstName(e.target.value)} className='form-control' type="text"  placeholder='First name' value={firstName}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="last-name">Last name</label><br/>
                            <input id="last-name" onChange={(e:any)=>setLastName(e.target.value)} className='form-control' type="text"  placeholder='Last name' value={lastName}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="mobile-num">Mobile number</label><br/>
                            <input id="mobile-num" onChange={(e:any)=>setMobileNum(e.target.value)} className='form-control' type="number"  placeholder='Mobile number' value={mobileNum}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="national-id">National Id</label><br/>
                            <input id="national-id" className='form-control' type="text"  placeholder='National Id'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="national-id">Please Confirm the change by entering a password</label><br/>
                            <input id="password" className='form-control' type="text"  placeholder=''/>
                        </div>
                        <div style={{marginTop:"10px"}}>
                            <button className='update-btn'>Update Profile</button>
                            <button className='cancel-button'>cancel</button>
                        </div>
                </form>
            </div>
        </div>

    </div>
)
}
export default UpdateAccount;