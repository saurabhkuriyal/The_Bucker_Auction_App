"use client"
import axios from 'axios';
import { useEffect } from 'react';

export default function page() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getAllUser');
                console.log('User data:', response.data);
            } catch (error) {
                console.error('Error fetching flyer data:', error);
            }
        };

        fetchData();
    }, []);

    return (
    <div>
                <h1>hello from admin user page</h1>
    </div>
  )
}
