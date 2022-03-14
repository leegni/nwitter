import { authService } from "fbase";
import { Link } from "react-router-dom";

function Profile(){
    const onLogOutClick = () => {
        authService.signOut();
    }
    return(
    <>
        <button onClick={onLogOutClick}>Log Out</button>
    </>
    );
}
export default Profile;