import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";

export const HomeData = [
    {
        title: "Inventory",
        path: "/inventory",
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                title: "Hello",
            }
        ]
    },
    {
        title: "Add Ingredients",
        path: "/addIngredients",
        icon: <IoIcons.IoAddCircleOutline/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                title: "Hello",
            }
        ]
    },
    {
        title: "Filter Search",
        path: "/filterSearch",
        icon: <FaIcons.FaSearch/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                title: "Hello",
            }
        ]
    },
]