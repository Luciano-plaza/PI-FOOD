import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';

export default function NavBar() {
    
    return (
        <header className="navbar">
            <nav>
                <NavLink to="/home" >Home</NavLink>
                <NavLink to="/createRecipe" >Crea tu receta</NavLink>
            </nav>
        </header>
    )
}