import React from "react";
import { Link } from "react-router-dom";
import './Home.css'
export default function Home() {
    return (<div className="Welcome">
        <Link to='/home'>Comenza tu aventura culinaria</Link>
    </div>)
}
