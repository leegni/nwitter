import { BrowserRouter as Router, Navigate, Route, Routes  } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

function AppRouter({isLoggedIn, userObj}){
   return(
       <Router>
           {isLoggedIn && <Navigation/>}
           <Routes>
               {isLoggedIn ? 
               <>
               <Route exact path="/" element={<Home userObj={userObj}/>}/>
               <Route exact path="/profile" element={<Profile/>}/>
               <Route path="*" element={<Navigate to="/" />}/>
               </>
               :
               <>
               <Route exact path="/" element={<Auth/>}/>
               <Route path="*" element={<Navigate to="/" />}/>
               </>}
           </Routes>
       </Router>
   )
}

export default AppRouter;