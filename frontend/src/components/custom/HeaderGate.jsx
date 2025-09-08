"use client";
import { useAppSelector } from "@/lib/hooks";
import Header from './Header';
export default function HeaderGate() {
    const role = useAppSelector((state) => state.role);

    if(role === "ADMIN"){
        return <></>;
    }else{
        return <Header />;
                
    }
    // return (
    //     <div>
    //         {role === "ADMIN" ?
    //             <div className="container mx-auto px-4">
    //                 {children}
    //             </div>
    //             :
    //             <div className="container mx-auto px-4">
    //                 <Header />
    //                 {children}
    //             </div>
    //         }
    //     </div>
    //)
}
