import react from 'react';
import './Home.css';
import { useAuth } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const { accessToken, storedToken } = useAuth();
    const navigate = useNavigate();
    const goToApiExplorerPage = () => {
        navigate('/services')
    }
    console.log(storedToken)
    return (
        <div>
            <div className="col-sm-12 home-text">
                <h1>Unleash Your Business</h1>
                <p>Address Search. Address Validation. Look Ups And More</p>
                <button className='btn btn-lg btn-primary getStart-btn' onClick={() => { goToApiExplorerPage() }}>Get Started!</button>
            </div>
            <div className='container mt-4'>
                <div className='row'>
                    <div className='d-flex col-sm-12 col-md-4 justify-content-center'>
                        <div className=" card-text">
                            <div>
                                <img src={require("../../../assets/images/Home-gov.png")} />
                            </div>
                            <h3>Government</h3>
                            <div className="list-card-text">
                                <p>National Address APIs provide government agencies with data services to leverage their internal systems. The API assist government agencies in acquiring Saudi Arabia maps which could be utilised for urban planning, building economic or industrial cities, etc. In addition, the API provide location based information to these organisations.</p>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex col-sm-12 col-md-4 justify-content-center'>
                        <div className=" card-text">
                            <div>
                                <img src={require("../../../assets/images/Home-business.png")} />
                            </div>
                            <h3>Business</h3>
                            <div className="list-card-text">
                                <p>National Address API empower business to extend their existing application and platform services to their customers. The API was developed to catapult the eCommerce and online transaction scene in Saudi Arabia. this publicly available for all business sectors.</p>
                            </div>
                        </div>
                    </div>

                    <div className='d-flex col-sm-12 col-md-4 justify-content-center'>
                        <div className=" card-text">
                            <div>
                                <img src={require("../../../assets/images/Home-developer.png")} />
                            </div>
                            <h3>Developers</h3>
                            <div className="list-card-text">
                                <p>The API allows developer who are looking to develop their own utility ,add-on and plugin to use the address search, address validation services, etc. provided by the platform. Developers can benefit from the tremendous and continuously growing location database to develop tools that can be used in their applications.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='d-flex col-sm-12 justify-content-center'>
                        <ul className='list-images d-flex'>
                            <li>
                                <img src={require("../../../assets/images/logo-1.jpg")} />
                            </li>
                            <li>
                                <img src={require("../../../assets/images/logo-2.jpg")} />
                            </li>
                            <li>
                                <img src={require("../../../assets/images/logo-3.jpg")} />
                            </li>
                            <li>
                                <img src={require("../../../assets/images/logo-4.jpg")} />
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
            {/* <hr/> */}
        </div>
    )
}
export default Home;