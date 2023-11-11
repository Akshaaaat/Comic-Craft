import React, {useState, useEffect, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Text from './Text';
import html2canvas from 'html2canvas';
import '../css/inputForm.css'

const InputForm = (props) => {
    const navigate=useNavigate()
    const [comic, setComic] = useState(null);
    const [loading, setloading] = useState(false)
    const addToStrip = props.addToStrip
    const divRef = useRef(null)
    const [textCount, setTextCount] = useState(0)

    async function query(data) { //Fetch function
        setloading(true)
        const response = await fetch(
            "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
            {
                headers: { 
                    "Accept": "image/png",
                    "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                    "Content-Type": "application/json" 
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        
        
        const result = await response.blob();
        const objectURL = URL.createObjectURL(result);
        console.log(result, objectURL)
        setloading(false)
        // setComic(objectURL)

         //test
        // const res = await fetch('https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw');
        
        // const blob = await res.blob();
        // const objectt = URL.createObjectURL(blob);
        // console.log(blob, objectt)
        setComic(objectURL);
    }

    const handleSubmit = (e) =>{

        //Taking Inputs from the from
        e.preventDefault()
        const desc  = document.querySelector('.comic-desc-input')
        if(desc && desc.value)
            query({"inputs": desc.value})
        //desc.value = ""

    }

    const handleClear = (e) =>{
        e.preventDefault()
        const desc  = document.querySelector('.comic-desc-input')
        desc.value = "";
        setloading(false)
        setComic(null)
        setTextCount(0)
    }

    const addText=(w)=>{
        w.preventDefault()
        setTextCount(textCount+1)
    }  
    
    const handleExport = (e) => {
        e.preventDefault()
        if (divRef.current) {
          html2canvas(divRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'exported-image.png';
            link.click();
          });
        }
    }

    const handleSave = (e) =>{
        e.preventDefault()
        if (divRef.current) {
          html2canvas(divRef.current).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            addToStrip(imgData)
          });
        }
    }

  return (
    <div className='homePageContainer'>
        <div className="card my-3 mainCard">
            <div className="card-body cardBody">
                <Link to='/' className='backBtn'>
                    <span class="material-symbols-outlined">
                        arrow_back
                    </span>
                </Link>
                <h4 className="card-title">Create Comic Here</h4>

                <form className='d-flex flex-column'>
                    <div>
                        <textarea type="text" className="comic-desc-input" id="desc1" rows="3" placeholder='Enter Image Description'/>
                    </div>
                    <button className="buttonCss submitButton" disabled={loading} onClick={handleSubmit}>Generate Image</button>
                    <div className="dividerLine"></div>

                    <div className='my-1 buttonsDiv'>
                        <div className="d-flex my-2 justify-content-between">
                            <button className="buttonCss submitButton2" disabled={!comic} onClick={addText}>Add Text</button>
                            <button className="buttonCss submitButton2 redd" onClick={handleClear}>Clear</button>
                        </div>
                        <div className="btnSubDiv">
                            <button className="buttonCss submitButton2" disabled={!comic} onClick={handleExport}>Download</button>
                            <button className="buttonCss submitButton2" disabled={!comic} onClick={handleSave}>Add to Comic</button>
                        </div>
                    <Link to='/comics' className='viewComicBtn'>
                        Comic
                        <span class="material-symbols-outlined">
                            auto_stories
                        </span>
                    </Link>
                    </div>
                    
                    <div className="dividerLine"></div>
                    <div className="instructions">*Double Click on Created Textbox to Edit</div>
                    <div className="instructions">**Double Click on Edited Textbox to Save</div>

                    
                </form>
            </div>
        </div>
        <div className="result">
            {
                comic? (
                    <div className='comicBox' ref={divRef}>
                        <img src={comic} className="fetchedImage" alt="Fetched Image" />
                        {
                            Array(textCount).fill(0).map((e)=>(
                                <Text />
                            ))
                        }
                    </div>
                ):(
                    loading ? (
                        <div className='imagePlaceholder'>
                            <div className="spinner-border text-light m-3" role="status">
                               <span className="visually-hidden" >Loading...</span>
                            </div>
                      </div>
                    ):(
                        <div className='comicBox instrucBox'>
                            <div className='instruc'>
                                <div>Enter description and click "Generate Image"</div>
                                <div>Add chat bubbles with "Add Text" button</div>
                                <div>Double-click on a bubble to enter editing mode</div>
                                <div>Edit text or appearance in editing mode</div>
                                <div>Save changes by double-clicking on the edited bubble</div>
                                <div>Download the final image or add to a comic strip</div>
                                <div>View and manage comic strips with the "Comic" button</div>

                            </div>
                        </div>
                    )
                )
            }



             {/* {
                Array(textCount).fill(0).map((e)=>(
                    <Text />
                ))
            } */}
           
            
        </div>

    </div>
  )
}

export default InputForm