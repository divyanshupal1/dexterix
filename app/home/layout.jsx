import { BottomNav, Navbar } from "../page";



export default function Layout({ children }) {

  return (
      <>
        <div className="w-full h-screen overflow-y-scroll">
          <Navbar/>
          <div className="w-full h-auto pt-[70px] px-[12px]">
          {children}
          </div>
          <BottomNav/>
        </div>
      </>



  );
}
