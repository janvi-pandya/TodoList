import styled,{keyframes} from 'styled-components';
import {bounce} from 'react-animations';
import './App.css';
import Form from './components/form';
import {motion} from "framer-motion";
import { Component } from 'react';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
const Bounce=styled.div`animation:2s ${keyframes`${bounce}`} infinite`;
export default class App extends Component {
  render(){
    return (
      <>
        <Bounce>
          <motion.div className="App" whileHover={{ scale: 1.25 }} whileTap={{ scale: 1.1 }}>
              <h1><FormatListBulletedIcon/>&nbsp;
            {"ToDo List".split("").map((letter, index)=>(
            <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
            >
              {letter}
            </motion.span>
            ))}
            </h1>
          </motion.div>
        </Bounce>
        <Form/>
      </>
    );
  }
}
