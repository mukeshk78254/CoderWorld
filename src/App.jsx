
// import { Routes,Route,Navigate } from "react-router";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Homepage from "./pages/Homepage";
// import { checkAuth } from "./authSlice";
// import { useDispatch,useSelector } from "react-redux";
// import { useEffect } from "react";
// import ProblemPage from './pages/ProblemPage';
// import ContestPage from './pages/ContestPage'; // The new ContestPage
// import LeaderboardPage from './pages/LeaderboardPage'; 
// import AdminPanel from "./components/AdminPanel";
// // import ProblemPage from "./pages/ProblemPage"
// import Admin from "./pages/Admin";
// import AdminVideo from "./components/AdminVideo"
// import AdminDelete from "./components/AdminDelete"
// import AdminUpload from "./components/AdminUpload"
// import ProfilePage from './pages/ProfilePage';


// function App (){


//    // code likhna isAuthentciated
//     const dispatch = useDispatch();
//      const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
   
//      // check initial authentication
//      useEffect(() => {
//        dispatch(checkAuth());
//      }, [dispatch]);
     
//      if (loading) {
//        return <div className="min-h-screen flex items-center justify-center">
//          <span className="loading loading-spinner loading-lg"></span>
//        </div>;
//      }
    
//   return (
//     <>
//   <Routes>
//   <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
//        <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
//        <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
//         <Route path="/problem/:problemid" element={<ProblemPage />} />
//             <Route path="/contests" element={<ContestPage />} /> {/* New route */}
//         <Route path="/leaderboard" element={<LeaderboardPage />} />
//          <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
//       <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
//       <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
//       <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
//       <Route path="/admin/upload/:problemid" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
//       <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} /> {/* <--- Add this route */}

//   </Routes>
//     </>

//   )
// }
// export default App;

// // // import { Routes,Route,Navigate } from "react-router";
// // // import Login from "./pages/Login";
// // // import Signup from "./pages/Signup";
// // // import Homepage from "./pages/Homepage";
// // // import { checkAuth } from "./authSlice";
// // // import { useDispatch,useSelector } from "react-redux";
// // // import { useEffect } from "react";
// // // import ProblemPage from './pages/ProblemPage';
// // // import ContestPage from './pages/ContestPage';
// // // import LeaderboardPage from './pages/LeaderboardPage'; 
// // // import AdminPanel from "./components/AdminPanel";
// // // import Admin from "./pages/Admin";
// // // import AdminVideo from "./components/AdminVideo"
// // // import AdminDelete from "./components/AdminDelete"
// // // import AdminUpload from "./components/AdminUpload"
// // // import ProfilePage from './pages/ProfilePage'; // <--- NEW IMPORT
// // // import { Toaster } from 'react-hot-toast'; // <--- NEW IMPORT


// // // function App (){
// // //     const dispatch = useDispatch();
// // //     const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
   
// // //     useEffect(() => {
// // //         dispatch(checkAuth());
// // //     }, [dispatch]);
     
// // //     if (loading) {
// // //         return (
// // //             <div className="min-h-screen flex items-center justify-center bg-slate-950">
// // //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// // //             </div>
// // //         );
// // //     }
    
// // //     return (
// // //         <>
// // //             <Toaster position="top-right" reverseOrder={false} /> {/* <--- NEW: Toaster for notifications */}
// // //             <Routes>
// // //                 <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
// // //                 <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
// // //                 <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
// // //                 <Route path="/problem/:problemid" element={<ProblemPage />} />
// // //                 <Route path="/contests" element={<ContestPage />} />
// // //                 <Route path="/leaderboard" element={<LeaderboardPage />} />
// // //                 <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} /> {/* <--- NEW ROUTE */}
// // //                 <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
// // //                 <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
// // //                 <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
// // //                 <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
// // //                 <Route path="/admin/upload/:problemid" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
// // //             </Routes>
// // //         </>
// // //     );
// // // }
// // // export default App;
// // import { Routes,Route,Navigate } from "react-router";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import Homepage from "./pages/Homepage";
// // import { checkAuth } from "./authSlice";
// // import { useDispatch,useSelector } from "react-redux";
// // import { useEffect } from "react";
// // import ProblemPage from './pages/ProblemPage';
// // import ContestPage from './pages/ContestPage';
// // import LeaderboardPage from './pages/LeaderboardPage'; 
// // import AdminPanel from "./components/AdminPanel";
// // import Admin from "./pages/Admin";
// // import AdminVideo from "./components/AdminVideo"
// // import AdminDelete from "./components/AdminDelete"
// // import AdminUpload from "./components/AdminUpload"
// // import ProfilePage from './pages/ProfilePage'; // NEW IMPORT


