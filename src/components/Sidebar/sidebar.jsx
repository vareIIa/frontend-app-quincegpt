import React, { useState } from 'react';
import './sidebar.scss';
import { FaHome, FaServicestack, FaCaretDown, FaInfoCircle, FaRegFileAlt, FaRegFile } from 'react-icons/fa';

const Sidebar = () => {
    const [openDropdown, setOpenDropdown] = useState(false);

    const toggleDropdown = () => {
        setOpenDropdown(!openDropdown);
    };

    return (
        <div className="custom-sidebar">
            <div className="sidebar-header">
                <h2>PD Coach</h2>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/learner-dashboard/" className="nav-link">
                            <FaHome />  Inicio
                        </a>
                    </li>
                    <li>
                        <a href="https://apps.projetodesenvolve.online/account/" className="nav-link">
                            <FaServicestack /> Configurações da Conta
                        </a>
                    </li>
                    <li>
                        <button
                            className={`dropdown-toggle ${openDropdown ? 'active' : ''}`}
                            onClick={toggleDropdown}
                        >
                            <FaCaretDown /> Matérias
                        </button>
                        {openDropdown && (
                            <ul className="dropdown-menu">
                                <li>
                                    <a href="#action1" className="dropdown-item">
                                        <FaRegFile /> Action 1
                                    </a>
                                </li>
                                <li>
                                    <a href="#action2" className="dropdown-item">
                                        <FaRegFile /> Action 2
                                    </a>
                                </li>
                                <li>
                                    <a href="#action3" className="dropdown-item">
                                        <FaRegFile /> Action 3
                                    </a>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li>
                        <a href="https://ajuda-projetodesenvolve.freshdesk.com/support/login" className="nav-link">
                            <FaInfoCircle /> Ajuda
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;