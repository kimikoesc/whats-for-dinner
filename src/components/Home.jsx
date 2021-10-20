import { useState, useEffect } from "react";
import { getAuth, signOut } from "firebase/auth";
import styled from "styled-components";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { HomeData } from "./Home-data";
import SubMenu from "./SubMenu";
import { IconContext } from 'react-icons/lib';
import store from '../store'
import '../styles/App.css';
import { doc, setDoc, getDoc } from '@firebase/firestore';
import db from "../firebase-config";

function Home(props) {
    const [sidebar, setSidebar] = useState(false);
    const { username } = props;

    const logout = () => {
        document.body.style.background = "background: rgb(63,94,251)";
        document.body.style.background = "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 83%)"; 

        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign out successful")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const showSidebar = () => setSidebar(!sidebar);

    const Nav = styled.div`
        background: #15171c;
        height: 80px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: fixed;
        z-index: 500;
    `
    const NavIcon = styled.div`
        margin-left: 2rem;
        font-size: 2rem;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `
    const SideBarNav = styled.nav`
        background: #15171c;
        width: 350px;
        height: 100vh;
        display: flex;
        position: fixed;
        left: ${({ sidebar }) => (sidebar ? '10' : '-100%')};
        transition: 350ms;
        z-index: 500;
    `;
    
    const SideBarWrap = styled.div`
        width: 100%;
    `;

    return (
        <div className="Home">
        <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
            <NavIcon>
            <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
            <h1 id="title">What's for dinner?</h1>
        </Nav>
        <SideBarNav sidebar={sidebar}>
            <SideBarWrap>
                <NavIcon>
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </NavIcon>
                <h1 id="greeting">Hello, {username}</h1>
                {HomeData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
                <button id="logout" onClick={ logout }>Sign Out</button>
            </SideBarWrap>
        </SideBarNav>
       </IconContext.Provider>
        </div>
    )
}

export default Home