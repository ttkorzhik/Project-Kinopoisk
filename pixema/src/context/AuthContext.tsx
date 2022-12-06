import React, {FC, createContext, useContext} from "react";

import {FirebaseApp, initializeApp} from "firebase/app";
import {getFirestore, Firestore} from "firebase/firestore";
import {
    Auth,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    signOut
} from "firebase/auth";

import {WithChildren} from "../types/withChildren";

interface AuthContextValue {
    app: FirebaseApp
    db: Firestore
    auth: Auth | any
    logInWithEmailAndPassword(email: string, password: string): Promise<void>
    registerWithEmailAndPassword(name: string, email: string, password: string): Promise<void>
    sendPasswordReset(email: string): Promise<void>
    signOutUser(): Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthContextProvider: FC<WithChildren> = ({ children }) => {
    const firebaseConfig = {
        apiKey: "AIzaSyAWGnO2i6UBWcLLoVTzp_YhHvzCIWKIilQ",
        authDomain: "kinopoisk-app-9c2a9.firebaseapp.com",
        projectId: "kinopoisk-app-9c2a9",
        storageBucket: "kinopoisk-app-9c2a9.appspot.com",
        messagingSenderId: "824061213653",
        appId: "1:824061213653:web:685faad33b928c605d9b5c",
        measurementId: "G-GVH30EGPXX"
    };

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);

    const auth = getAuth(app);

    const logInWithEmailAndPassword = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err: any) {
            alert(err);
        }
    };

    const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password).then(async ({ user }) => {
                await updateProfile(user, {
                    displayName: name,
                });
            });
        } catch (error: any) {
            alert(error);
        }
    };

    const sendPasswordReset = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log("Password reset link sent!");
        } catch (err: any) {
            alert(err.message);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{
            app,
            db,
            auth,
            logInWithEmailAndPassword,
            registerWithEmailAndPassword,
            sendPasswordReset,
            signOutUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
};

function useAuth() {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error("useAuth must be used with AuthProvider")
    }

    return context
}

export {useAuth, AuthContextProvider};