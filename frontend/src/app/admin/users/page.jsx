"use client"
import UsersTable from "@/components/custom/UsersTable";
import { useAppSelector } from "@/lib/hooks";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function page() {
    const [users, setUsers] = useState([]);

    const role = useAppSelector((state) => state.role);
    
    console.log("HHOOMME",role);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users/getAllUser');
                console.log('User data:', response.data);
                console.log('User data:', response.data.data);

                if (response.data.success) {
                    alert('User data fetched successfully');
                    setUsers(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching flyer data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="w-full">
                <h1 className="mb-4 text-lg font-semibold">Users</h1>
                <UsersTable initialUsers={users} />
            </div>
        </div>
    )
}
