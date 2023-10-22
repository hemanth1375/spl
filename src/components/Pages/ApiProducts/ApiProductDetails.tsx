import react, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { Host } from '../../../env.dev';
import Failed from '../errorpage/Failed';
import './ApiProductDetails.css';

import * as Loader from 'react-loader-spinner';

const ApiProductDetails = () => {
    const { accessToken, isAuthenticated,storedToken,storedExpireTime } = useAuth();
    const id = useParams();
    const [limit, setLimit] = useState<number>(1000); // Default limit
    const [offset, setOffset] = useState<number>(0);
    const [apiList, setApiList] = useState<any>();
    const [subscribePage, setSubscribePage] = useState<any>();
    const [apiListDropdown, setApiListDropdown] = useState<any>();
    const [throttlingPolicy,setThrottlingPolicy]=useState<any>();
    const [apiValue, setApiValue] = useState();
    const [throttlingValue, setThrottlingValue] = useState();
    const [apiValueError, setApiValueError] = useState<any>();
    const [throttlingValueError,setThrottlingValueError]=useState<any>();
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    const [responseError, setResponseError] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [confirmError, setConfirmError] = useState<any>(null);
    const navigate = useNavigate();
    const getDetails = () => {
        fetch(Host.host + `subscriptions?applicationId=${id.id}&offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json'
            }
        }).then(async response => {
            let clonedResponse = response.clone();
            if (!response.ok) {
                setIsLoading(false)
                const data: any = await response.json()
                setResponseError({ 'message': data.description, 'code': data.code })
            }
            return clonedResponse.json()
        })
            .then(data => {
                setIsLoading(false)
                setApiList(data)

            }).catch(error => {
                setIsLoading(false)
                setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
            })
    }
    const subscribeFunc = () => {
        setSubscribePage(true)
    }
    const goToApiPage = (id: any) => {
        navigate(`operations/${id}`)
    }
    const getapiList = async () => {
        try {
            const response = await fetch(Host.host + "apis", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            })
            const data = await response.json()
            if (apiList?.list && data.list) {

                const filteredItems = data.list.filter((item: any) => {
                    return !apiList?.list.some((apiItem: any) => apiItem.apiId === item.id);
                });

                setApiListDropdown(filteredItems)
              
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        getapiList();
    }, [apiList])
    const confirmSubscription = (e: any) => {
        e.preventDefault();
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
            if (!apiValue) {
                setApiValueError('Field required')
                return;
            }
            if(!throttlingValue){
                setThrottlingValueError('Field required');
                return;
            }
            fetch(Host.host + "subscriptions", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    "apiId": apiValue,
                    "applicationId": id.id,
                    "throttlingPolicy": throttlingValue
                })
            }).then(response => {
                if (!response.ok) {
                    return response.json().then(errorResponse => {
                        setConfirmError(errorResponse);
                        throw new Error('Server Error Occurred');
                    });
                }
                response.json()
            })
                .then(data => {
                    setSubscribePage(false)
                }).catch(error => {
                    console.log(error)
                    // setConfirmError({ 'message': 'Error fetching API list', 'code': 500 });
                })
        }
    }
    useEffect(() => {
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
            getDetails()
        }
    }, [subscribePage, navigate])
    const throttlingPolicyFunc=(e: any) => {setApiValue(e.target.value)
        console.log(apiValue)
        console.log(apiListDropdown)
        apiListDropdown.map((item:any)=>{
            if(item.id===e.target.value){
                setThrottlingPolicy(item.throttlingPolicies)
            }
            console.log(throttlingPolicy)
        })
        }
    useEffect(()=>{console.log(throttlingPolicy)},[throttlingPolicy])
    return (
        <div className='productDet-page-height'>
            {isLoading ? (
                <div className="loader-container">
                    <Loader.Bars color="lightgray" height={100} width={100} />
                </div>
            ) :
                (responseError ? <Failed data={responseError} /> :
                    <div className="container-fluid apipage-height">
                        <div className='row mt-5'>
                            <h4>{apiList?.list[0]?.applicationInfo?.name}</h4>
                            <b>You have {apiList?.count} subscriptions to this product:</b>
                            <div className=' col-sm-12 justify-content-between'>

                                {apiList?.list?.map((item: any) => {
                                    return <div>
                                        <li key={item.apiId}>

                                            <a className="anchor-item" onClick={() => { goToApiPage(item.apiId) }}>{item.apiInfo.name}</a>
                                        </li>
                                    </div>
                                })}
                                <button className='subscribe-btn' onClick={subscribeFunc}>Subscribe</button>
                                {subscribePage && (<div className='row mt-4'>
                                    <form onSubmit={confirmSubscription}>
                                        <div className='col-sm-6 sub-border'>
                                            <div className='col-sm-12'>
                                                <p>Subscribe To Api</p>
                                            </div>
                                            <div className='d-flex'>
                                                <div className='col-sm-6'>
                                                    Api
                                                </div>
                                                <div className='col-sm-6'>
                                                    <select name="requirements" onChange={throttlingPolicyFunc} required>
                                                        <option selected disabled>Select</option>
                                                        {apiListDropdown && apiListDropdown.length > 0 ? (
                                                            apiListDropdown.map((item: any) => (
                                                                <option key={item.name} value={item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option>Loading...</option>
                                                        )}
                                                    </select>
                                                    {apiValueError && (<p className='error-text-color'>{apiValueError}</p>)}
                                                </div>
                                            </div>
                                            <div className='d-flex mt-4'>
                                                <div className='col-sm-6'>
                                                    Business plan
                                                </div>
                                                <div className='col-sm-6'>
                                                    <select name="THROTLING" onChange={(e: any) => setThrottlingValue(e.target.value)} required>
                                                    <option selected disabled>Select</option>
                                                        {/* <option value="UNLIMITED"> UNLIMITED</option> */}
                                                        {throttlingPolicy && throttlingPolicy.length > 0 ? (
                                                            throttlingPolicy.map((item: any) => (
                                                                <option key={item} value={item}>
                                                                    {item}
                                                                </option>
                                                            ))
                                                        ) : (
                                                            <option>Loading...</option>
                                                        )}
                                                    </select>
                                                    {throttlingValueError && (<p className='error-text-color'>{throttlingValueError}</p>)}
                                                </div>
                                            </div>
                                            <div className='mt-5'>
                                                <input className='subscribe-btn' type="submit" value="Confirm" />
                                                <button className='cancel-button' onClick={() => setSubscribePage(false)}>cancel</button>
                                            </div>
                                            {confirmError && <Failed data={confirmError} />}
                                        </div>
                                    </form>
                                </div>)}
                            </div>
                        </div>
                    </div>)}
        </div>
    )
}
export default ApiProductDetails