import React, {useState} from 'react'
import Draggable from 'react-draggable';

const Text = () => {
    
    const [editMode, setEditMode] = useState(false)
    const [size, setSize] = useState('s')
    const [val, setVal] = useState("Double Click to Edit")
    
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
    <Draggable >
        {
            editMode ? (
                <div style={{position:"absolute", display:'flex', width:'350px'}}>
                    <input 
                        style={inputStyle}
                        onDoubleClick={(e)=>{
                            setEditMode(false)
                            if(val=="")
                                setVal("Double Click to Edit")
                    }} 
                    value={val} 
                    onChange={(e)=>{ setVal(e.target.value)}} 
                    placeholder='Click to Edit'
                    />
                    <select 
                        class="form-control form-control-sm" 
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
                <div 
                    style={textStyle}
                    onClick={(e)=> {
                        setEditMode(true)
                        if(val=="Double Click to Edit")
                            setVal("")
                    }}
                >
                    {val}
                </div>
               
            )
        }
        
    </Draggable>
  )
}

export default Text