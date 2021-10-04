import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';




export default function History() {

    const dispatch = useDispatch();
    const { history } = useSelector((state) => state.saved)
    const classes = useStyles()
    const currentRates = []


    return (
        <div>
            {history.length < 1 &&
                <>
                    <h1>Waiting for actions  <CircularProgress /></h1>
                    <small><p>list of past convertions will appear here</p></small></>}
            {history.length > 0 &&

                < TableContainer className={classes.main} component={Paper} >
                    <Table sx={{ maxWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Base Currency</TableCell>
                                <TableCell align="right">Converted To</TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Rate</TableCell>

                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {history.length > 0 &&

                                history.map((h, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {h.baseAmount}  {h.baseCurrency.toUpperCase()}
                                        </TableCell>
                                        <TableCell align="right">{h.converted.toFixed(2)} {h.secondCurrency.toUpperCase()}</TableCell>
                                        <TableCell align="right">{h.timeConverted}</TableCell>
                                        <TableCell align="right"> 1 {h.baseCurrency} {h.converted.toFixed(1)} {h.secondCurrency}</TableCell>

                                    </TableRow>
                                ))

                            }

                        </TableBody>
                    </Table>
                </TableContainer >
            }
        </div>


    );
}

const useStyles = makeStyles({
    main: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})