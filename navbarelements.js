import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #2E2E2E; // Dark background for a modern look
    height: 60px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    z-index: 12;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // Subtle shadow for depth
`;

export const NavLink = styled(Link)`
    color: #FFFFFF; // White text for contrast
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
        color: #4d4dff; // Highlight color on hover
    }

    &.active {
        color: #4d4dff; // Highlight color for active link
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #FFFFFF;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
