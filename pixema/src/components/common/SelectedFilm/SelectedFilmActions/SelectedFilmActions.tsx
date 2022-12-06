import React, {FC, useState} from 'react';
import {useDispatch} from "react-redux";

import {useTheme} from "../../../../context/ThemeContext";
import {updateFilmAction} from "../../../../store/reducers/selectedFilmReducer";
import {IMovie} from "../../FilmsList/Film/interfaces";

import Button, {BtnVariants} from "../../Button/Button";
import SocialNetwork from "./SocialNetwork/SocialNetwork";

import Bookmark from "../../../../assets/Bookmark.svg";
import WhiteBookmark from "../../../../assets/WhiteBookmark.svg";
import PurpleBookmark from "../../../../assets/PurpleBookmark.svg";
import Share from "../../../../assets/ShareNodes.svg";
import WhiteShare from "../../../../assets/WhiteShare.svg";
import PurpleShare from "../../../../assets/PurpleShare.svg";

import styles from "./SelectedFilmActions.module.css";

interface ActionsProps {
    film: IMovie
}

const SelectedFilmActions: FC<ActionsProps> = ({film}) => {
    const dispatch = useDispatch();

    const {isLightTheme, isDarkTheme} = useTheme();

    const [open, setOpen] = useState<boolean>(false);

    const handleAddToFavorites = () => {
        dispatch(updateFilmAction({...film, favorite: !film.favorite}));
    };

    const handleOpenSocialNetwork = () => setOpen(prevState => !prevState);

    return (
        <div className={styles.actions}>
            <Button
                onClick={handleAddToFavorites}
                variant={BtnVariants.forSelectedFilm}
                className={`${styles.buttonBookmark} ${isLightTheme && styles.lightButton}`}
            >
                <img
                    src={
                          isLightTheme && film.favorite ? PurpleBookmark :
                          isDarkTheme && film.favorite ? WhiteBookmark :
                          isLightTheme ? WhiteBookmark : Bookmark
                    }
                    alt="bookmarkIcon"
                />
            </Button>
            <Button
                onClick={handleOpenSocialNetwork}
                variant={BtnVariants.forSelectedFilm}
                className={`${styles.buttonShare} ${isLightTheme && styles.lightButton}`}
            >
                <img
                    src={
                          isLightTheme && open ? PurpleShare :
                          isDarkTheme && open ? WhiteShare :
                          isLightTheme ? WhiteShare : Share
                    }
                    alt="shareIcon"
                />
            </Button>
            <div className={styles.socialsWrapper}>
                {open && <SocialNetwork />}
            </div>
        </div>
    );
};

export default SelectedFilmActions;