import React from "react";
import { useState,useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { TextField,FormControl,Button,Snackbar,SpeedDial,SpeedDialAction,SpeedDialIcon } from "@mui/material";
import Display from "./display";
import Bin from "./bin";
function  Form(){
    const [isDisabled,setDisabled]=useState(true);
    const [title,setTitle]=useState("");
    const [desc,setDesc]=useState("");
    const [isDeleted,]=useState(false);
    const [isCompleted,]=useState(false);
    const [open,setOpen]=useState(false);
    const [value,setValue]=useState(-1);
    const [click,setClick]=useState(false);
    useEffect(()=>{
        if (!title?.length || !desc?.length || title === undefined || desc === undefined){
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    },[title,desc,isDeleted]);
    
    const updateValue=(value)=>{
        let displayData = JSON.parse(localStorage.getItem('form'))
        setTitle(displayData[value][0]['title']);
        setDesc(displayData[value][1]['desc']);
        setValue(value);
    }
    const clicked=()=>{
        if (click)
            setClick(false);
        else
            setClick(true);
    }
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );      
    const handleSubmit = async (event) => {
        event.preventDefault();
        let oldData = JSON.parse(localStorage.getItem('form'))
        if (!oldData){
            localStorage.setItem('form',JSON.stringify([[{title},{desc},{isCompleted},{isDeleted}]]));
        } else {
            console.log(value);
            if (value===-1){
            localStorage.setItem('form',JSON.stringify([...oldData,[{title},{desc},{isCompleted},{isDeleted}]]));
            } else{
                oldData[value][0]={title};
                oldData[value][1]={desc};                
                localStorage.setItem('form', JSON.stringify(oldData));
                setValue(-1);
            }
        }
        setOpen(true);
        setTitle("");
        setDesc("");
        await delay(1000);
        setOpen(false);
    }
    const actions = [
        { icon: <Button onClick={clicked}><DeleteIcon/></Button>, name: 'recycle_bin', value:'Recycle Bin' },
      ];
    return(
    <center>
        <FormControl className="form" sx={{marginBottom:"10px"}}>
            <TextField id="outlined-required" variant="outlined" size="small" label="Title" name="title" value={title} placeholder="Enter title" onChange={(e)=>{setTitle(e.target.value)}}/><br/>
            <TextField variant="outlined" multiline label="Description" rows={5} type="textarea" name="desc" value={desc} placeholder="Enter description" onChange={(e)=>{setDesc(e.target.value)}}/><br/>
            <Button variant="contained" name="submit" disabled={isDisabled} onClick={handleSubmit}>Submit</Button>
        </FormControl>
        <Snackbar open={open} autoHideDuration={2000} message="Successfully saved in local storage"/>
        <Display onClick={(value)=>(updateValue(value))}/>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.value}
            />
            ))}
        </SpeedDial>
        { click?
        <Bin open={click}/>
         :<></>}
    </center>
    );
}
export default Form;