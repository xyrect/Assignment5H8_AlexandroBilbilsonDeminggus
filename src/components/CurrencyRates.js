import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const currencies = ['CAD', 'EUR', 'IDR', 'JPY', 'CHF', 'GBP'];

const CurrencyRates = () => {
    const [rates, setRates] = useState([]);
    const API_KEY = '510e13ebb9dd41d3bbbbd59db6b98926';

    useEffect(() => {
        fetch(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const ratesData = currencies.map(currency => {
                const exchangeRate = parseFloat(data.rates[currency]);
                return {
                    currency,
                    exchangeRate: exchangeRate.toFixed(4),
                    weBuy: (exchangeRate * 1.05).toFixed(4),
                    weSell: (exchangeRate * 0.95).toFixed(4),
                };
            });
            setRates(ratesData);
        })
        .catch(error => console.log('Error fetching data', error));
    }, []); 

    return (
        <div className="text-center p-5" style={{ backgroundColor: '#FA812F', color: '#fff', minHeight: '100vh' }}>
            <div className="table-responsive d-flex justify-content-center w-100 mt-5">
                <table striped bordered hover size="lg" style={{ fontSize: '1.6rem' }}>
                    <thead>
                        <tr>
                            <th>Currency</th>
                            <th>We Buy</th>
                            <th>Exchange Rate</th>
                            <th>We Sell</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rates.map(rate => (
                            <tr key={rate.currency}>
                                <td>{rate.currency}</td>
                                <td>{rate.weBuy}</td>
                                <td>{rate.exchangeRate}</td>
                                <td>{rate.weSell}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className="mt-4" style={{ fontSize: '1rem' }}>
                Rates are based from 1 USD.<br />
                This application uses API from <a href="https://currencyfreaks.com" style={{ color: '#fff', paddingTop: '' }}>https://currencyfreaks.com</a>
            </p>
        </div>
    );
};

export default CurrencyRates;
