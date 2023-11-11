import React, { useState, useRef } from 'react';
import '../css/comicStrip.css'
import html2canvas from 'html2canvas';
import {Link, useNavigate} from 'react-router-dom'

function ComicStrip(props) {
    const navigate=useNavigate()
    const {comicStrip, setComicStrip} = props
    const divRef = useRef(null)

    const deleteImg = (e, index)=>{
        e.preventDefault()
        let temp = comicStrip
        temp.splice(index, 1);
        setComicStrip(temp)
        navigate('/comics')
    }

    const handleExport = (e) => {
        e.preventDefault()
        const temp = document.querySelector('.screenShotter')
        temp.style.display='block';
        if (divRef.current) {
          html2canvas(divRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'exported-image.png';
            link.click();
          });
        }
          temp.style.display='none'
        
    }

  return (
    <>
    <div className='mainContainer'>
        <Link to='/' className='backButton'>
            <span className="material-symbols-outlined">
                home
            </span>
        </Link>
        {
          (comicStrip.length==0) && <div className="emptyMessage">
            No Comic Created
          </div>
        }
        {
          (comicStrip.length>0) && <div className='scroll-container'>
              <button className='saveButton' onClick={handleExport}>
                <span className="material-symbols-outlined">
                  download
                </span>
              </button>
              <div className="content insideContent">
                  {comicStrip.map((imageData, index) => (
                      <div className="imageContainer" key={index}>
                          <button className="cross" onClick={(e)=>{deleteImg(e, index)}}>x</button>
                          <img src={imageData} alt={`Comic Strip Image ${index}`} />
                      </div>
                  ))}
              </div> 
          </div>
        }
    </div>

    <div className="screenShotter" ref={divRef}>
        {comicStrip.map((imageData, index) => (
            <div className="imageSS" key={index}>
                <img src={imageData} alt={`Comic Strip Image ${index}`} />
            </div>
        ))}
    </div> 

    </>
  );
}

export default ComicStrip;
