import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="h-screen flex flex-col bg-appBackground text-appText">
    <Header />
    <main className="flex-1 flex">{children}</main>
  </div>
);

export default Layout;
