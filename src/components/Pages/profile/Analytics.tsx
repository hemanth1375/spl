import react from 'react';

const Analytics=()=>{
    return(
        <div className='container'>
            <div className='row'>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">At a glance</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Usage</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Health</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="disabled-tab" data-bs-toggle="tab" data-bs-target="#disabled-tab-pane" type="button" role="tab" aria-controls="disabled-tab-pane" aria-selected="false">Activity</button>
  </li>
</ul>
<div className="tab-content" id="myTabContent">
  <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex={0}>
    <p style={{fontSize:"35px",fontWeight:"300"}}>Usage/Health</p>
    <div>
    <p style={{fontSize:"35px",fontWeight:"300"}}>Top Products</p>
    <table>
      <tr style={{borderBottom:"1px solid",color:"#00bcf8"}}>
        <th className='col-sm-3'>Products</th>
        <th className='col-sm-2'>Successful Calls</th>
        <th className='col-sm-1'>Blocked Calls</th>
        <th className='col-sm-1'>Failed Calls</th>
        <th className='col-sm-1'>Other Calls</th>
        <th className='col-sm-1'>Total Calls</th>
        <th className='col-sm-2'>Responsive Time,Avg</th>
        <th className='col-sm-1'>Band Width</th>
      </tr>
      <tr style={{borderBottom:"1px solid"}}>
        <td className='col-sm-3'>National Address</td>
        <td className='col-sm-2'>6</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-2'>19 ms</td>
        <td className='col-sm-1'>1.0</td>
      </tr>
      <tr style={{borderBottom:"1px solid"}}>
        <td className='col-sm-3'>National Address By ShortAddress</td>
        <td className='col-sm-2'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-2'>11 ms</td>
        <td className='col-sm-1'>0.0</td>
      </tr>
    </table>
    </div>
    <div>
    <p style={{fontSize:"35px",fontWeight:"300"}}>Top Subscriptions</p>
    <table>
      <tr style={{borderBottom:"1px solid",color:"#00bcf8"}}>
        <th className='col-sm-3'>Top Subscription</th>
        <th className='col-sm-2'>Successful Calls</th>
        <th className='col-sm-1'>Blocked Calls</th>
        <th className='col-sm-1'>Failed Calls</th>
        <th className='col-sm-1'>Other Calls</th>
        <th className='col-sm-1'>Total Calls</th>
        <th className='col-sm-2'>Responsive Time,Avg</th>
        <th className='col-sm-1'>Band Width</th>
      </tr>
      <tr style={{borderBottom:"1px solid"}}>
        <td className='col-sm-3'>National Address</td>
        <td className='col-sm-2'>6</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-2'>19 ms</td>
        <td className='col-sm-1'>1.0</td>
      </tr>
    </table>
    </div>
    <div>
    <p style={{fontSize:"35px",fontWeight:"300"}}>Top Apis</p>
    <table>
      <tr style={{borderBottom:"1px solid",color:"#00bcf8"}}>
        <th className='col-sm-3'>Api</th>
        <th className='col-sm-2'>Successful Calls</th>
        <th className='col-sm-1'>Blocked Calls</th>
        <th className='col-sm-1'>Failed Calls</th>
        <th className='col-sm-1'>Other Calls</th>
        <th className='col-sm-1'>Total Calls</th>
        <th className='col-sm-2'>Responsive Time,Avg</th>
        <th className='col-sm-1'>Band Width</th>
      </tr>
      <tr style={{borderBottom:"1px solid"}}>
        <td className='col-sm-3'>National Address</td>
        <td className='col-sm-2'>6</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-2'>19 ms</td>
        <td className='col-sm-1'>1.0</td>
      </tr>
    </table>
    </div>
    <div>
    <p style={{fontSize:"35px",fontWeight:"300"}}>Top Operations</p>
    <table>
      <tr style={{borderBottom:"1px solid",color:"#00bcf8"}}>
        <th className='col-sm-3'>Operation</th>
        <th className='col-sm-2'>Successful Calls</th>
        <th className='col-sm-1'>Blocked Calls</th>
        <th className='col-sm-1'>Failed Calls</th>
        <th className='col-sm-1'>Other Calls</th>
        <th className='col-sm-1'>Total Calls</th>
        <th className='col-sm-2'>Responsive Time,Avg</th>
        <th className='col-sm-1'>Band Width</th>
      </tr>
      <tr style={{borderBottom:"1px solid"}}>
        <td className='col-sm-3'>National Address</td>
        <td className='col-sm-2'>6</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-1'>0</td>
        <td className='col-sm-2'>19 ms</td>
        <td className='col-sm-1'>1.0</td>
      </tr>
    </table>
    </div>
  </div>
  <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex={0}>...</div>
  <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex={0}>...</div>
  <div className="tab-pane fade" id="disabled-tab-pane" role="tabpanel" aria-labelledby="disabled-tab" tabIndex={0}>...</div>
</div>
</div>
        </div>

    )
}
export default Analytics;