import react, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { Host } from '../../../env.dev';
import Failed from '../errorpage/Failed';
import './DocumentEndPoint.css';

import * as Loader from 'react-loader-spinner';

const DocumentEndPoint = () => {
    const { accessToken, isAuthenticated,storedToken,storedExpireTime } = useAuth();
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
    const navigate = useNavigate();
    const { id } = useParams()
    const [apiPaths, setApiPaths] = useState<any>({})
    const [docList, setDocList] = useState<any>();
    const [content, setContent] = useState<any>();
    const [defaultPage, setDefaultPage] = useState<any>(false);
    const [contentPage, setContentPage] = useState<any>(false);
    const [schema, setSchema] = useState<any>({})
    const [selectedPath, setSelectedPath] = useState<any>("")
    const [propertiesVal, setPropertiesVal] = useState<any>()
    const [title, setTitle] = useState<string>('')
    const [urlPath, setUrlPath] = useState<any>();
    const [url, setUrl] = useState<any>();
    // const [serverUrl2,setServerUrl2]=useState<any>();
    // const[hostUrl,setHostUrl]=useState<any>('');
    const [headers, setHeaders] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    // input

    const [inputItemList, setInputItemList] = useState<any>([])

    const [overViewPage, setOverViePage] = useState(true);

    const [responseError, setResponseError] = useState<any>();
    const [sourceType, setSourceType] = useState<any>();
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

                        })

                    }
                });

                setUrl(data.servers[0].url)
                //  setServerUrl2(data.servers[1].url)

            }).catch(error => {
                setIsLoading(false)
                setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
            })
    }
    const displayPage = () => {
        setContent(null)
        setDefaultPage(true)
        setContentPage(true)


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

                let stringUrl = url + item[0]
                // setHostUrl(stringUrl)
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
                setUrlPath(stringUrl)

            }
        })

    }

    const getDocuments = () => {
        fetch(Host.host + `apis/${id}/documents`)
            .then(response => response.json())
            .then(data => {
                setDocList(data)
            }).catch(error=>{console.log(error)})
    }
    const goToContent = (documentId: any, sourceType: any, sourceUrl: any) => {

        if (sourceType === 'INLINE' || sourceType === 'MARKDOWN') {
            setSourceType('INLINE')
            setContentPage(true)
            fetch(Host.host + `apis/${id}/documents/${documentId}/content`).then(response => response.text())
                .then(data => {
                    setContent(data)
                })
        } else if (sourceType === 'FILE') {
            setSourceType('FILE')
            fetch(Host.host + `apis/${id}/documents/${documentId}/content`).then(response => {
                response.blob().then(blob => {
                    const fileURL = window.URL.createObjectURL(blob);
                    let alink = document.createElement('a');
                    alink.href = fileURL;
                    alink.download = 'File.pdf';
                    alink.click();
                })
            })
        } else if (sourceType === 'URL') {
            setSourceType('URL')
            setContentPage(true)
            setContent(sourceUrl)
        }
    }
    const createMarkup = (content: any) => {
        return { __html: content };
    };
    const goToEndpointspage = () => {
        setContentPage(false)
        setDefaultPage(false)
    }
    useEffect(() => {
        if (selectedPath[0] || selectedPath[0] === 0) {
            displayPage()
        }
    }, [selectedPath])
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
            getDetails();
            getDocuments();
        }
    }, [navigate])
    return (
        <div className='doc-end-page-height'>
            {isLoading ? (
                <div className="loader-container">
                    <Loader.Bars color="lightgray" height={100} width={100} />
                </div>
            ) :
                (responseError ? <Failed data={responseError} /> :
                    <div className='container doc-end-page-height'>
                        <div className='row'>
                            {!contentPage ? <div className='mt-5 col-sm-12 d-flex'>
                                <div className='col-sm-3'>
                                    <p className='docend-title'><b>{title}</b></p>
                                    <p><b>Documents</b></p>
                                    {docList?.list?.length !== 0 ? docList?.list?.map((item: any) => {
                                        return <div>
                                            <li>
                                                <a className="doc-list" onClick={() => goToContent(item.documentId, item.sourceType, item.sourceUrl)}>{item.name}</a>
                                            </li>
                                        </div>
                                    }) : <p>No Documents Available</p>}

                                    {/* <p style={{ marginLeft: '5px' }}><b>Default</b></p>
                                    {Object.entries(apiPaths).map(([path, methods]: any, index: any) => (
                                        <div key={path}>
                                            {Object.entries(methods).map(([method, details]: any) => (
                                                <div key={method} className={`d-flex side-bar align-items-center p-1${(selectedPath[0] == index && selectedPath[1] == method) && !overViewPage ? ' background' : ''}`} onClick={() => setSelectedPath([index, method])}>
                                                    <button className='button-size'> {method.toUpperCase()} </button>
                                                    <p> {details.summary ? details.summary : path}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ))} */}
                                </div>

                            </div> :

                                <div className='col-sm-12 mt-5'>
                                    <div style={{ textAlign: "end" }}>
                                        <button className='btn btn-secondary' onClick={goToEndpointspage}>Back</button>
                                    </div>
                                    {sourceType === 'INLINE' ? <div dangerouslySetInnerHTML={createMarkup(content)} /> : ''}
                                    {sourceType === 'URL' ? <a href={content} target="_blank">{content}</a> : ''}
                                    {/* {sourceType==='FILE'?<button onClick={downloadFile}>Download</button>:''} */}
                                    {/* {defaultPage && <div className='d-flex flex-column col-sm-12'>
                                        <div style={{ textAlign: 'left', paddingLeft: '20px', marginTop: '3rem' }}>
                                            <h3>{title}</h3>
                                            <p style={{ fontSize: "25px" }}>{propertiesVal?.summary}</p>
                                            <p className='doc-para'>{propertiesVal?.description}</p>
                                        </div>
                                        {<div id="apiDetailsPage" className='col-sm-12 api-details-container'>

                                            <p style={{ fontSize: '25px' }}>API Request</p>

                                            <p className='mt-3'><b>Input Parameters</b></p><hr />
                                            {propertiesVal?.parameters?.map((item: any) => {
                                                if (item.in === "query") {
                                                    return <div>
                                                        <div className='d-flex'>
                                                            <p className='col-sm-2'>{item.name}</p>
                                                           
                                                            <p className='col-sm-10'>{item.description}</p>
                                                        </div>
                                                    </div>
                                                }
                                            })}
                                            <p><b>Request Url</b></p>
                                            <div style={{ border: "1px solid", padding: "5px", backgroundColor: "#f5f5f5" }}>
                                                <p>{urlPath}</p>
                                            </div>

                                            <p><b>Request Headers</b></p>
                                            <div className='d-flex'>
                                                <p className='col-sm-3'>{headers}</p>
                                                <p className='col-sm-3'>string</p>
                                            </div>


                                        </div>



                                        }
                                    </div>} */}
                                </div>
                            }
                        </div>

                    </div>)}
        </div>
    )
}
export default DocumentEndPoint;