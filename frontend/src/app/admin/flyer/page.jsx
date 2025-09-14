import axios from 'axios';
import { useEffect } from 'react';

export default function page() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flyer');
                console.log('Flyer data:', response.data);
            } catch (error) {
                console.error('Error fetching flyer data:', error);
            }
        };

        fetchData();
    }, []);

    return (
    <div>
        
    </div>
  )
}
