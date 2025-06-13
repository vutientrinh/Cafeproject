import { useState, useEffect } from 'react';
import axios from 'axios';
import authHeader from "../services/authHeader";


const useFetch = (stringUrl) => {
    const [data, setData] = useState([]);
    const [status, setStatus] = useState('process');

    useEffect(() => {
        axios.get(stringUrl, { headers: authHeader() })
            .then(response => {
                if (response.data.result && response.data.result.length > 0) {
                    setData(response.data.result);
                    setStatus('finish');
                } else {
                    setStatus('empty');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                setStatus('error');
            });
    }, [stringUrl]);
    return [data, status, setData];
}


export default useFetch;
