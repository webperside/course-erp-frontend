import { Menu } from "@headlessui/react";
import "./language_selectbox.css";
import { useState, useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

export default function UserProfileDropdown() {

    const { userData } = useAppContext();
    const { username } = userData;
    const firstLetter = username ? username.charAt(0) : "";
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState("Language");
    const [image, setImage] = useState('/images/Vector9.svg')
    
    const languages = [
        {
            image: '/images/azerbaijan_flag.png',
            title: 'Azerbaijan'
        },
        {
            image: '/images/english_flag.png',
            title: 'English',
        },
        {
            image: '/images/spain_flag.png',
            title: 'Spanish'
        }
    ]

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    function handleOpen() {
        setIsOpen((isOpen) => !isOpen);
    }

    function handleSelect(e, language) {
        setLanguage(e.target.textContent);
        setImage(language.image)
        setIsOpen(false);
    }

    return (
        <Menu>
        <Menu.Button className="user-part ">
            <div className="user-avatar">{firstLetter}</div>
            <div className="user-name">{username}</div>
        </Menu.Button>
        <Menu.Items ref={dropdownRef} className="mt-2 py-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg absolute top-[60px] right-4">
            <Menu.Item>
            <>
                <label
                onClick={handleOpen}
                className="flex gap-3 px-4 items-center py-3 hover:bg-[#EBEEF0] text-gray-800 transition-colors"
                >
                <img src={image} className="language_logo" alt="" />
                {language}
                <img
                    src="/images/Vector10.svg"
                    className={`open_arrow ${isOpen ? "open" : ""}`}
                    alt=""
                />
                </label>
                {isOpen && (
                <ul className="selectbox_container">
                    {languages.map(language => (
                        <Language select={e => handleSelect(e, language)} key={language.title} data={language}/>
                    ))}
                    <div className="flex items-center">
                    <button className="close_btn w-full" onClick={() => setIsOpen(false)}>Back</button>
                    </div>
                </ul>
                )}
            </>
            </Menu.Item>

            {!isOpen && (
            <>
                <Menu.Item>
                {({ active }) => (
                    <Link
                    className="flex gap-3 px-4 py-3 hover:bg-[#EBEEF0] text-gray-800 transition-colors  "
                    to="/dashboard"
                    >
                    <img src="/images/Vector1.svg" alt="" />
                    Dashboard
                    </Link>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <Link
                    className="flex gap-3 px-4 py-3 hover:bg-[#EBEEF0] text-gray-800 transition-colors"
                    to="profile"
                    >
                    <img src="/images/Vector7.svg" alt="" />
                    Profile
                    </Link>
                )}
                </Menu.Item>
                <Menu.Item>
                {({ active }) => (
                    <Link
                    className="flex gap-3 px-4 py-3 hover:bg-[#EBEEF0] text-gray-800 transition-colors"
                    to="/logout"
                    >
                    <img src="/images/Vector8.svg" alt="" />
                    Log out
                    </Link>
                )}
                </Menu.Item>{" "}
            </>
            )}
        </Menu.Items>
        </Menu>
    );
    }

    function Language({ select, data}) {
    return (
        <li
        onClick={select}
        className="flex gap-3 px-4 items-center py-3 hover:bg-[#EBEEF0] text-gray-800 transition-colors"
        >
        <img src={data.image} className="flag" alt="" /> {data.title}
        </li>
    );
}
