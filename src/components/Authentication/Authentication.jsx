import { auth, googleProvider } from "../../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";

import "./Authentication.scss";

function Authentication() {
    console.log(auth?.currentUser?.email);

    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    }

    async function logOut() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            {/* TODO change UI after clicking login */}
            <button id="GoogleSignInBtn" className="authbtn" onClick={signInWithGoogle}>
                Sign In With Google
            </button>
            {/* TODO change UI after clicking logout */}
            <button id="LogOutBtn" className="authbtn" onClick={logOut}>
                Sign out
            </button>
        </div>
    )
}

export default Authentication;