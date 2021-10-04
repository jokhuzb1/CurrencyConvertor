import { makeStyles } from '@material-ui/core'
import Box from '@mui/material/Box';
import Convertor from './Convertor';
import React, { useState } from 'react';
import { Tabs, Tab, AppBar } from '@material-ui/core'
import Rates from './Rates'
import History from './History'
import Charts from './Charts'
import Chart from './Chart'
const Main = () => {

    const classes = useStyles()

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    return (
        <>
            <div className={classes.main}>
                <Tabs value={selectedTab} onChange={handleChange} >
                    <Tab label='Rates' />
                    <Tab label='Charts' />
                    <Tab label='Saved' />

                </Tabs>
            </div>
            {selectedTab === 0 && <Rates />}
            {selectedTab === 1 && <Charts />}
            {selectedTab === 2 && <History />}
        </>
    );
}

export default Main;


const useStyles = makeStyles({
    main: {

        margin: 'auto',
        marginTop: '50px',
        width: '50%',
        border: 'none',
        padding: '10px',
        display: 'flex',

        justifyContent: 'center'



    },
});