import React from "react";
import { Link } from "react-router-dom";
import s from './Home.module.css'
export default function Home() {
    return (<div>
        <Link to='/home' className={s.welcome}><img src='cooking.png' alt="lala" /></Link>
    </div>)
}

