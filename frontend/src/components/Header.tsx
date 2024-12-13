import ConnectWalletButton from "../ui/ConnectWalletButton";
import SearchBar from "../ui/SearchBar";

const Header = () => (
  <header className="h-16 flex gap-4 items-center px-4">
    <SearchBar />
    <ConnectWalletButton />
  </header>
);

export default Header;
