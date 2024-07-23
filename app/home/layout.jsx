import { BottomNav, Navbar } from "../page";



export default function Layout({ children }) {

  return (
      <>
        <div className="w-full h-fit overflow-y-hidden">
          <Navbar/>
          <div className="w-full  h-[calc(100vh-80px)] pt-[70px] pb-[70px] px-[12px] overflow-y-scroll">
          {children}
          </div>
          <BottomNav/>
        </div>
      </>



  );
}
