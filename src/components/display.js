import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Button} from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function Display (props) {
    const [isCompleted,setCompleted]=useState(false);
    const [isDeleted,setDeleted]=useState(false);
    const [isUpdated,setUpdated]=useState(false);
    let displayData = JSON.parse(localStorage.getItem('form'));
    const deleteItem=(event,item,value)=>{
        console.log(value);
        item[3]={"isDeleted":true};
        displayData[value] = item;
        localStorage.setItem('form', JSON.stringify(displayData));
        setDeleted(true);
    }
    const completeItem=(event,item,value)=>{
        console.log(value);
        item[2]={"isCompleted":true};
        displayData[value] = item;
        localStorage.setItem('form', JSON.stringify(displayData));
        setCompleted(true);
    }
    const updateItem=(event,value)=>{
        console.log(value);
        props.onClick(value);
    }
    useEffect(()=>{
        setCompleted(false);
    },[isCompleted]);
    useEffect(()=>{
        setDeleted(false);
    },[isDeleted]);
    useEffect(()=>{
        setUpdated(false);
    },[isUpdated]);
    return(
        <TableContainer component={Paper}>
            <Table sx={{marginTop:"5px",width:"70%"}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{"&:hover":{bgcolor:"#444"}}}>
                        <TableCell><b>Title</b></TableCell>
                        <TableCell><b>Description</b></TableCell>
                        <TableCell><b>Edit</b></TableCell>
                        <TableCell><b>Mark as Completed</b></TableCell>
                        <TableCell><b>Delete</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayData?.map((item,index)=>(!item[3].isDeleted?
                        <TableRow key={index} sx={{"&:hover":{color:"#666 !important",background:"#AAA"}}}>
                            <TableCell width={300}><b>{item[0].title}</b></TableCell>
                            <TableCell width={500}>{item[1].desc}</TableCell>
                            <TableCell width={100}><Button onClick={(event)=>updateItem(event,index)} value={isUpdated}><EditIcon sx={{"&:hover":{color:"#00f"}}}/></Button></TableCell>
                            <TableCell width={300}><Button value={isCompleted} onClick={(event)=>completeItem(event,item,index)} disabled={item[2].isCompleted}>{!item[2].isCompleted?<CheckCircleOutlineIcon sx={{"&:hover":{color:"#0f0"}}}/>:<CheckCircleIcon sx={{color:"#0f0"}}/>}</Button></TableCell>
                            <TableCell><Button value={isDeleted} onClick={(event)=>deleteItem(event,item,index)}><DeleteIcon sx={{"&:hover":{color:"#f00"}}}/></Button></TableCell>
                        </TableRow>:<></>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}