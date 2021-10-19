import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import Inventory from "./Inventory";
import AddIngredients from "./AddIngredients";
import Filter from "./Filter";



export const HomeData = [
    {
        title: "Inventory",
        icon: <AiIcons.AiFillHome/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                component: <Inventory/>,
            }
        ]
    },
    {
        title: "Add Ingredients",
        icon: <IoIcons.IoAddCircleOutline/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                component: <AddIngredients/>,
            }
        ]
    },
    {
        title: "Filter Search",
        icon: <FaIcons.FaSearch/>,
        iconClosed: <RiIcons.RiArrowDropDownFill/>,
        iconOpened: <RiIcons.RiArrowUpFill/>,
        subNav: [
            {
                component: <Filter/>,
            }
        ]
    },
]