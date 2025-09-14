"use client";

import { useAppSelector } from "@/lib/hooks";

export default function page() {
    const id = useAppSelector((state) => state.userId);
    const username = useAppSelector((state) => state.username);
    const role = useAppSelector((state) => state.role);
  
    console.log("HHOOMME",id);
    console.log("HHOOMMEE UUSSEERRMMAE-----",username);
    console.log("HHOOMMEE ROLLEE-----",role);
  return (
    <div>
        <h1>Hello from admin panel</h1>
    </div>
  )
}
