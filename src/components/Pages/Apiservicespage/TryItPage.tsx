import react, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TryItPage.css';
import { properties } from '../../../properties';
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as Loader from 'react-loader-spinner';
import { Host } from '../../../env.dev';
import { useAuth } from '../../../AuthContext';
interface InputItem {
    name: string;
    required: boolean;
    value: string | number;
    in: string;
}
const TryItPage = ({ id, requestBody: requestBodyObj, url: hostUrl, urlPath: urlString, inputItemList: inputLists, selectedPath: choosedPath, properties: choosedProperties, headerKey: headerKey }: any,) => {
    const { accessToken, isAuthenticated, storedToken, storedExpireTime } = useAuth();
    const [url, setUrl] = useState(hostUrl ?? "")
    const [urlPath, setUrlPath] = useState<any>(urlString ?? "");
    const [headers, setHeaders] = useState<any>(headerKey ?? "");
    // input
    const [selectedPath, setSelectedPath] = useState<any>(choosedPath ?? "")
    const [inputList, setInputList] = useState<any>([])
    const [inputItemList, setInputItemList] = useState<InputItem[]>(inputLists ?? [])
    const [headerListItems, setHeaderListItems] = useState<any>();
    const [accessTokenKey, setAccessTokenKey] = useState('');
    const [response, setResponse] = useState<any>();
    const [textAreaValue, setTextAreaValue] = useState('');
    const [apikeyHeader, setApiKeyHeader] = useState();
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
    const [validationErrorsHeader, setValidationErrorsHeader] = useState<{ [key: string]: string }>({});
    const [accessTokenKeyError, setAccessTokenKeyError] = useState<any>('');
    const [requestBodyError, setRequestBodyError] = useState('');
    const [error, setError] = useState('');
    const [responseStatus, setResponseStatus] = useState<any>();
    const [passwordType, setPasswordType] = useState("password");
    const [loading, setLoading] = useState(false);
    const [sendLoading, setSendLoading] = useState(false);
    // const [requestBodyObjFromResponse,setRequestBodyObjFromResponse]=useState<any>(requestBodyObj??"");
    console.log(requestBodyObj)
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    const navigate = useNavigate();

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    // after clicking add parameter button to add new query params
    const handleListAdd = () => {
        setInputList([
            ...inputList,
            {
                name: "",
                value: ""
            }
        ])
    }
    //   after clicking add parameter if you change value in text box onchange method will trigger
    const handleAddParameterChange = (e: any, selectedIndex: any) => {
        let newList: any = []
        const urlList: any = [...inputList]
        console.log(urlList)
        console.log(inputItemList)
        urlList.map((each: any, i: any) => {
            if (i === selectedIndex) {
                const oldVal = each.value
                if (oldVal != e.target.value) {
                    each.value = e.target.value
                }

            }

        })
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in !== 'header') {
                return item
            }
        })
        let listOfUrl = [...filterInputItemList, ...urlList]
        var filterArray = listOfUrl.filter((item: any) => {

            if (item.value !== "") {
                return item
            }
        })
        const newArray: any = [...filterArray]
        let newUrl = url
        newArray.forEach((item: any, index: any) => {

            if (item.value != "") {
                if (index === 0) {
                    newUrl = newUrl + "?" + item.name + "=" + item.value
                } else {
                    newUrl = newUrl + "&" + item.name + "=" + item.value
                }
            }

        })
        setUrlPath(newUrl)

        setInputList(urlList)

    }
    //   after clicking add parameter if you change key name in text box onchange method will trigger
    const handleAddQueryNameChange = (e: any, selectedIndex: any) => {
        const newInputList = inputList.map((item: any, i: any) => {
            if (i === selectedIndex) {
                item.name = e.target.value
            }
            return item
        })
        setInputList(newInputList)
    }
    const handleAddHeaderNameChange = (e: any, selectedIndex: any) => {
        const newInputListHeader = inputListHeader.map((item: any, i: any) => {
            if (i === selectedIndex) {
                item.name = e.target.value
            }
            return item
        })
        setInputListHeader(newInputListHeader)
    }
    const handleAddHeaderValueChange = (e: any, selectedIndex: any) => {
        console.log(inputListHeader)
        const headerList: any = [...inputListHeader]
        headerList.map((each: any, i: any) => {
            if (i === selectedIndex) {
                const oldVal = each.value
                if (oldVal != e.target.value) {
                    each.value = e.target.value
                }

            }

        })
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in === 'header') {
                return item
            }
        })
        let listOfHeaders = [...filterInputItemList, ...headerList]
        var filterArray = listOfHeaders.filter((item: any) => {

            if (item.value !== "") {
                return item
            }
        })
        console.log(filterArray)
        setHeaderListItems(filterArray)
        console.log(headerListItems)
        // setInputListHeader(filterArray)
    }
    useEffect(() => {
        console.log(headerListItems)
    }, [headerListItems])
    //   after clicking remove parameter
    const handleRemoveItem = (index: any) => {

        const newList = [...inputList]
        newList.splice(index, 1)
        setInputList(newList)
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in !== 'header') {
                return item
            }
        })
        let newUrlList = [...filterInputItemList, ...newList]
        let newUrl = url
        let listOfurls: any = []
        newUrlList.forEach((item: any, index: any) => {

            if (item.value != "") {
                listOfurls.push(item)
            }
        })
        listOfurls.forEach((item: any, index: any) => {

            if (item.value != "") {
                if (index === 0) {
                    newUrl = newUrl + "?" + item.name + "=" + item.value
                } else {
                    newUrl = newUrl + "&" + item.name + "=" + item.value
                }
            }
        })
        setUrlPath(newUrl)

    }
    const [inputListHeader, setInputListHeader] = useState<any>([])
    // adding new header parameter
    const handleListAddHeader = () => {
        setInputListHeader([
            ...inputListHeader,
            {
                name: "",
                value: ""
            }
        ])
    }
    //   remove header parameter
    const handleRemoveItemHeader = (index: any) => {
        const newList = [...inputListHeader]
        newList.splice(index, 1)
        setInputListHeader(newList)
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in === 'header') {
                return item
            }
        })
        let newHeaderList = [...filterInputItemList, ...newList]
        console.log(newHeaderList)
        setHeaderListItems(newHeaderList)
        console.log(headerListItems)

    }
    useEffect(() => {
    }, [inputList])
    //   if you change any value in query params onchange method will trigger

    const handleInputChangeAccessTokenKey = (event: any) => {
        var value = event.target.value
        setAccessTokenKey(value)
    }
    const handleInputChange = ({ val, name }: any, index: any) => {


        let firstQuery = true
        let newList: any = []
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in !== 'header') {
                return item
            }
        })
        const urlList: any = [...filterInputItemList]
        urlList.map((each: any) => {
            if (each.name === name) {
                const oldVal = each.value
                if (oldVal != val) {
                    each.value = val
                }

            }

        })
        let listOfUrl = [...urlList, ...inputList]
        var filterArray = listOfUrl.filter((item: any) => {

            if (item.value !== "") {
                return item
            }
        })
        // const newList:any=[]
        let newUrl = url
        filterArray.forEach((item: any, index: any) => {

            if (item.value != "") {
                if (index === 0) {
                    newUrl = newUrl + "?" + item.name + "=" + item.value
                } else {
                    newUrl = newUrl + "&" + item.name + "=" + item.value
                }
            }

        })
        setUrlPath(newUrl)

        setInputItemList(urlList)


    }
    // if you want to remove query parameter by clicking remove parameter button
    const removeItem = (index: any) => {
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item?.in !== 'header') {
                return item
            }
        })
        const newList = [...filterInputItemList]
        console.log(newList)
        newList.splice(index, 1)
        console.log(newList)
        setInputItemList(newList)
        let newUrlList = [...newList, ...inputList]
        console.log(newUrlList)
        let newUrl = url
        let listOfUrl: any = []
        newUrlList.forEach((item: any, index: any) => {

            if (item.value != "") {
                listOfUrl.push(item)
            }
        })
        listOfUrl.forEach((item: any, index: any) => {

            if (item.value != "") {
                if (index === 0) {
                    newUrl = newUrl + "?" + item.name + "=" + item.value
                } else {
                    newUrl = newUrl + "&" + item.name + "=" + item.value
                }
            }
        })
        setUrlPath(newUrl)
    }
    // header
    const handleInputChangeHeader = ({ val, name }: any, index: any) => {
        console.log(inputItemList)
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in === 'header') {
                return item
            }
        })
        const headerList: any = [...filterInputItemList]
        console.log(headerList)
        headerList.map((each: any) => {
            if (each.name === name) {
                const oldVal = each.value
                if (oldVal != val) {
                    each.value = val
                }

            }

        })
        let listOfHeaders = [...headerList, ...inputListHeader]
        var filterArray = listOfHeaders.filter((item: any) => {

            if (item.value !== "") {
                return item
            }
        })
        console.log(filterArray)
        setHeaderListItems(filterArray)
        console.log(headerListItems)

    }
    const removeItemHeader = (index: any) => {
        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in === 'header') {
                return item
            }
        })

        const newList = [...filterInputItemList]
        newList.splice(index, 1)
        let newHeaderList = [...newList, ...inputListHeader]
        setHeaderListItems(newHeaderList)
        console.log(headerListItems)
    }
    // sending request
    useEffect(() => {
        // This effect runs whenever accessTokenKey changes
        if (!accessTokenKey) {
            setAccessTokenKeyError('Access Token is required.');
        } else {
            setAccessTokenKeyError('');
        }
    }, [accessTokenKey]);
    useEffect(() => {
        // This effect runs whenever textAreaValue changes
        // if (selectedPath[1] === "post" || selectedPath[1] === "put" || selectedPath[1] === "patch") {
        //     if (!textAreaValue) {
        //         setRequestBodyError('Request Body is required.');
        //     } else {
        //         setRequestBodyError('');
        //     }
        // }
        if (requestBodyObj && requestBodyObj?.required) {
            if (!textAreaValue) {
                setRequestBodyError('Request Body is required.');
            } else {
                setRequestBodyError('');
            }
        }
    }, [textAreaValue]);
    useEffect(() => {
        //console.log(inputItemList)

        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in === 'header') {
                return item
            }
        })
        const requiredFieldsHeader = filterInputItemList.filter(item => item.required);

        const headersErrors: { [key: string]: string } = {};
        for (const field of requiredFieldsHeader) {
            if (!field.value) {
                headersErrors[field.name] = 'Field is required.';
            }
        }
        if (Object.keys(headersErrors).length > 0) {
            setValidationErrorsHeader(headersErrors);
        } else {
            setValidationErrorsHeader({});
        }
    }, [headerListItems])
    useEffect(() => {
        // console.log(inputItemList)

        const filterInputItemList = inputItemList.filter((item: any) => {
            if (item.in !== 'header') {
                return item
            }
        })
        const requiredFields = filterInputItemList.filter(item => item.required);

        const errors: { [key: string]: string } = {};

        for (const field of requiredFields) {
            if (!field.value) {
                errors[field.name] = 'Field is required.';
            }
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        } else {
            setValidationErrors({});
        }
        // const requiredFieldHeader=headerListItems?.filter((item:any)=>item.required);
        // const headersErrors: { [key: string]: string } = {};
        // for (const field of requiredFieldHeader) {
        //     if (!field.value) {
        //         headersErrors[field.name] = 'Field is required.';
        //     }
        // }
        // if (Object.keys(headersErrors).length > 0) {
        //     setValidationErrorsHeader(headersErrors);
        // } else {
        //     setValidationErrorsHeader({});
        // }
    }, [inputItemList])
    const sendRequest = () => {
        setResponse('')
        setError('')
        console.log(headerListItems)
        let headers: any = {
            'content-type': 'application/json',
            'apikey': `${accessTokenKey}`
        };

        if (headerListItems && headerListItems.length > 0) {
            headerListItems.forEach((item: any) => {
                headers[item.name] = item.value;
                // if (item.in === 'header' && item.value !== undefined) {
                //     headers[item.name] = item.value;
                // }
            });
        }
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

            const requiredFields = inputItemList.filter(item => item.required);

            const errors: { [key: string]: string } = {};

            for (const field of requiredFields) {
                if (!field.value) {
                    errors[field.name] = 'Field is required.';
                }
            }

            if (Object.keys(errors).length > 0) {
                setValidationErrors(errors);
                return;
            }
            if (accessTokenKeyError) {
                return;
            }
            // if (selectedPath[1] === "post" || selectedPath[1] === "put" || selectedPath[1] === "patch") {
            //     if (requestBodyError) {
            //         return;
            //     }
            // }
            if (requestBodyObj) {
                if (requestBodyError) {
                    return;
                }
            }
            setSendLoading(true)
            setValidationErrors({});
            // const requestBody = selectedPath[1] === "post" || selectedPath[1] === "put" || selectedPath[1] === "patch" ? textAreaValue : undefined;
            const requestBody = requestBodyObj ? textAreaValue : undefined
            inputItemList.map((item: any) => {
                if (item.required === true) {
                }
            })
            fetch(urlPath, {
                method: selectedPath[1],
                headers: headers,
                body: requestBody !== undefined ? requestBody : undefined
            }).then(response => {
                setResponseStatus(response.status)
                if (!response.ok) {
                    // throw new Error('Network response was not ok');

                }
                if (requestBody !== undefined) {
                    return response.json();
                } else {
                    return response.json();
                }

            })
                .then(data => {
                    setResponse(data)
                    setSendLoading(false)
                })
                .catch(error => {
                    setSendLoading(false)
                    setError('An error occurred while making the request')
                }
                )

        }

    }
    const [showApplicationList,setShowApplicationList]=useState<any>();
    const [subscriptionList, setSubscriptionList] = useState<any>();
    const [subscribedValue, setSubscribedValue] = useState<any>(showApplicationList?.length > 0 ? showApplicationList[0].applicationId : '');
    console.log(subscribedValue)
    const getSubscriptionList = async () => {
        try {
            const response = await fetch(Host.host + `subscriptions?apiId=${id}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            })
            const data = await response.json()
            setSubscriptionList(data.list)
            return data.list
        } catch (error) {
            console.log(error)
        }

    }
    // useEffect(()=>{
    //     getSubscriptionList()
    //     if (subscriptionList?.length > 0) {
    //         // Update subscribedValue when subscriptionList changes
    //         setSubscribedValue(subscriptionList[0].applicationId);
    //       }
    // },[subscriptionList])
   
    useEffect(() => {
        const fetchData = async () => {
            // Fetch subscriptionList data
            const fetchedList: any = await getSubscriptionList();
            console.log(fetchedList)
            const confirmedFetchedList=fetchedList?.filter((item:any)=>{
              return item.status!=="ON_HOLD"
            })
            console.log(confirmedFetchedList)
            setShowApplicationList(confirmedFetchedList)
            console.log(showApplicationList)
            if (confirmedFetchedList?.length > 0) {
                // Update subscribedValue when subscriptionList changes
                setSubscribedValue(confirmedFetchedList[0].applicationId);
            }
        };

        fetchData(); // Call the async function immediately

        // The effect does not depend on subscriptionList, so no need to include it in the dependency array
    }, []);

    //   getting access token
    const getApiKey = async () => {
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
            console.log(subscribedValue)
            setLoading(true);
            await fetch(Host.host + `applications/${subscribedValue}/oauth-keys`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            }).then(response => response.json())
                .then(async data1 => {
                    let keyTypeValue: any = data1?.list[0]?.keyType || 'PRODUCTION'
                    //await fetch(`https://localhost:9443/api/am/devportal/v3/applications/${data.list[0].applicationId}/oauth-keys/${data1.list[0].keyMappingId}/generate-token`,{
                    await fetch(Host.host + `applications/${subscribedValue}/api-keys/${keyTypeValue}/generate`, {

                        method: "POST",
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            // "consumerSecret": "HBb0CB7aUf8qhjQ_7ILmJuhglAwa",
                            // "validityPeriod": 3600,
                            // "revokeToken": null,
                            // "scopes": [],
                            // "additionalProperties": {
                            //     "id_token_expiry_time": 3600,
                            //     "application_access_token_expiry_time": 3600,
                            //     "user_access_token_expiry_time": 3600,
                            //     "bypassClientCredentials": false,
                            //     "pkceMandatory": false,
                            //     "pkceSupportPlain": false,
                            //     "refresh_token_expiry_time": 86400
                            // }
                            'validityPeriod': -1
                        })
                    }).then(response => response.json())
                        .then(data => {

                            setAccessTokenKey(data.apikey)
                            setLoading(false);
                        }).catch(error => {
                            setLoading(false)
                        })
                }).catch(error => {
                    setLoading(false)
                })
            // await fetch(Host.host + `subscriptions?apiId=${id}&limit=25`, {
            //     headers: {
            //         'Authorization': `Bearer ${accessToken}`,
            //         'content-type': 'application/json'
            //     }
            // }).then(response => response.json())
            //     .then(async data => {

            //         await fetch(Host.host + `applications/${subscribedValue}/oauth-keys`, {
            //             headers: {
            //                 'Authorization': `Bearer ${accessToken}`,
            //                 'Accept': 'application/json'
            //             }
            //         }).then(response => response.json())
            //             .then(async data1 => {
            //                 let keyTypeValue: any = data1?.list[0]?.keyType || 'PRODUCTION'
            //                 //await fetch(`https://localhost:9443/api/am/devportal/v3/applications/${data.list[0].applicationId}/oauth-keys/${data1.list[0].keyMappingId}/generate-token`,{
            //                 await fetch(Host.host + `applications/${subscribedValue}/api-keys/${keyTypeValue}/generate`, {

            //                     method: "POST",
            //                     headers: {
            //                         'Authorization': `Bearer ${accessToken}`,
            //                         'Content-type': 'application/json'
            //                     },
            //                     body: JSON.stringify({
            //                         // "consumerSecret": "HBb0CB7aUf8qhjQ_7ILmJuhglAwa",
            //                         // "validityPeriod": 3600,
            //                         // "revokeToken": null,
            //                         // "scopes": [],
            //                         // "additionalProperties": {
            //                         //     "id_token_expiry_time": 3600,
            //                         //     "application_access_token_expiry_time": 3600,
            //                         //     "user_access_token_expiry_time": 3600,
            //                         //     "bypassClientCredentials": false,
            //                         //     "pkceMandatory": false,
            //                         //     "pkceSupportPlain": false,
            //                         //     "refresh_token_expiry_time": 86400
            //                         // }
            //                         'validityPeriod': -1
            //                     })
            //                 }).then(response => response.json())
            //                     .then(data => {

            //                         setAccessTokenKey(data.apikey)
            //                         setLoading(false);
            //                     }).catch(error => {
            //                         setLoading(false)
            //                     })
            //             }).catch(error => {
            //                 setLoading(false)
            //             })
            //     }).catch(error => {
            //         setLoading(false)
            //     })
        }
    }

    const requestBodychange = (e: any) => {

        var textValue = e.target.value;
        setTextAreaValue(textValue)

    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                {/* <div id="tryItDetails" className='col-sm-12 tryit-page-container' > */}
                <p className='mt-3'>Query Parameters</p>
            </div>
            {inputItemList?.map((item: any, index: any) => {

                if (item.in === "query" || item.in === "path") {
                    const hasError = validationErrors[item.name];
                    return (
                        <div id={item?.name} className='row'>
                            {/* <div className='d-flex mt-3'> */}
                            <div className='col-sm-12 col-md-3'>
                                <p>{item?.name}</p>
                            </div>
                            <div className='col-sm-12 col-md-3'>
                                <input type="text" placeholder='value' onChange={(event) => {

                                    handleInputChange({ val: event.target.value, name: item.name }, index)
                                }} value={item?.value} className={`${hasError ? 'error-input' : ''}`} />
                                {hasError && (
                                    <p className='error-message'>{validationErrors[item.name]}</p>
                                )}
                            </div>
                            <div className='col-sm-12 col-md-3'>
                                {item?.required === false ? <button className='add-remove-buttons' onClick={() => { removeItem(index) }}><span>Remove Parameter</span></button> : ''}
                            </div>
                            {/* </div> */}

                        </div>
                    )
                }
            })}

            {inputList.length > 0
                ? inputList.map((input: any, index: any) => {
                    return (
                        <div className='row d-flex mt-3'>
                            <div className='col-sm-3' key={index}>
                                <input id="key" type="text" placeholder='name' onChange={(e) => handleAddQueryNameChange(e, index)} value={input.name} />
                            </div>
                            <div className='col-sm-3'>
                                <input id="value" type="text" placeholder='value' onChange={(e) => handleAddParameterChange(e, index)} value={input.value} />
                            </div>
                            <div className='col-sm-3'>
                                <button className='add-remove-buttons' onClick={() => handleRemoveItem(index)}><span>Remove Parameter</span></button>
                            </div>
                        </div>
                    )
                })
                : ""}
            <div className='row'>
                <div>
                    <button className='add-remove-buttons' onClick={handleListAdd}>Add Parameter</button>
                </div>
            </div>

            {subscribedValue ? <div className='d-flex row'>
                <div className='col-sm-12 col-md-3'>
                    <p>Application Name</p>
                </div>
                <div className='col-sm-12 col-md-3'>
                    <select name="subscriptions" onChange={(e: any) => setSubscribedValue(e.target.value)} required className='dropdown-width'>
                        {/* <option selected disabled>Select</option> */}
                        {subscriptionList && subscriptionList.length > 0 ? (
                            subscriptionList.map((item: any) => (
                                <option key={item.applicationInfo.name} value={item.applicationId}>
                                    {item.applicationInfo.name}
                                </option>
                            ))
                        ) : (
                            <option>Loading...</option>
                        )}
                    </select>
                    {/* {apiValueError && (<p style={{ color: "red" }}>{apiValueError}</p>)} */}
                </div>
            </div>:<div className='d-flex'><i className="bi bi-exclamation-triangle" style={{color:"red"}}></i><p> Please Subscribe To An Application</p></div>}
            <div className='row'>
                <p>Headers</p>

                {/* <div className='d-flex'> */}
                <div className='col-sm-12 col-md-3'>
                    <p>{headers ? headers : 'api_key'}</p>
                </div>
                <div className='col-sm-12 col-md-3'>

                    <div className="input-container">
                        <input id="apiHeaderValue" type={passwordType} placeholder="value" value={accessTokenKey} className={`input ${accessTokenKeyError ? 'error-input' : ''}`}
                            onChange={handleInputChangeAccessTokenKey}
                        />
                        <span className="input-icon" onClick={togglePassword}>
                            {passwordType === 'password' ? (
                                <i className="bi bi-eye"></i>
                            ) : (
                                <i className="bi bi-eye-slash"></i>
                            )}
                        </span>
                    </div>
                    {accessTokenKeyError && (<p className='error-message'>{accessTokenKeyError}</p>)}
                </div>
                <div className='col-sm-12 col-md-3'>
                    <button className={`getkey-btn ${subscribedValue===''&& 'block-pointer'}`} onClick={getApiKey} disabled={subscribedValue===''}>Get Test Key</button>
                    {loading && (
                        <Loader.Bars color="lightgray" height={50} width={50} />
                    )}
                </div>
                {/* </div> */}
            </div>

            {inputItemList?.map((item: any, index: any) => {

                if (item.in === "header") {
                    const hasError = validationErrorsHeader[item.name];
                    return (
                        <div className='row' id={item?.name}>
                            {/* <div className='d-flex mt-3'> */}
                            <p className='col-sm-12 col-md-3'>{item?.name}</p>
                            <div className='col-sm-12 col-md-3'>
                                <input type="text" placeholder='value' onChange={(event) => {

                                    handleInputChangeHeader({ val: event.target.value, name: item.name }, index)
                                }} value={item?.value} className={`${hasError ? 'error-input' : ''}`} />
                                {hasError && (
                                    <p className='error-message'>{validationErrorsHeader[item.name]}</p>
                                )}
                            </div>
                            <div className='col-sm-12 col-md-3'>
                                {item?.required === false ? <button className='add-remove-buttons' onClick={() => { removeItemHeader(index) }}><span>Remove Parameter</span></button> : ''}
                            </div>
                            {/* </div> */}

                        </div>
                    )
                }
            })}
            {inputListHeader.length > 0
                ? inputListHeader.map((input: any, index: any) => (
                    <div className='row d-flex mt-3'>
                        <div className='col-sm-12 col-md-3' key={index}>
                            <input id="key" type="text" placeholder='name' onChange={(e) => handleAddHeaderNameChange(e, index)} value={input.name} />
                        </div>
                        <div className='col-sm-12 col-md-3'>
                            <input id="value" type="text" placeholder='value' onChange={(e) => handleAddHeaderValueChange(e, index)} value={input.value} />
                        </div>
                        <div className='col-sm-12 col-md-3'>
                            <button className='add-remove-buttons' onClick={() => handleRemoveItemHeader(index)}><span>Remove Parameter</span></button>
                        </div>
                    </div>
                ))
                : ""}
            <div className='row'>
                <div>
                    <button className='add-remove-buttons' onClick={handleListAddHeader}>Add Header</button>
                </div>
            </div>
            <div className='row'>

                <p>Request URL</p>
                <div className='box text-wrap'>
                    <p>{urlPath}</p>
                </div>

                <p>HTTP request</p>
                <div className='box text-wrap'>
                    <p>{selectedPath[1]?.toUpperCase()} {urlPath}</p>
                </div>
                {requestBodyObj && (<div className='col-sm-12'>
                    <p>Request Body</p>

                    <textarea className={`text-area-width ${requestBodyError ? 'error-input' : ''}`} value={textAreaValue} onChange={(e) => requestBodychange(e)} >

                    </textarea>
                    {requestBodyError && (<p className='error-message'>{requestBodyError}</p>)}
                </div>)}
                {/* {selectedPath[1] === "post" || selectedPath[1] === "put" || selectedPath[1] === "patch" ? <div className='col-sm-12'>
                        <p>Request Body</p>
                        
                        <textarea className={`text-area-width ${requestBodyError ? 'error-input' : ''}`} value={textAreaValue} onChange={(e) => requestBodychange(e)} style={{ height: "150px" }}>

                        </textarea>
                        {requestBodyError && (<p className='error-message'>{requestBodyError}</p>)}
                    </div> : ""} */}
                <div className='mt-3'>
                    <button className='try-button' onClick={sendRequest}>Send</button>
                    {sendLoading && (
                        <Loader.Bars color="lightgray" height={50} width={50} />
                    )}
                </div>
                </div>
                {error && <p className='error-message'>{error}</p>}
                {response && <div className='row'>
                    <p>Response Status</p>
                    <p>{responseStatus}</p>
                    <p>Response Content</p>
                    <div className='col-sm-12 response-background-container'>
                        <div className='response-background'>

                            <pre>{JSON.stringify(response).split(",").join(",\n")}</pre>
                            {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
                            {/* <span>&#125;</span> */}
                        </div>
                    </div>
                </div>}

                {/* </div> */}
            
        </div>
    )
}
export default TryItPage;