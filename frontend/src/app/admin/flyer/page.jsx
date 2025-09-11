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
        <h1 className="text-2xl font-bold mb-4">Flyer Page</h1>
        <p>This is the flyer page content.</p>
    </div>
  )
}
