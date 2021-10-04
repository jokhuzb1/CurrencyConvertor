import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
} from "recharts";
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/core'
import { format, parseISO, subDays } from "date-fns";
import { useState, useEffect } from 'react';
import axios from 'axios'
import { FormControl, Select, Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

// const numbers = [];
const resp = []

const numbers = [];
for (let num = 30; num >= 0; num--) {
    numbers.push({
        date: subDays(new Date(), num).toISOString().substr(0, 10),
        value: 1 + Math.random()
    });
}
let lastItem = numbers.length - 1;
console.log(numbers[0]["date"]);
console.log(numbers[lastItem]["date"]);


export default function Charts() {
    const dispatch = useDispatch();
    const { history } = useSelector((state) => state.saved)
    console.log(history.length)
    console.log()

    const [complete, setComplete] = useState(false);
    const countries = ['AUD', 'USD', 'UZS', 'RUB', 'ARS', 'BRL', 'BTC', 'BYN', 'EUR', 'GBP', 'LTC', 'NZD', 'SEK', 'ETH'].sort();
    const [currency, setCurreny] = useState('aud')
    const [secondCurrency, setSecondCurrency] = useState('USD')
    const classes = useStyles()

    useEffect(() => {
        getData()

    }, [])

    const getData = async () => {
        if (history.length > 0) {
            console.log(history[history.length - 1].baseCurrency)
            setCurreny(history[history.length - 1].baseCurrency)
            setSecondCurrency(history[history.length - 1].secondCurrency)

            const result = await axios.get(`https://freecurrencyapi.net/api/v2/historical?apikey=f735b9e0-24bf-11ec-a4cc-bb29add8495c&base_currency=${currency}&date_from=${numbers[0]["date"]}&date_to=${numbers[lastItem]["date"]}`)
            const res = await result.data.data
            for (let num = 0; num <= lastItem - 2; num++) {
                resp.push({
                    date: numbers[num]['date'],
                    value: res[numbers[num]['date']][secondCurrency]
                })
                setComplete(true)
            }
        }
    }


    const submitHandle = (e) => {
        e.preventDefault()

    }


    return (
        <div>
            {history.length < 1 && <div>
                <h2>Chart will appear after first convertion</h2>
                <CircularProgress /></div>}
            {history.length > 0 &&
                <div>
                    <h3>Time series of recent convertion for last 4 weeks</h3>
                    <div className={classes.main}>


                        <ResponsiveContainer width='100%' height={300}>
                            <AreaChart data={resp}>
                                <Area dataKey="value" />
                                <XAxis dataKey="date" />
                                <YAxis dataKey='value' />
                                <Tooltip />
                            </AreaChart>
                        </ResponsiveContainer>

                    </div >
                </div>
            }
        </div>
    )
}

const useStyles = makeStyles({
    main: {

        margin: 'auto',
        marginTop: '50px',
        marginBottom: '180px',
        width: '60%',
        border: 'none',
        padding: '20px',
        display: 'flex',
        backgroundColor: 'lightgrey',
        justifyContent: 'center'

    },
    country: {
        margin: '15px'
    }
});