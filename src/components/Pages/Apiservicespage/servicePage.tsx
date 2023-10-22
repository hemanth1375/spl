import react, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ServicePage.css';
import { properties } from '../../../properties';
import TryItPage from './TryItPage';
import { Host } from '../../../env.dev';
import { useAuth } from '../../../AuthContext';
import Failed from '../errorpage/Failed';
import * as Loader from 'react-loader-spinner';


const ServicePage = () => {
    const navigate = useNavigate();
    const { accessToken, isAuthenticated,storedToken,storedExpireTime } = useAuth();
    const { id } = useParams()
    const [apiPaths, setApiPaths] = useState<any>({})
    const [schema, setSchema] = useState<any>({})
    const [selectedPath, setSelectedPath] = useState<any>("")
    const [propertiesVal, setPropertiesVal] = useState<any>()
    const [title, setTitle] = useState<string>('')
    const [urlPath, setUrlPath] = useState<any>();
    const [requestUrlPath, setRequestUrlpath] = useState<any>();
    const [url, setUrl] = useState<any>();
    const [hostUrl, setHostUrl] = useState<any>('');
    const [headers, setHeaders] = useState<any>();
    // input
    const [inputList, setInputList] = useState<any>([])
    const [inputItemList, setInputItemList] = useState<any>([])
    const [tryItPage, setTryItPage] = useState(false)
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    const [responseError, setResponseError] = useState<any>();
    const [contextUrl, setContextUrl] = useState<any>();
    const [inputListHeader, setInputListHeader] = useState<any>([])
const [requestBodyObj,setRequestBodyObj]=useState<any>();
const [isLoading, setIsLoading] = useState(true);
    //    getting details of particular api depend on apiId
    const getDetails = () => {
        fetch(Host.host + `apis/${id}/swagger`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json'
            },

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
                setTitle(data.info.title)
                setSchema(data.components.schemas)
                setApiPaths(data.paths)
                setHeaders(data.components?.securitySchemes?.apiKeyHeader?.name)

                Object.entries(data.paths).map(([key, value]: any, index: any) => {
                    if (index == 0) {
                        Object.entries(value).map(([ke, val]: any, valueIndex: any) => {
                            setPropertiesVal(val)
                            val?.requestBody&& setRequestBodyObj(val?.requestBody)
                            var listarr: any = []
                            val?.parameters?.map((item: any, index: any) => {
                                // if(item.in==="query"&& item.schema.default){
                                const obj: any = {}
                                obj.name = item.name
                                obj.required = item.required
                                obj.value = item?.schema?.default ? item?.schema?.default : ''
                                obj.in = item?.in
                                return listarr.push(obj)
                                // }


                            })
                            let url = data.servers[0].url
                            listarr.map((item: any, index: any) => {
                                if (index === 0) {
                                    url = url + "?" + item.name + "=" + item.value
                                } else {
                                    url = url + "&" + item.name + "=" + item.value
                                }
                            })


                            setUrlPath(url)

                            setInputItemList([...listarr])
                          
                            if (valueIndex === 0) {
                                setSelectedPath([0, ke])
                            }


                        })

                    }
                });
                setUrl(data.servers[0].url)

            }).catch(error => {
                setIsLoading(false)
                setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
            })
    }
    const getEndPointUrl = () => {
        fetch(Host.host + `apis/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
              
                setContextUrl(data.endpointURLs[0]?.URLs.https)
            })
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
            getEndPointUrl()
        }
    }, [navigate])
useEffect(()=>{
    console.log(requestBodyObj)
},[requestBodyObj])

    // display Try it Page after clicking try it button
    const displayTryItPage = () => {
        setTryItPage(true)
        setInputList([])
        setInputListHeader([])


    }

    // display api details page by clicking particular item(end point)
    const displayPage = () => {
        setTryItPage(false)

        var array: any = []
        const createArr = (paths: any) => {

            Object.entries(paths).map((item: any) => {
                array.push(item)
            })
        }
        createArr(apiPaths)
        var str = ''
        array.map((item: any, index: any) => {
            if (selectedPath[0] == index) {

                setPropertiesVal(item[1][selectedPath[1]])
                var listarr: any = []
                item[1][selectedPath[1]]?.parameters?.map((item: any, index: any) => {
                    const obj: any = {}
                    // if(item.in==="query"){
                    obj.name = item.name
                    obj.required = item.required
                    obj.value = item?.schema?.default ? item?.schema?.default : ''
                    obj.in = item?.in
                    listarr.push(obj)

                    // }

                })
                if (item[0] === '/*') {
                    item[0] = ''
                }
                let stringUrl = url + item[0]
                
                let requestUrl = url + item[0]
                setHostUrl(stringUrl)
                //setUrl(stringUrl)

                listarr.map((item: any, index: any) => {
                    if (item.value != "") {
                        if (index === 0) {
                            stringUrl = stringUrl + "?" + item.name + "=" + item.value
                        } else {
                            stringUrl = stringUrl + "&" + item.name + "=" + item.value
                        }
                    }
                })
                setInputItemList([...listarr])
                console.log(inputItemList)
                setUrlPath(stringUrl)
                listarr.map((item: any, index: any) => {
                    if (item.in === 'query') {
                        if (index === 0) {
                            requestUrl = requestUrl + "[?" + item.name + "]"
                        } else {
                            requestUrl = requestUrl + "[&" + item.name + "]"
                        }
                    }
                })

                setRequestUrlpath(requestUrl)
            }
        })

    }

    useEffect(() => {
        if (selectedPath[0] || selectedPath[0] === 0) {
            displayPage()
        }
    }, [selectedPath])
    return (<div className='service-page-height'>
    {isLoading ? (
      <div className="loader-container">
        <Loader.Bars color="lightgray" height={100} width={100} />
      </div>
    ) :
      (
        responseError ? <Failed data={responseError} /> :
        <div className='container-fluid page-height'>
            <div className='row'>
                {/* <div className='col-sm-12'> */}
                    {/* <div className='d-flex'> */}
                        <div className='col-sm-12 col-md-2 api-path-bg'>

                            <div className='mt-5'>
                                {Object.entries(apiPaths).map(([path, methods]: any, index: any) => (
                                    <div key={path}>
                                        {Object.entries(methods).map(([method, details]: any) => (
                                            <div key={method} className={`d-flex col-sm-12 side-bar align-items-center p-1${(selectedPath[0] == index && selectedPath[1] == method) ? ' background' : ''}`} onClick={() => setSelectedPath([index, method])}>
                                                <div className='col-sm-4'>
                                                    <button className='button-size'> {method.toUpperCase()} </button>
                                                </div>
                                                <div className='col-sm-8 text'>
                                                    <p> {details.summary ? details.summary : path}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='d-flex flex-column col-sm-12 col-md-10'>
                            <div className='service-title'>
                                <h3>{title}</h3>
                                <p className='text-size'>{propertiesVal?.summary}</p>
                                <p>{propertiesVal?.description}</p>
                            </div>
                            {!tryItPage ? <div id="apiDetailsPage" className='col-sm-12 api-details-container'>

                                <button className='try-button' onClick={displayTryItPage}>Try it</button>
                                <p className='text-size'>Request</p>
                                <p>Request Url</p>
                                <p><b>{requestUrlPath}</b></p>
                                <p className='mt-3'>Request Parameters</p><hr />
                                {propertiesVal?.parameters?.map((item: any) => {
                                    if (item.in === "query") {
                                        return <div>
                                            <div className='d-flex'>
                                                <p className='col-sm-3'>{item.name}</p>
                                                <p className='col-sm-3'>{item.schema.type}</p>
                                                <p className='col-sm-6'>{item.description}</p>
                                            </div><hr />
                                        </div>
                                    }
                                })}

                                <p>Request Headers</p>
                                <div className='d-flex'>
                                    <p className='col-sm-3'>{headers ? headers : 'api_key'}</p>
                                    <p className='col-sm-3'>string</p>
                                </div>
                                {propertiesVal?.parameters?.map((item: any) => {
                                    if (item.in === "header") {
                                        return <div>
                                            <div className='d-flex'>
                                                <p className='col-sm-3'>{item.name}</p>
                                                <p className='col-sm-3'>{item.schema.type}</p>
                                                <p className='col-sm-6'>{item.description}</p>
                                            </div><hr />
                                        </div>
                                    }
                                })}
                                {requestBodyObj&&(
                                    <div className='d-flex'>
                                    <p className='col-sm-3'>Request Body</p>
                                    {Object.entries(requestBodyObj.content).map(([key,val]:any)=>(
                                        <p>{key}</p>
                                    ))}
                                    </div>
                                )}

                            </div> :


                                <TryItPage id={id} requestBody={requestBodyObj} url={hostUrl} urlPath={urlPath} inputItemList={inputItemList} selectedPath={selectedPath} propertiesVal={propertiesVal} headerKey={headers} />}
                        </div>
                    {/* </div> */}

                {/* </div> */}

            </div>
        </div>)}
        </div>
    )
}

export default ServicePage;