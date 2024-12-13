import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen flex flex-col bg-appBackground text-appText">
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;
