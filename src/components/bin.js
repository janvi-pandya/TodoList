import React, { useEffect } from "react";
import {List,ListItem,ListItemText,IconButton, Tooltip} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
export default function Bin(props){
  let displayData=JSON.parse(localStorage.getItem('form'));
  const [open, setOpen] = React.useState(props.open);
  const [restore, setRestore] = React.useState(false);

  useEffect(()=>{
    if(!props.open && !open)
      setOpen(true);
  },[open,props.open,restore])
  const handleClose = () => {
    setOpen(false);
  };
  const handleRestore = (event,value) => {
    setOpen(false);
    displayData[value][3]['isDeleted']=false;
    localStorage.setItem('form', JSON.stringify(displayData));
    setRestore(!restore);
  };
  return (
    <Dialog open={open} sx={{width:"100%"}} onClose={handleClose}>
      <DialogTitle>Recycle Bin</DialogTitle>
        <List sx={{ width: '100%', maxWidth: 1000, bgcolor: 'background.paper' }}>
        {displayData.map((value,index) => value[3].isDeleted?(
            <ListItem
                key={index}
                secondaryAction={
                  <Tooltip title="Restore" placement="right">
                    <IconButton edge="end">
                        <RestoreIcon onClick={(event)=>handleRestore(event,index)}/>
                    </IconButton>
                  </Tooltip>
                }
            >
                
                <ListItemText id={index} primary={`${value[0].title+' '+value[1].desc}`} />
            </ListItem>
            ):<></>)}
        </List>
    </Dialog>
  );
}