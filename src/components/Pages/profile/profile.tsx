import react, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { properties } from '../../../properties';
import { Host } from '../../../env.dev';
import { useAuth } from '../../../AuthContext';
import Failed from '../errorpage/Failed';

import * as Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
    const [limit, setLimit] = useState<number>(1000); // Default limit
    const [offset, setOffset] = useState<number>(0);
    const { accessToken, isAuthenticated ,storedToken,storedExpireTime} = useAuth();
    const [applicationList, setApplicationList] = useState<[]>();
    const [subscribeList, setSubscribeList] = useState<any>();
    const [cancel, setCancel] = useState<any>();
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    const [responseError, setResponseError] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()
    const goToApplicationRegisterPage = () => {
        navigate(`application/register`)
    }
    const goToAnalyticsPage = () => {
        navigate('analytics')
    }

    const getApplications = async () => {
        try {
            const response = await fetch(Host.host + `applications?sortBy=name&sortOrder=asc&limit=${limit}&offset=${offset}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            });
            let data;
            if (!response.ok) {
                setIsLoading(false);
                const errorData = await response.json();
                setResponseError({ 'message': errorData.description, 'code': errorData.code });
                //  throw new Error('Failed to fetch applications');
            } else {

                data = await response.json();
                setApplicationList(data.list); // Set the state here
                setIsLoading(false);
            }
            return data;
        } catch (error) {

            setIsLoading(false)
            // throw error; // Rethrow the error to be handled elsewhere if needed
            setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
        }
    }

    var subscriptionList: any[] = []

    const getSubscriptions = async (applicationLists: any) => {

        try {
            // const applicationLists = await getApplications(); // Fetch and set applicationList

            const fetchPromises = applicationLists?.map(async (item: any) => {
                try {
                    const response = await fetch(Host.host + `subscriptions?applicationId=${item.applicationId}&offset=${offset}&limit=${limit}`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'content-type': 'application/json'
                        }
                    });
                    if (!response.ok) {
                        setIsLoading(false);
                        const data: any = await response.json();
                        setResponseError({ 'message': data.description, 'code': data.code });
                    }
                    return await response.json();
                } catch (error) {
                    console.log(error);
                }
            });

            const subscriptionDataList = await Promise.all(fetchPromises);
            // Concatenate all subscription lists into one array
            subscriptionList = subscriptionDataList.flatMap((data) => data.list);

            setSubscribeList(subscriptionList)
        } catch (error) {
            console.log(error)

        }
    }

    const goToUpdateAccount = () => {
        navigate('/updateAccount')
    }
    const goToChangePassword = () => {
        navigate('/changepassword')
    }
    useEffect(() => {
        const fetchData = async () => {
            setCancel(false)
            const applicationsResponse: any = await getApplications();
            if (applicationsResponse) {
                setIsLoading(false)
                await getSubscriptions(applicationsResponse.list);
            }
        };
        // if(!isAuthenticated()){
        //     navigate('/login')
        // }else{
        if (!storedToken || !storedExpireTime) {
            // If there is no stored access token or expiration, redirect to login
            navigate('/login');
            return;
        }

        const expirationTime = parseInt(storedExpireTime, 10);
        if (Date.now() >= expirationTime) {
            // If the stored token is expired, redirect to login
            navigate('/login');
        } else {
            fetchData();
        }
        // fetchData();
    }, [isAuthenticated, cancel]);
    const cancelSubscription = (subsId: any) => {
        if (!storedToken || !storedExpireTime) {
            // If there is no stored access token or expiration, redirect to login
            navigate('/login');
            return;
        }

        const expirationTime = parseInt(storedExpireTime, 10);
        if (Date.now() >= expirationTime) {
            // If the stored token is expired, redirect to login
            navigate('/login');
        } else {
            fetch(Host.host + `subscriptions/${subsId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            }).then(response => console.log(response))
                .then(data => {
                    setCancel(true)
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className='profile-page-height'>
            <ToastContainer />
            {isLoading ? (
                <div className="loader-container">
                    <Loader.Bars color="lightgray" height={100} width={100} />
                </div>
            ) :
                (responseError ? <Failed data={responseError} /> :
                    <div className='container-fluid'>
                        <div className='row mt-4'>
                            <div className='col-sm-6'>
                                <h1>Profile</h1>
                            </div>
                            <div className='col-sm-6 d-flex justify-content-end align-items-center'>
                                <button className='change-btn' onClick={goToChangePassword}>Change Password</button>
                                <button className='change-btn2' onClick={goToUpdateAccount}><i className="bi bi-person-fill"></i>Change Account Information</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='col-sm-3'>
                                    <p>Email</p>
                                </div>
                                <div className='col-sm-3'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className='col-sm-3'>
                                    <p>Mobile Number</p>
                                </div>
                                <div className='col-sm-3'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className='col-sm-3'>
                                    <p>National Id</p>
                                </div>
                                <div className='col-sm-3'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className='col-sm-3'>
                                    <p>First name</p>
                                </div>
                                <div className='col-sm-3'>
                                    <p></p>
                                </div>
                            </div>
                            <div className='col-sm-12'>
                                <div className='col-sm-3'>
                                    <p>Last Name</p>
                                </div>
                                <div className='col-sm-3'>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-8'>
                                <p className='para-heading'>Your Subscriptions</p>
                            </div>
                            <div className='col-sm-4 d-flex justify-content-end'>
                                <button className='analytics-btn' onClick={goToAnalyticsPage}><i className="bi bi-bar-chart-fill"></i>Analytics reports</button>
                            </div>
                            </div>
                            <div className='row d-none d-md-block'>
                            <div className='d-flex'>
                                <p className='col-sm-6'><b>Subscription details</b></p>
                                <p className='col-sm-4'><b>Product</b></p>
                                <p className='col-sm-1'><b>state</b></p>
                                <p className='col-sm-1'><b>Action</b></p>
                            </div><hr />
                            </div>
                            {/* <div> */}
                            {subscribeList && subscribeList.map((item: any) => {

                                // if(item?.apiInfo?.type==="API_PRODUCT"){
                                return (<div className='row'>
                                    {/* <div className='d-flex' key={item.apiId}> */}
                                    <div className='d-md-none'>Subscription details</div>
                                    <div className='col-sm-12 col-md-6'>
                                        <p><b>Api Name:</b> <a className='product-name' href={`/services/${item.apiId}`}>{item.apiInfo.name}</a></p>
                                        <p><b>Primary key:</b></p>
                                        <p><b>secondary Key:</b></p>
                                    </div>
                                    <div className='d-md-none'>Product</div>
                                    <div className='col-sm-12 col-md-4'><a className='product-name' href={`/products/${item.applicationId}`}>{item.applicationInfo.name}</a></div>
                                    <div className='d-md-none'>State</div>
                                    <p className='col-sm-12 col-md-1'>{item.status}</p>
                                    <div className='d-md-none'>Action</div>
                                    <div className='col-sm-12 col-md-1'><button className='cancel-btn' onClick={() => cancelSubscription(item.subscriptionId)}><i className="bi bi-x"></i>cancel</button></div>
                                {/* </div> */}
                                <hr />
                                </div>)
                                // }

                            })}

                        {/* </div> */}
                        <div className='row'>
                            <div className='col-sm-8'>
                                <p className='para-heading'>Your Applications</p>
                            </div>
                            <div className='col-sm-4 d-flex justify-content-end'>
                                <button className='btn btn-success' onClick={goToApplicationRegisterPage}><i className="bi bi-plus"></i>Register application</button>
                            </div>
                            </div>
                            <div className='row d-none d-md-block'>
                            <div className='d-flex'>
                            <p className='col-sm-7'><b>Name</b></p>
                            <p className='col-sm-3'><b>category</b></p>
                            <p className='col-sm-2'><b>state</b></p>
                            </div>
                        </div><hr />
                        <div className='row'>
                            {applicationList?.map((item: any) => (
                                <div className='col-sm-12 d-flex' key={item.name}>
                                    <p className='col-sm-7'>{item.name}</p>
                                    <p className='col-sm-3'></p>
                                    <p className='col-sm-2'>{item.status}</p>
                                </div>
                            ))}

                        </div>
                        <div>
                            <p><b>Looking to Close Your account?</b></p>
                            <button className='btn btn-danger'>Close account</button>
                        </div>

                    </div>)}
        </div>
    )
}
export default Profile;