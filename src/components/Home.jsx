import { getAuth, signOut } from "firebase/auth";

function Home() {

    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            console.log("Sign out successful")
        })
        .catch((err) => {
            console.log("Something went wrong! Please try again.")
        })
    }
    return (
        <div>
            <p>Welcome Home!</p>
            <button onClick={ logout }>Sign Out</button>
        </div>
    )
}

export default Home