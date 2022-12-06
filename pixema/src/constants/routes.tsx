import React, {FC} from 'react';

import HomePage from "../pages/HomePage/HomePage";
import FilterPage from "../pages/FilterPage/FilterPage";
import SearchResultsPage from "../pages/SearchResultsPage/SearchResultsPage";
import TrendsPage from "../pages/TrendsPage/TrendsPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import SelectedFilmPage from "../pages/SelectedFilmPage/SelectedFilmPage";
import SignInPage from "../pages/AuthorizationPage/SignInPage/SignInPage";
import SignUpPage from "../pages/AuthorizationPage/SignUpPage/SignUpPage";
import ResetPasswordPage from "../pages/AuthorizationPage/ResetPasswordPage/ResetPasswordPage";
import ResetPasswordMessagePage from "../pages/AuthorizationPage/ResetPasswordMessagePage/ResetPasswordMessagePage";
import NewPasswordPage from "../pages/AuthorizationPage/NewPasswordPage/NewPasswordPage";
import SuccessNewPasswordPage from "../pages/AuthorizationPage/SuccessNewPasswordPage/SuccessNewPasswordPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";

export interface PageProps {
    title?: string
}

export interface IRoute {
    path: string
    Element: FC<PageProps>
    title?: string
}

export enum Routes {
    home = "/home",
    filter = "/home/filter",
    search = "/search",
    trends = "/home/trends",
    favorites = "/home/favorites",
    film = "/home/:kinopoiskId",
    signIn = "/signin",
    signUp = "/signup",
    resetPasswordPage = "/reset-password",
    resetPasswordMessagePage = "/reset-password/reset-password-message",
    newPasswordPage = "/new-password",
    successNewPasswordPage = "/new-password/success",
    settings = "/settings"
}

export const PUBLIC_ROUTES: IRoute[] = [
    {path: Routes.home, Element: HomePage},
    {path: Routes.filter, Element: FilterPage},
    {path: Routes.trends, Element: TrendsPage, title: "Trends"},
    {path: Routes.favorites, Element: FavoritesPage, title: "Favorites"},
    {path: Routes.film, Element: SelectedFilmPage},
    {path: Routes.search, Element: SearchResultsPage},
    {path: Routes.signIn, Element: SignInPage, title: "Sign In"},
    {path: Routes.signUp, Element: SignUpPage, title: "Sign Up"},
    {path: Routes.resetPasswordPage, Element: ResetPasswordPage, title: "Reset password"},
    {path: Routes.resetPasswordMessagePage, Element: ResetPasswordMessagePage, title: "Reset password"},
    {path: Routes.newPasswordPage, Element: NewPasswordPage, title: "New password"},
    {path: Routes.successNewPasswordPage, Element: SuccessNewPasswordPage, title: "Sign In"}
];

export const PRIVATE_ROUTES: IRoute[] = [
    ...PUBLIC_ROUTES,
    {path: Routes.settings, Element: SettingsPage}
];