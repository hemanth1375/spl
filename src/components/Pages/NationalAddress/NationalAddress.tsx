import react, { useState } from 'react';
import './NationalAddress.css';
import translationData from '../../../translation.json';
import { useNavigate } from 'react-router-dom';

const NationalAddress = () => {
  const navigate=useNavigate();
  const translation: any = translationData;
  console.log(translation)

  const [currentLanguage, setCurrentLanguage] = useState("English");
  const handleLanguageChange = (event: any) => {
    setCurrentLanguage(event.target.value);
  };
  const goToSignUpPage=()=>{
    navigate('/signup')
  }
  return (
    <div className='container-fluid'>
      <div className="dropdown mt-4" style={{ textAlign: "right" }}>
        <label htmlFor="languageDropdown"><b>Select Language:</b></label>
        <select
          id="languageDropdown"
          value={currentLanguage}
          onChange={handleLanguageChange}
        >
          {Object.keys(translation).map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* <p>{translations[currentLanguage].overview}</p> */}
      <div className='row p-3'>
        <div id="sp-header" className='class1'>
          <div className="container landingpage-slider" style={{ position: "relative" }}>
            <img className="sliderMap animate-opl map-animate" style={{ position: "absolute", top: "240px", left: "170px", zIndex: 2 }}  src={require("../../../assets/images/map1.png")} />
            <img className="sliderFace animate-opl face-animate" style={{ position: "absolute", top: "30px", left: "295px", zIndex: 4 }} src={require("../../../assets/images/map2.png")} />
            <img className="sliderIcons animate-opl icon-animate" style={{ position: "absolute", top: "60px", left: "295px", zIndex: 3 }} src={require("../../../assets/images/map3.png")} />
            <img className="sliderMarker animate-opl marker-animate" style={{ position: "absolute", top: "258px", left: "358px", zIndex: 4 }} src={require("../../../assets/images/map4.png")} />
          </div>
        </div>
        <div className='expand'>Expand your business and services, and achieve e-government goals</div>
      </div>

      {/* <div className='row'>
                <div  className="features row-2-div">
            <div className="features-sidebar feature row-2">
    
    <p className="callout para-1"><span style={{verticalAlign: "inherit"}}><span style={{verticalAlign: "inherit"}}>{translation[currentLanguage].overview}</span></span></p>
    <p className="details para-2"><span style={{verticalAlign: "inherit"}}><span style={{verticalAlign: "inherit",fontSize:"17px",fontFamily:"gess_light"}}>{translation[currentLanguage].overviewPara1}</span></span></p>
    <p className="details animate-in para-3"><span style={{verticalAlign: "inherit"}}><span style={{verticalAlign: "inherit"}}>{translation[currentLanguage].overviewPara2}</span></span></p>

    <img className="graph2-icon1 animate-in graphicon1-animate"  src="https://apimgmtstsgan2zrcngrxhec.blob.core.windows.net/content/MediaLibrary/Images/nationaladdress/graph2-icon1-1.png"/>
    <img className="graph2-icon2 animate-in graphicon2-animate"  src="https://apimgmtstsgan2zrcngrxhec.blob.core.windows.net/content/MediaLibrary/Images/nationaladdress/graph2-icon2.png"/>
    <img className="graph2-icon3 animate-in graphicon3-animate" src="https://apimgmtstsgan2zrcngrxhec.blob.core.windows.net/content/MediaLibrary/Images/nationaladdress/graph2-icon3.png"/>
    <img className="graph2-icon4 animate-in graphicon4-animate" src="https://apimgmtstsgan2zrcngrxhec.blob.core.windows.net/content/MediaLibrary/Images/nationaladdress/graph2-icon4.png"/>
    <img className="graph2-stroke animate-in icon-animate"  src="https://apimgmtstsgan2zrcngrxhec.blob.core.windows.net/content/MediaLibrary/Images/nationaladdress/graph2-iconStroke.png"/>

</div>
</div>
</div> */}
      <div className='row align-items-center' style={{ position: "relative", marginTop: "130px", marginBottom: "80px", minHeight: "360px" }}>
        <div className='col-sm-12 col-md-6'>
          <img className="graph2-icon1 animate-in graphicon1-animate" style={{ position: "absolute", left: "120px", top: "0", zIndex: 3 }} src={require("../../../assets/images/overview1.png")} />
          <img className="graph2-icon2 animate-in graphicon2-animate" style={{ position: "absolute", top: "130px", left: "3px", zIndex: 2 }} src={require("../../../assets/images/overview2.png")} />
          <img className="graph2-icon3 animate-in graphicon3-animate" style={{ position: "absolute", left: "130px", top: "170px", zIndex: 3 }} src={require("../../../assets/images/overview3.png")} />
          <img className="graph2-icon4 animate-in graphicon4-animate" style={{ position: "absolute", top: "130px", left: "313px", zIndex: 2 }} src={require("../../../assets/images/overview4.png")} />
          <img className="graph2-stroke animate-in icon-animate" style={{ position: "absolute", left: "48px", top: "50px", zIndex: 1 }} src={require("../../../assets/images/overview5.png")} />

        </div>
        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].overview}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].overviewPara1}</p>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].overviewPara2}</p>
        </div>

      </div><hr />
      <div className='row align-items-center' style={{ position: "relative", marginTop: "130px", marginBottom: "80px", minHeight: "245px" }}>
        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].ApiHead}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].ApiPara}</p>
        </div>
        <div className='col-sm-12 col-md-6'>
          <img className="" style={{ position: "absolute", top: "30px", right: "10px", zIndex: 1 }} src={require("../../../assets/images/api1.png")} />
          <img style={{ position: "absolute", top: "-130px", right: "260px", zIndex: 2, height: "200px" }} src={require("../../../assets/images/api2.png")} />
          <img style={{ position: "absolute", top: "125px", right: "250px", zIndex: 3, height: "200px" }} src={require("../../../assets/images/api3.png")}/>
        </div>

      </div><hr />
      <div className='row align-items-center' style={{ position: "relative", marginBottom: "40px", minHeight: "285px" }}>
        <div className='col-sm-12 col-md-6'>
          <img className="graph4-li1" style={{ position: "absolute", left: "190px", top: "120px", zIndex: 8 }}  src={require("../../../assets/images/dev1.png")} />
          <img className="graph4-icon1 animate-in-c pre-animate-c dev-img1"  src={require("../../../assets/images/dev2.png")} />
          <img className="graph4-icon2 animate-in-c pre-animate-c dev-img2"  src={require("../../../assets/images/dev3.png")} />
          <img className="graph4-icon3 animate-in-c pre-animate-c dev-img3" src={require("../../../assets/images/dev4.png")} />
          <img className="graph4-icon4 animate-in-c pre-animate-c dev-img4"  src={require("../../../assets/images/dev5.png")} />
          <img className="graph4-icon5 animate-in-c pre-animate-c dev-img5"  src={require("../../../assets/images/dev6.png")} />
          <img className="graph4-Stroke dev-img6"  src={require("../../../assets/images/dev7.png")} />

        </div>
        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].developer}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].developerPara1}</p>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].developerPara2}</p>
          <button className='btn btn-warning' onClick={goToSignUpPage}>Register Now</button>
        </div>


      </div><hr />
      <div className='row align-items-center' style={{ position: "relative", marginBottom: "40px", minHeight: "405px" }}>

        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].business}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].businessPara1}</p>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].businessPara2}</p>
        </div>

        <div className='col-sm-12 col-md-6'>
          <img className="graph5-icon1 animate-in graph5-icon1-animate business-img1" src={require("../../../assets/images/business1.png")} />
          <img className="graph5-icon2 animate-in graph5-icon2-animate business-img2" src={require("../../../assets/images/business2.png")} />
          <img className="graph5-icon3 animate-in graph5-icon3-animate business-img3" src={require("../../../assets/images/business3.png")} />
        </div>
      </div><hr />
      <div className='row align-items-center' style={{ position: "relative", marginTop: "130px", minHeight: "356px" }}>
        <div className='col-sm-12 col-md-6'>
          <img className="graph6-icon1 animate-in pre-animate-c graph6-icon1-animate govt-img1" src={require("../../../assets/images/gov1.png")} />
          <img className="graph6-icon2 animate-in pre-animate-c graph6-icon2-animate govt-img2" src={require("../../../assets/images/gov2.png")} />
          <img className="graph6-icon3 animate-in pre-animate-c graph6-icon3-animate govt-img3" src={require("../../../assets/images/gov3.png")} />
          <img className="graph6-icon4 animate-in pre-animate-c graph6-icon4-animate govt-img4" src={require("../../../assets/images/gov4.png")} />
          <img className="graph6-icon5 animate-in pre-animate-c graph6-icon5-animate govt-img5" src={require("../../../assets/images/gov5.png")} />
          <img className="graph6-icon6 animate-in pre-animate-c graph6-icon6-animate govt-img6" src={require("../../../assets/images/gov6.png")} />
          <img className="graph6-icon7 animate-in pre-animate-c graph6-icon7-animate govt-img7" src={require("../../../assets/images/gov7.png")} />

        </div>
        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].govt}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].govtPara1}</p>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].govtPara2}</p>
        </div>


      </div><hr />
      <div className='row align-items-center' style={{ position: "relative", marginBottom: "100px", minHeight: "285px" }}>

        <div className={`col-sm-12 col-md-6 ${currentLanguage==='Arabic'?'direction-rtl':''}`}>
          <h4 style={{ textAlign: "justify" }}>{translation[currentLanguage].ApiProd}</h4>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].ApiProdPara1}</p>
          <p style={{ textAlign: "justify" }}>{translation[currentLanguage].ApiProdPara2}</p>
        </div>

        <div className='col-sm-12 col-md-6'>
          <img className="graph7-clouds animate-in graph7-clouds-animate apiProd-img1" src={require("../../../assets/images/apiprod1.png")} />
          <img className="graph7-gear1 animate-in pre-animate-c apiProd-img2" src={require("../../../assets/images/apiprod2.png")} />
          <img className="graph7-gear2 animate-in pre-animate-c apiProd-img3" src={require("../../../assets/images/apiprod3.png")} />
          <img className="graph7-gear3 animate-in pre-animate-c apiProd-img4" src={require("../../../assets/images/apiprod4.png")} />
          <img className="graph7-macpro animate-in pre-animate-c apiProd-img5" src={require("../../../assets/images/apiprod5.png")} />
          <img className="graph7-iPad animate-in pre-animate-c apiProd-img6" src={require("../../../assets/images/apiprod6.png")} />

        </div>
      </div>

    </div>
  )
}

export default NationalAddress;