import react, { useEffect, useState } from 'react';
import './ApiExplorer.css'
import {useNavigate} from 'react-router-dom';
import {Host} from '../../../env.dev';
import { useAuth } from '../../../AuthContext';
import Failed from '../errorpage/Failed';
import * as Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type ListItem = {
    id: string;
    name: string;
  };
const ApiExplorer=()=>{
    const { accessToken, isAuthenticated ,storedToken,storedExpireTime} = useAuth();
    const navigate=useNavigate();
    const [list,setList]=useState<ListItem[]>([]);
    const [limit, setLimit] = useState<number>(5); // Default limit
    const [offset, setOffset] = useState<number>(0);
    const [responseError,setResponseError]=useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const [totalPages,setTotalPages]=useState<any>();
    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(() => {
       
        // const storedAccessToken = sessionStorage.getItem('accessToken');
        // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
        
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
          // Token is valid, fetch API list
          if (searchQuery) {
            fetch(Host.host + `search?limit=${limit}&query=${searchQuery}`, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'content-type': 'application/json'
              },
            })
            .then(response => response.json())
            .then(data => {
              setList(data.list);
              const totalItems = data?.pagination?.total;
              const totalPages = Math.ceil(totalItems / limit);
              setTotalPages(totalPages);
            })
            .catch(error => console.log(error));
          }else{
          const options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          };
      
          fetch(`${Host.host}apis?limit=${limit}&offset=${offset}`, options)
            .then(async response => {
              let clonedResponse = response.clone(); 
            if(!response.ok){
             
              setIsLoading(false)
              const data:any=await response.json()
              setResponseError({'message':data.description,'code':data.code})
            //   toast.error('Error Notification !', {
            //     position:  toast.POSITION.TOP_RIGHT
            // });
            }
            return clonedResponse.json()
            })
            .then((data:any) => {
              setIsLoading(false)
             
              setList(data.list);
              const totalItems=data?.pagination?.total
              const totalPages = Math.ceil(totalItems / limit)
            setTotalPages(totalPages)
            })
            .catch(error => {console.error('Error fetching API list:', error)
            setIsLoading(false);
            setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
          });
        }
        }
      }, [limit, offset, navigate,searchQuery]);

     const goToApiPage:any=(id:any)=>{
        navigate(`${id}`)
     }
     const searchHandler=(event:any)=>{
        const searchValue=event.target.value
        setSearchQuery(searchValue);
       
    
     }
    return(
      <div className='page-height'>
        <ToastContainer />
      {isLoading ? (
        <div className="loader-container">
          <Loader.Bars color="lightgray" height={100} width={100} />
        </div>
      ):
      (responseError?<Failed data={responseError}/>:
        <div className="container-fluid apipage-height">
            <div className='row mt-5'>
                <div className='d-flex col-sm-12 justify-content-between'>
                    <h5>APIs</h5>
                    <input type="search" onChange={searchHandler} placeholder="search"></input>

                </div>

            </div>
            <div className='row'>
                <div className='d-flex col-sm-12 justify-content-start'>
            <ul>
            {list?.map((item:any) => {
             
          return <li key={item.id} className="list-item"><a className="anchor-item" onClick={()=>{goToApiPage(item.id)}}>{item.name}</a></li>
              
            })}
                
            </ul>
                </div>
            </div>
            <div className='row'>
            <div className='d-flex col-sm-12 justify-content-between pagination-container'>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button className="page-link" onClick={() => setOffset(Math.max(offset - limit, 0))} aria-label="Previous"disabled={offset === 0}>
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                 
                  {[...Array(totalPages)].map((_, index) => (
                    <li key={index + 1} className={`page-item ${offset / limit === index ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setOffset(index * limit)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button className="page-link" onClick={() => setOffset(offset + limit)} aria-label="Next"disabled={offset >= (totalPages - 1) * limit}>
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
  
</div>
</div>
        </div>)}
        </div>
    )
}

export default ApiExplorer;