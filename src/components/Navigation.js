import React from "react";
import {NavLink} from "react-router-dom";

export const Navigation = () =>
    (
        <nav>
            <div >
                <NavLink  to='/'>Home</NavLink>
            </div>
                <div>
                    <ul >
                        <li>
                            <NavLink
                                to='/books'
                            >Books
                            </NavLink>
                        </li>
                    </ul>
            </div>
        </nav>

    )
