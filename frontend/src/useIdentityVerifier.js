import { ethers } from "ethers";
import IdentityVerifireAbi from "../abi/identityVerifier.json";
import { useState } from "react";

export function useIdentityVerifier(contractAddress) {
  const [status, setStatus] = useState("");

  const verifyUsers = async () => {
    try {
      if (!window.ethereum) throw new Error("not installed metamask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        IdentityVerifireAbi,
        signer
      );

      const userAddress = await signer.getAddress();

      const isVerified = await contract.isVerified(userAddress);
      if (!isVerified) {
        const tx = await contract.verifireUser(userAddress);
        await tx.wait();
      } else {
        console.log("Already verified");
      }

      setStatus("user verified successfully!");
    } catch (e) {
      setStatus(`Error : ${e.message}`);
    }
  };

  return { verifyUsers, status };
}