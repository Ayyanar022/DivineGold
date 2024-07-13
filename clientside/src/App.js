import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNav from "./components/MobileNav";

function App() {
  return (
    <div className="pb-12 lg:pb-0 ">
      <Header />
      <main className="pt-14 min-h-[calc(100vh-40px)]  ">
      <Outlet />
      </main>
      <div className="hidden lg:block">
      <Footer />
      </div>
    
     <MobileNav />
    </div>
  );
}

export default App;



// import { Outlet } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import MobileNav from "./components/MobileNav";

// function App() {
//   return (
//     <div className="pb-12 lg:pb-0">
//       <Header />
//       <main className="pt-14">
//         <Outlet />
//       </main>
//       <Footer />
//       <MobileNav />
//     </div>
//   );
// }

// export default App;


// import { Outlet } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import MobileNav from "./components/MobileNav";

// function App() {
//   return (
//     <div className="pb-12 lg:pb-0">
//       <Header />
//       <main className="pt-14">
//         <Outlet />
//       </main>
//       <Footer />
//       <MobileNav />
//     </div>
//   );
// }

// export default App;



// import { Outlet } from "react-router-dom";
// import "./App.css";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import MobileNav from "./components/MobileNav";

// function App() {
//   return (
//     <div className="pb-12 lg:pb-0">
//       <Header />
//       <main className="pt-14">
//         <Outlet />
//       </main>
//       <Footer />
//       <MobileNav />
//     </div>
//   );
// }

// export default App;
