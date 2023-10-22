import react, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';
import { Host } from '../../../env.dev';
import "./NewApplication.css";
const NewApplication = () => {
    const navigate = useNavigate()
    const { accessToken, isAuthenticated,storedToken,storedExpireTime } = useAuth();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState();
    const [quota, setQuota] = useState<any>();
    const [quotaValue, setQuotaValue] = useState();
    // const storedAccessToken = sessionStorage.getItem('accessToken');
    // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');

    const formSubmit = (e: any) => {
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
            const formData = {
                "name": title,
                "throttlingPolicy": quotaValue,
                "description": description,
                "tokenType": "JWT",
                "attributes": {}
            }
            fetch(Host.host + "applications", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
                .then(data => {
                    navigate('/profile')
                }).catch(error => { })
        }
    }
    const getQuotaList = async () => {
        try {
            const response = await fetch(Host.host + "throttling-policies/application", {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'content-type': 'application/json'
                }
            })
            const data = await response.json()
            setQuota(data.list)
        } catch (error) {

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
            getQuotaList();
        }
    }, [])
    return (
        <div className='container app-page-height'>
            <div className='row'>
                <p className='appl-heading'>Application Properties</p>
            </div>
            <div className='row'>
                <form className='d-flex'>
                    <div className='col-sm-2'>

                    </div>

                    <div className='col-sm-6'>
                        <div>
                            <label htmlFor='title'><b>Title</b></label><br />
                            <input type="text" id="title" style={{ width: "100%" }} onChange={(e: any) => setTitle(e.target.value)} value={title} />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label htmlFor='description'><b>Description</b></label><br />
                            <textarea id='description' name="description" rows={4} style={{ width: "100%" }} onChange={(e: any) => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label>
                                <b>Shared Quota for Application Tokens</b>
                            </label><br />
                            <select name="requirements" style={{ width: "100%" }} onChange={(e: any) => setQuotaValue(e.target.value)}>
                                <option>Select</option>
                                {quota && quota.length > 0 ? (
                                    quota.map((item: any) => (
                                        <option key={item.name} value={item.name}>
                                            {item.name}
                                        </option>
                                    ))
                                ) : (
                                    <option>Loading...</option>
                                )}
                            </select>
                        </div>
                        {/* <div style={{ marginTop: "10px" }}>
                            <label>
                                <b>Requirements</b>
                            </label><br />
                            <textarea name="requirements" rows={4} style={{ width: "100%" }}></textarea>
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label>
                                <b>category</b>
                            </label><br />
                            <input type="text" style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginTop: "10px" }}>
                            <label>
                                <b> Url</b>
                            </label><br />
                            <input type="text" style={{ width: "100%" }} />
                        </div> */}
                        <div style={{ marginTop: "10px" }}>
                            <button onClick={formSubmit} className='save-btn'>save</button>
                            <button className='cancel-btn'>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NewApplication;