import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";

import {useAuth} from "../../context/AuthContext";
import {useAuthState} from "react-firebase-hooks/auth";
import {PUBLIC_ROUTES, PRIVATE_ROUTES} from "../../constants/routes"

const AppRouter: FC = () => {
    const { auth } = useAuth();

    const [user] = useAuthState(auth);

    return (
        <Routes>
            {user
                ?
                PRIVATE_ROUTES.map(({path, Element, title}) =>
                    <Route key={path} path={path} element={<Element title={title} />} />)
                :
                PUBLIC_ROUTES.map(({path, Element, title}) =>
                    <Route key={path} path={path} element={<Element title={title} />} />)
            }
            <Route path={"*"} element={<Navigate to={"/home"} replace />} />
        </Routes>
    );
};

export default AppRouter;