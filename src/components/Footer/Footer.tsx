import react from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './Footer.css';
const Footer = () => {
    const navigate = useNavigate()
    const goToHome = () => {
        navigate('/')
    }
    const goToDocs = () => {
        navigate('/docs')
    }
    const goToServices = () => {
        navigate('/services')
    }
    return (
        <div className='container-fluid mt-5 footer-height'>
            <div className='row anchor-tags'>
                <hr />
                <div className='col-sm-12 col-md-3'>
                    <a onClick={goToHome} className="cursor">Home</a><br />
                    <a className="cursor" href="/docs">Documentation</a>
                </div>
                <div className='col-sm-12 col-md-3'>
                    <a onClick={goToServices} className="cursor">API Explorer</a>
                </div>
                <div className='col-sm-12 col-md-3'>
                    <a>Support</a><br />
                    <a onClick={goToServices} className="cursor">Get Started</a><br />
                    <p>API Terms of use</p>
                </div>
                <div className='col-sm-12 col-md-3'>
                    <p>Our social Network</p>
                    <div className='d-flex justify-content-center'>
                        {/* <a href="https://twitter.com/SPL_KSA_online" id="aTwitter" target="_blank" title="Follow us on twitter"></a> */}
                        <a href="http://www.youtube.com/user/saudipostch" id="aYoutube" target="_blank" title="Watch our videos on youtube" className='icons icon-youtube'></a>
                        <a href="https://twitter.com/SPL_KSA_online" id="aTwitter" target="_blank" title="Follow us on twitter" className='icons icon-twitter'></a>
                        <a href="https://www.facebook.com/SPL.KSA.online" id="aFacebook" target="_blank" title="Join us with facebook" className='icons icon-facebook'></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;