// // function App (){
// //     const dispatch = useDispatch();
// //     const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
   
// //     useEffect(() => {
// //         dispatch(checkAuth());
// //     }, [dispatch]);
     
// //     if (loading) {
// //         return (
// //             <div className="min-h-screen flex items-center justify-center bg-slate-950">
// //                 <span className="loading loading-spinner loading-lg text-indigo-500"></span>
// //             </div>
// //         );
// //     }
    
// //     return (
// //         <>
// //             {/* <Toaster position="top-right" reverseOrder={false} /> Removed */}
// //             <Routes>
// //                 <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
// //                 <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
// //                 <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
// //                 <Route path="/problem/:problemid" element={<ProblemPage />} />
// //                 <Route path="/contests" element={<ContestPage />} />
// //                 <Route path="/leaderboard" element={<LeaderboardPage />} />
// //                 <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
// //                 <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
// //                 <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
// //                 <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
// //                 <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
// //                 <Route path="/admin/upload/:problemid" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
// //             </Routes>
// //         </>
// //     );
// // }
// // export default App;
import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import EnhancedHomepage from "./pages/EnhancedHomepage";
import ProblemListPage from "./pages/ProblemListPage";
import EnhancedContestPage from "./pages/EnhancedContestPage";
import EnhancedDiscussPage from "./pages/EnhancedDiscussPage";
import EnhancedLeaderboardPage from "./pages/EnhancedLeaderboardPage";
import EnhancedProfilePage from "./pages/EnhancedProfilePage";
import SimpleProfilePage from "./pages/SimpleProfilePage";
import { checkAuth } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProblemPage from './pages/ProblemPage';
import EnhancedProblemPage from './pages/EnhancedProblemPage';
import SimplifiedProblemPage from './pages/SimplifiedProblemPage';
import LeetCodeStylePage from './pages/LeetCodeStylePage';
import WriteSolutionPage from './pages/WriteSolutionPage';
import ContestPage from './pages/ContestPage';
import LeaderboardPage from './pages/LeaderboardPage'; 
import AdminPanel from "./components/AdminPanel";
import Admin from "./pages/Admin";
import AdminVideo from "./components/AdminVideo";
import AdminDelete from "./components/AdminDelete";
import AdminUpload from "./components/AdminUpload";
import ProfilePage from './pages/ProfilePage';
import Dashboard from './pages/Dashboard'; // <-- Import Dashboard
import EnhancedDashboard from './pages/EnhancedDashboard'; // <-- Import Enhanced Dashboard
import TransactionPage from './pages/TransactionPage'; // <-- Import TransactionPage
import DiscussPage from './pages/DiscussPage'; // <-- Import DiscussPage
import ContestOpeningSoon from './pages/ContestOpeningSoon'; // <-- Import ContestOpeningSoon
import ContestEnded from './pages/ContestEnded'; // <-- Import ContestEnded
import { NotificationManager } from './components/NotificationSystem'; // <-- Import NotificationManager

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
    
  return (
    <>
      <NotificationManager />
      <Routes>
        <Route path="/" element={isAuthenticated ? <EnhancedHomepage /> : <Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/problems" element={isAuthenticated ? <ProblemListPage /> : <Navigate to="/login" />} />
        <Route path="/problem/:problemid" element={<LeetCodeStylePage/>} />
        <Route path="/problem/:problemid/write-solution" element={<WriteSolutionPage />} />
        <Route path="/test-write-solution" element={<WriteSolutionPage />} />
        <Route path="/contests" element={isAuthenticated ? <EnhancedContestPage /> : <Navigate to="/login" />} />
        <Route path="/leaderboard" element={isAuthenticated ? <EnhancedLeaderboardPage /> : <Navigate to="/login" />} />
        <Route path="/discuss" element={isAuthenticated ? <EnhancedDiscussPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={isAuthenticated ? <TransactionPage /> : <Navigate to="/login" />} />
        <Route path="/contest/opening-soon" element={isAuthenticated ? <ContestOpeningSoon /> : <Navigate to="/login" />} />
        <Route path="/contest/ended" element={isAuthenticated ? <ContestEnded /> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin" element={isAuthenticated && user?.role === 'admin' ? <Admin /> : <Navigate to="/" />} />
        <Route path="/admin/create" element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
        <Route path="/admin/video" element={isAuthenticated && user?.role === 'admin' ? <AdminVideo /> : <Navigate to="/" />} />
        <Route path="/admin/upload/:problemid" element={isAuthenticated && user?.role === 'admin' ? <AdminUpload /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;