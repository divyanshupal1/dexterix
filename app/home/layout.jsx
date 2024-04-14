import { BottomNav, Navbar } from "../page";



export default function Layout({ children }) {

  return (
      <>
        <div className="w-full h-fit min-h-[900px] overflow-y-scroll">
          <Navbar/>
          <div className="w-full  h-fit pt-[70px] pb-[70px] px-[12px]">
          {children}
          </div>
          <BottomNav/>
        </div>
      </>



  );
}
