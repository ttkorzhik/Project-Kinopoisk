import React, {FC, MouseEventHandler} from 'react';

import Button, {BtnVariants} from "../Button/Button";
import Loading from "./Loading/Loading";

interface ShowMoreBtnProps {
    onClick?: MouseEventHandler
    isLoading?: boolean
}

const ShowMoreBtn: FC<ShowMoreBtnProps> = ({onClick, isLoading= false}) => {
    return (
        <Button variant={BtnVariants.forPagination} onClick={onClick} disabled={isLoading}>
            Show more {isLoading ? <Loading /> : null}
        </Button>
    );
};

export default ShowMoreBtn;