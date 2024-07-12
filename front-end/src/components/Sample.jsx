"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Sample() {
    const [data, setData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/data')
            .then(response => {
                const responseData = response.data;
                console.log("Todos os dados: ");
                console.log(responseData);
            })
            .catch(error => console.error('Erro na requisição:', error));
    }, []);

    return (
        <div>
        </div>
    );
};