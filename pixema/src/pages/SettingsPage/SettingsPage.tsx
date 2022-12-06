import React, {FC} from 'react';

import MainWrapper from "../../components/common/MainWrapper/MainWrapper";
import Settings from "../../components/common/Settings/Settings";

const SettingsPage: FC = () => {
    return (
        <MainWrapper>
            <Settings />
        </MainWrapper>
    );
};

export default SettingsPage;