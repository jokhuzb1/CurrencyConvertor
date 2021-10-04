import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';




const Chart = () => {

    const [currencies, setCurrencies] = useState('')
    function lastDays() {
        return '0123456'.split('').map(function (n) {
            var d = new Date();
            d.setDate(d.getDate() - n);

            return (function (day, month, year) {
                return [year, month < 10 ? '0' + month : month, day < 10 ? '0' + day : day].join('-');
            })(d.getDate(), d.getMonth(), d.getFullYear());
        }).join(',');
    }

    useEffect(() => {
        getData();

    }, [])
    let days = lastDays().split(',')
    console.log(days)
    const getData = async () => {

        const result = await axios.get(`https://freecurrencyapi.net/api/v2/historical?apikey=f735b9e0-24bf-11ec-a4cc-bb29add8495c&base_currency=AUD&date_from=${days[6]}&date_to=${days[0]}`)
        console.log(result.data)
        setCurrencies(...currencies, result.data)

    }

    return (
        <div>

        </div>
    );
}

export default Chart;
