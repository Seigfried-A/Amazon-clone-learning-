import React from 'react'

import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../firebase';

function Header() {

const [{ basket, user }, dispatch] = useStateValue()

const signoutHandler = () => {

    if (user) {
        auth.signOut();
    }
}


    return (
        <div className ='header' >
            <Link to="/">
            <img 
                className="header__logo"
                src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
            </Link>
            <div className="header__search">
                <input className="header__searchInput"
                type="text" />
                <SearchIcon 
                className="header__searchIcon"/>
                    
            </div>
            
            <div className= "header__nav" >
                <Link to= { !user && '/signIn'} style={{textDecoration: 'none'}}>
                <div className="header__option" onClick={signoutHandler}>
                    <span className="option1">Hello, {user ? user?.email : 'Guest'} </span>
                    <span className="option2">{ user ? 'Sign Out' : 'Sign in'}</span>
                </div>
                </Link>
                <div className="header__option">
                    <span className="option1">Returns</span>
                    <span className="option2">&Orders</span>
                </div>
                <div className="header__option">
                    <span className="option1">Your</span>
                    <span className="option2">Prime</span>
                </div>
                <Link to="/checkout"> 
                <div className="header__basket" > 
                    <ShoppingBasket />
                    <span className="option2 header__basketCount" >{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
