import React from "react";
import { Link } from "react-router-dom";
import s from './Home.module.css'
export default function Home() {
    return (<div>
        <Link to='/home' className={s.welcome}><h2>Comenza tu aventura culinaria</h2></Link>
    </div>)
}

