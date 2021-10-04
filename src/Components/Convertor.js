import React, { useEffect, useState } from 'react'
import { Button, FormControl, Select, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';


export default function Convertor() {

    const classes = useStyles()
    const countries = ['aud', 'usd', 'uzs', 'rub', 'ars', 'brl', 'btc', 'byn', 'eur', 'gbp', 'ltc', 'nzd', 'sek', 'eth'].sort();
    const [baseCurrency, setBaseCurrency] = useState('aud');
    const [secondCurrency, setSecondCurrency] = useState('aud');
    const [amount, setAmount] = useState(0);
    const [result, setResult] = useState(0);
    const [currencies, setCurrencies] = useState({})

    const submitHandle = async (e) => {
        e.preventDefault();
        // console.log(baseCurrency, secondCurrency, "amount", converted)
        const response = await axios.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${baseCurrency}/${secondCurrency}.json`)
        let converted = response.data[secondCurrency] * amount;
        console.log(converted)
        setResult(converted);
    }



    useEffect(() => {
        getData();

    }, []);
    const getData = async () => {
        const result = await axios.get('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json')
        console.log(result.data)
        setCurrencies(result.data)

    }
    return (
        <div >
            <form className={classes.main} onSubmit={(e) => submitHandle(e)}>
                <div className={classes.section}>
                    <h3>From</h3>
                    <FormControl className={classes.country}
                        variant='outlined'
                        onChange={(e) => setBaseCurrency(e.target.value)}>
                        <Select native>
                            {countries.map((c) => (
                                <option>{c}</option>
                            ))}

                        </Select>
                    </FormControl>

                    <FormControl className={classes.amount} variant='outlined'>
                        <TextField onChange={(e) => setAmount(e.target.value)} variant='outlined' placeholder='amount'>
                        </TextField>
                    </FormControl>
                </div>


                <div className={classes.section}>
                    <h3>To</h3>
                    <FormControl className={classes.country}
                        variant='outlined'
                        onChange={(e) => setSecondCurrency(e.target.value)}
                    >
                        <Select native>
                            {countries.map((c) => (
                                <option>{c}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <div className={classes.result} variant='outlined'>
                        <Container maxWidth="sm">
                            <Box className={classes.paper}>
                                <h3>{result} {secondCurrency.toUpperCase()}</h3>
                            </Box>
                        </Container>
                    </div>

                    <Button className={classes.btn} type='submit'>Convert</Button>

                </div>
            </form>

        </div >
    )
}

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

    section: {
        textAlign: 'start',
        flex: '6',
        height: "300px",




    },
    field: {
        width: '350px',
        height: '140px',

    },
    amount: {
        marginTop: '16px',
        position: 'relative',
        width: '250px'


    },
    btn: {
        marginTop: '20px',
        marginLeft: '170px',
        position: 'relative',
        backgroundColor: "#3D56B2",
        "&:hover": {
            backgroundColor: '#5C7AEA',
        },
        color: 'white'
    },

    country: {
        width: '250px'
    },
    result: {
        border: '1px solid grey',
        borderRadius: '4px',
        marginTop: '16px',
        // display:'block',
        width: '250px',
        height: '50px',
        textAlign: 'center'

    },


})

