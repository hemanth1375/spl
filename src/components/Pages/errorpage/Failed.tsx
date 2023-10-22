import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Failed = (props: any) => {
    const navigate=useNavigate();
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Set showModal to false after the component mounts to prevent the modal from re-rendering infinitely
    // setShowModal(false);
  }, []);

  console.log(props);
const goToHomePage=()=>{
    setShowModal(false)
    navigate('/')
}
  return (
    <div>
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{props.data.message}</h1>
              
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button> */}
            </div>
            <div className="modal-body text-center">
            <p style={{fontSize:"60px",color:"red"}}>{props.data.code}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={goToHomePage}>Home Page</button>
              {/* <button type="button" className="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Failed;
