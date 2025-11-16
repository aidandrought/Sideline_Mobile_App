import { useEffect, useState } from "react";


export default function useLiveMinute(startedAt) {
const [m, setM] = useState(calc(startedAt));
useEffect(() => {
const id = setInterval(() => setM(calc(startedAt)), 5000);
return () => clearInterval(id);
}, [startedAt]);
return m;
}


function calc(startedAt) {
const diff = Math.floor((Date.now() - startedAt) / 60000);
return diff < 0 ? 0 : diff;
}