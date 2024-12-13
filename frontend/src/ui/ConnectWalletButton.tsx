import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import { useState } from "react";
import { FiBell } from "react-icons/fi";
import { truncateAddress } from "../utils/truncateAddress";

const ConnectWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      try {
        const web3Provider = new ethers.providers.Web3Provider(provider);

        // Request account access
        await web3Provider.send("eth_requestAccounts", []);

        // Get the connected wallet address
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();

        // Update state with the wallet address
        setWalletAddress(address);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this app.");
    }
  };

  return (
    <div>
      {walletAddress ? (
        <div className="flex gap-2">
          <FiBell className="text-gray-400 h-6 w-6" />
          {truncateAddress(walletAddress)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-gray-800 whitespace-nowrap rounded hover:bg-red"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
