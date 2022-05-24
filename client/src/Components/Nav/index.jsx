import React from 'react';
import { NavLink } from 'react-router-dom';
import s from'./Nav.module.css';

export default function NavBar() {
    
    return (
        <header>
            <nav >
                <NavLink to="/createRecipe" className={s.links}>Crea tu receta</NavLink>
                <NavLink to="/home" className={s.links}>Home</NavLink>
            </nav>
        </header>
    )
}