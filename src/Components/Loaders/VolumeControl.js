import {React, useState} from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { VolumeDownFill } from 'react-bootstrap-icons';

const useStyles = makeStyles(theme => ({
    root: {
      width: 300 + theme.spacing(3) * 2
    },
    margin: {
      height: theme.spacing(3)
    }
  }));
  
  const PrettoSlider = withStyles({
    root: {
      color: "#52af77",
      width: 25,
      height: 8,
      "&div": {
        color: "blue"
      }
    },
    thumb: {
      height: 17,
      width: "17px !important",
      backgroundColor: "#e0006c",
      border: "4px solid #e0006c",
      marginTop: -8,
      marginLeft: -12,
      "&:focus,&:hover,&$active": {
        boxShadow: "inherit"
      }
    },
    active: { width: "14px" },
    track: {
      height: 24,
      width: "7px !important",
      borderRadius: 24,
      backgroundColor: '#e0006c'
    },
    rail: {
      height: 24,
      width: "7px !important",
      borderRadius: 240,
      opacity: 1,
      color: "#a0a0a0"
    }
  })(Slider);
const VolumeControl = ({onChange, value}) => {
    const classes = useStyles();
    const manageVolume = (event, value) => {
        onChange(value)
    }
    return (
        <>
        <div style={{ height: "15vh" }}>
            <PrettoSlider
                value={value}
                onChange={manageVolume}
                orientation="vertical"
                min={0.0}
                step={0.1}
                max={1}
            />
            
        </div>
        <VolumeDownFill style={{marginLeft:'45px'}} color="#e0006c" size={40} />
        </>
    )
}

export default VolumeControl
