import React, {useState} from 'react'
import Draggable from 'react-draggable';

const Text = () => {
    
    const [editMode, setEditMode] = useState(false)
    const [size, setSize] = useState('s')
    const [val, setVal] = useState("Double Click to Edit")
    const [clickCount, setClickCount] = useState(0);
    const [touch , setTouchMode] = useState(0);
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;


    const handleClick1 = () => {
        if('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)return;
        // // console.log("its a click")
        setClickCount((prevCount) => prevCount + 1);
    
        
        setTimeout(() => {
          setClickCount(0);
        }, 300);
    
        if(clickCount>=1)
        {
            setEditMode(false)
             if(val==="") 
             setVal("Double Click to Edit")
             setClickCount(0);
        }  
        
      };
      const handleTouch1 = () => {
        setClickCount((prevCount) => prevCount + 1);
      
        // console.log("its a touch in edit")
        
        setClickCount((prevCount) => prevCount + 1);
    
        
        setTimeout(() => {
          setClickCount(0);
        }, 300);
     // console.log(clickCount)
        if(clickCount>=1)
        { // console.log("double tap in edit")
            setEditMode(false)
             if(val==="") 
             setVal("Double Click to Edit")
             setClickCount(0);
        }  
        
      };
      const handleClick2 = () => {
        if('ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)return;
        setClickCount((prevCount) => prevCount + 1);
        // console.log("its a click")
        
        setTimeout(() => {
          setClickCount(0);
        }, 300); 
    
        if(clickCount>=1)
        {
        setEditMode(true)
            // console.log("i just clicked this");
            if(val==="Double Click to Edit")
                setVal("")
            setClickCount(0);
        }
        
        
      };
      const handleTouch2= () => {
        setClickCount((prevCount) => prevCount + 1);
      
        // console.log("its a touch")
        
        setTimeout(() => {
          setClickCount(0);
          
        }, 300); 
    
        if(clickCount>=1)
        {
        setEditMode(true)
            // console.log("i just clicked this");
            if(val==="Double Click to Edit")
                setVal("")
            setClickCount(0);
        }
        
        
        
      };
     
     
      
    
    const textStyle = {
        backgroundColor: '#fff',
        position:'absolute',
        border: '2px solid #000',
        borderRadius: `${size==='s'?'10px':'11px'}`,
        padding: `${size==='s'?'9px 15px':'12px 20px'}`,
        maxWidth: `${size==='s'?'275px':'348px'}`,
        margin: '0',
        textAlign: 'center',
        fontFamily: 'Comic Sans MS, cursive',
        fontSize: `${size==='s'?'14px':'17px'}`,
        lineHeight: '1.4',
        color: '#000',


      };

      const inputStyle = {
        width: '250px',
        padding: '5px',
        margin: '0',
        borderRadius:'3px'

      }

      const positionOfChatbox = {
        position:'absolute',
        display: 'flex', 
        alignItems: 'flex-start', 
        margin: '10px'
      }
  // add edit button on hover editable

  return (
     <>
        {
            editMode ? (
                
                <div style={{position:"absolute", display:'flex', width:'350px'}} draggable = {true}>
                    <input 
                        style={inputStyle}
                        onClick={handleClick1} 
                        onTouchStart={handleTouch1}
                    value={val} 
                    onChange={(e)=>{ setVal(e.target.value)}} 
                    placeholder='Click to Edit'
                    />
                    <select 
                        className="form-control form-control-sm" 
                        style={{width:'45px', textAlign:'center'}}
                        value={size}
                        onChange={(e)=>{
                            setSize(e.target.value);
                        }}
                    >
                        <option value="s">Sm</option>
                        <option value="l">Lg</option>
                    </select>
                </div>
            ):(
                <Draggable>
                <div
                    style={textStyle}
                    onClick={handleClick2}
                    onTouchStart={handleTouch2}

                >
                    {val}
                </div>
                </Draggable>
               
            )
        }
        
    </>
  )
}

export default Text

