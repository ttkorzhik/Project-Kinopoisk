import React, {FC, ChangeEvent, FormEvent, MouseEventHandler, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import {useTheme} from "../../../../context/ThemeContext";
import {useScreenWidth} from "../../../../context/ScreenWidthContext";
import {useOutsideClickHandler} from "../../../../utils/outsideClickHandler";
import {InputVariants} from "../../Input/interfaces";
import {Routes} from "../../../../constants/routes";
import {RootState} from "../../../../store";

import Filter from "../../../Filter/Filter";
import Button from "../../Button/Button";
import SearchForm from "./SearchForm/SearchForm";
import MenuBurger, {MenuBurgerProps} from "./MenuBurger/MenuBurger";
import UserInfo from "./UserInfo/UserInfo";

import LogoLight from "../../../../assets/pixema.png";
import LogoDark from "../../../../assets/logo.png";

import styles from "../Header/Header.module.css";

interface HeaderProps extends MenuBurgerProps{
    onChange: MouseEventHandler
    menu: boolean
}

const Header: FC<HeaderProps> = ({open, onClick, menu, onChange}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const { isLightTheme } = useTheme();
    const {isPrimaryView, isMobileView} = useScreenWidth();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filter, setFilter] = useState<boolean>(false);

    const { filteredFilms } = useSelector((state: RootState) => state.films);

    const handleSearchQueryChange = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        location.search = `?keyword=${event.target.value}`
    };

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        new FormData(event.currentTarget);
        navigate(`${Routes.search}?keyword=${searchQuery}`)
        setSearchQuery("")
    };

    const handleOpenFilter = () => setFilter(true);

    const handleCloseFilter = () => setFilter(false);

    const refFilter = useRef(null);

    useOutsideClickHandler(refFilter, handleCloseFilter, filter);

    return (
        <>
            <header className={`${isLightTheme ? styles.light : ""} ${styles.header}`}>
                <Filter ref={refFilter} visibility={filter} onClick={handleCloseFilter} onChange={handleCloseFilter} />
                <div className={`${(!open || isMobileView) ? styles.topLeft : styles.top}`}>
                    {(!open || isMobileView) &&
                        <Button onClick={() => navigate(Routes.home)} className={styles.img}>
                            <img src={isLightTheme ? LogoLight : LogoDark} alt="logo"/>
                        </Button>
                    }
                    {!isMobileView &&
                        <SearchForm onClick={handleOpenFilter} id="search" value={searchQuery} placeholder="Search"
                                    onChange={handleSearchQueryChange} type="text" name="search" onSubmit={handleSearch}
                                    variant={InputVariants.forSearch} filter={filteredFilms.length} />
                    }
                    {!isPrimaryView && <MenuBurger open={open} onClick={onClick} />}
                </div>
                {isPrimaryView && <UserInfo menu={menu} onClick={onChange} className={styles.headerUserInfo} />}
                {isMobileView &&
                    <SearchForm onClick={handleOpenFilter} id="search" value={searchQuery} placeholder="Search"
                                onChange={handleSearchQueryChange} type="text" name="search" onSubmit={handleSearch}
                                variant={InputVariants.forSearch} filter={filteredFilms.length} />
                }
            </header>
        </>
    );
};

export default Header;