import { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { HomeData } from "./Home-data";
import SubMenu from "./SubMenu";
import { IconContext } from 'react-icons/lib';

function Home(props) {
    const [sidebar, setSidebar] = useState(false);

    // const logout = () => {
    //     const auth = getAuth();
    //     signOut(auth).then(() => {
    //         console.log("Sign out successful")
    //     })
    //     .catch((err) => {
    //         console.log("Something went wrong! Please try again.")
    //     })
    // }
    {/* <h3> Hey there, {username}! </h3>
    <button onClick={ logout }>Sign Out</button> */}

    const showSidebar = () => setSidebar(!sidebar);

    const Nav = styled.div`
        background: #15171c;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `
    const NavIcon = styled(Link)`
        margin-left: 2rem;
        font-size: 2rem;
        height: 80px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    `
    const SideBarNav = styled.nav`
        background: #15171c;
        width: 250px;
        height: 100vh;
        display: flex;
        justify-content: center;
        position: fixed;
        top: 0;
        left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
        transition: 350ms;
        z-index: 10;
    `;
    
    const SideBarWrap = styled.div`
        width: 100px;
    `;

    return (
        <div className="Home">
        <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
            <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
        </Nav>
        <SideBarNav sidebar={sidebar}>
            <SideBarWrap>
                <NavIcon to="#">
                    <AiIcons.AiOutlineClose onClick={showSidebar}/>
                </NavIcon>
                {HomeData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
            </SideBarWrap>
        </SideBarNav>
       </IconContext.Provider>
        </div>
    )
}

export default Home