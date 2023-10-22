import react, { useEffect, useState } from 'react';
import './ApiProducts.css'
import { useNavigate } from 'react-router-dom';
import { Host } from '../../../env.dev';
import { useAuth } from '../../../AuthContext';
import Failed from '../errorpage/Failed';

import * as Loader from 'react-loader-spinner';
type ListItem = {

  id: string;
  name: string;

};
const ApiProducts = () => {
  const { accessToken, isAuthenticated,storedToken,storedExpireTime } = useAuth();
  const navigate = useNavigate();
  const [list, setList] = useState<ListItem[]>([]);
  const [limit, setLimit] = useState<number>(10); // Default limit
  const [offset, setOffset] = useState<number>(0);
  // const storedAccessToken = sessionStorage.getItem('accessToken');
  // const storedTokenExpiration = sessionStorage.getItem('tokenExpiration');
  const [responseError, setResponseError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<any>();
  useEffect(() => {
    const getApplicationList = () => {
      fetch(Host.host + `applications?limit=${limit}&offset=${offset}`, {
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
          setList(data.list)
          const totalItems = data.pagination.total;
          const totalPages = Math.ceil(totalItems / limit);
          setTotalPages(totalPages);

        }).catch(error => {
          setIsLoading(false)
          setResponseError({ 'message': 'Error fetching API list', 'code': 500 });
        })
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
      getApplicationList()
    }
  }, [limit, offset, isAuthenticated, navigate])
  const goToApplicationDetailsPage: any = (id: any) => {
    navigate(`${id}`)
  }

  return (
    <div className="product-page-height">
      {isLoading ? (
        <div className="loader-container">
          <Loader.Bars color="lightgray" height={100} width={100} />
        </div>
      ) :
        (responseError ? <Failed data={responseError} /> :
          <div className="container-fluid apipage-height">
            <div className='row mt-5'>
              <div className='d-flex col-sm-12 justify-content-between'>
                <h5>Products</h5>

              </div>

            </div>
            <div className='row'>
              <div className='d-flex col-sm-12 justify-content-start'>
                <ul>
                  {list.map((item: any) => {

                    return <li key={item.applicationId} className="list-item"><a className="anchor-item" onClick={() => { goToApplicationDetailsPage(item.applicationId) }}>{item.name}</a></li>

                  })}

                </ul>
              </div>
            </div>
            <div className='row'>
              <div className='d-flex col-sm-12 justify-content-between prod-pagination-container'>
                <nav aria-label="Page navigation example">
                  <ul className="pagination">
                    <li className="page-item">
                      <button className="page-link" onClick={() => setOffset(Math.max(offset - limit, 0))} aria-label="Previous" disabled={offset === 0}>
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
                      <button className="page-link" onClick={() => setOffset(offset + limit)} aria-label="Next" disabled={offset >= (totalPages - 1) * limit}>
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

export default ApiProducts;