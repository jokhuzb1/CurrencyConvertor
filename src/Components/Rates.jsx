import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormControl, Select, TextField } from '@material-ui/core';
import { setAmountToConvert, setBaseCurrency, setSecondCurrencyAt, setResult, setSecondCurrency } from './calculator';
import { addToSaved } from './saved';
import { makeStyles } from '@material-ui/core';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import axios from 'axios';
import moment from 'moment'

const Rates = () => {

    const classes = useStyles()
    const dispatch = useDispatch();
    const { history } = useSelector((state) => state.saved)
    const { result, baseCurrency, secondCurrency, secondCurrencyAt, amountToConvert } = useSelector((state) => state.calculator)

    const countries = ['aud', 'usd', 'uzs', 'rub', 'ars', 'brl', 'btc', 'byn', 'eur', 'gbp', 'ltc', 'nzd', 'sek', 'eth'].sort();


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}/${secondCurrency}.json`);
        let newDate = new Date().toString();

        let currentDate = moment(newDate).calendar()

        let converted = await response.data[secondCurrency] * amountToConvert;
        let currentRate = response.data[secondCurrency]
        dispatch(setSecondCurrencyAt(response.data[secondCurrency]))
        dispatch(setResult(converted))


        const convertion = {
            'amount': amountToConvert,
            'baseCurrency': baseCurrency,
            'secondCurrency': secondCurrency,
            'secondCurrencyAt': secondCurrencyAt,
            'converted': converted,
            'timeConverted': currentDate,
            'baseAmount': amountToConvert

        };
        dispatch(addToSaved(convertion))

    }


    return (

        < div className={classes.main}>

            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
                <div className={classes.topSec}>
                    <div className={classes.countryContent}>
                        <h3>From</h3>
                        <h3></h3>
                        <FormControl className={classes.country}
                            variant='outlined'
                            onChange={(e) => dispatch(setBaseCurrency(e.target.value))}
                        >
                            <Select native>
                                {countries.map((c, index) => (
                                    <option key={index}>{c}</option>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.countryContentLeft}>
                        <h3>To</h3>
                        <FormControl className={classes.country}
                            variant='outlined'
                            onChange={(e) => dispatch(setSecondCurrency(e.target.value))}>
                            <Select native>
                                {countries.map((c, index) => (
                                    <option key={index}>{c}</option>
                                ))}

                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={classes.topSec}>
                    <div className={classes.countryContent}>
                        <FormControl className={classes.amount} variant='outlined'>
                            <TextField onChange={(e) => dispatch(setAmountToConvert(e.target.value))} variant='outlined' placeholder='amount'>
                            </TextField>
                        </FormControl>
                    </div>
                    <div className={classes.countryContentLeft}>
                        <div className={classes.result}>
                            <h3>Converted: {result} {secondCurrency.toUpperCase()}</h3>
                        </div>
                    </div>
                </div>

                <Button className={classes.btn} variant='outlined' type='submit' >Convert</Button>


            </form>
        </div>
    );
}

export default Rates;
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
    topSec: {
        display: 'flex',
        flex: '12',
        justifyContent: 'start',
        textAlign: 'start',
    },
    country: {
        margin: '5px',
        width: '250px',
        display: 'flex',
        flex: '6',

    },
    countryContent: {
        width: '49%',
        height: '140px',
    },
    countryContentLeft: {
        marginLeft: "150px",
        width: '49%',
        height: '140px',
    },
    amount: {
        margin: '5px',
        width: '250px',
        display: 'flex',
        flex: '6',
    },
    result: {
        margin: '5px',
        color: "#3D56B2"
    },
    btn: {

        backgroundColor: "#3D56B2",
        "&:hover": {
            backgroundColor: '#5C7AEA',
        },
        color: 'white'
    },
    form: {



    }
})

{/* <div>
    <h1>Rates</h1>
    <h1>{result}</h1>
    <h1>{baseCurrency}</h1>
    <h1>{secondCurrency}</h1>
    <h1>Amount to convert: {amountToConvert}</h1>
    <TextField variant='outlined' onChange={(e) => dispatch(setAmountToConvert(e.target.value))} type='number' placeholder='amount'>
    </TextField>
    
</div> */}
// const changeValues = () => {
//     let a = baseCurrency
//     baseCurrency = dispatch(setBaseCurrency(secondCurrency));
//     secondCurrency = dispatch(setSecondCurrency(a));
//     console.log()
// }