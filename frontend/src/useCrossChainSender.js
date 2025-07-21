import { ethers } from "ethers";
import crossChainSenderAbi from "../abi/crossChainSender.json";
import { useState } from "react";

export function useCrossChainSender(contractAddress) {
  const [txStatus, setTxStatus] = useState("");

  const sendMessage = async (
    dstChainId,
    destination,
    payload,
    adapterParams
  ) => {
    try {
      if (!window.ethereum) throw new Error("not installed metamask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        crossChainSenderAbi,
        signer
      );

      const tx = await contract.sendCrossChain(
        dstChainId,
        destination,
        payload,
        adapterParams,
        {
          value : ethers.parseEther("0.0000001"),
        },
      );

      await tx.wait();

      setTxStatus("Cross-chain message sent successfully!");
    } catch (e) {
      setTxStatus(`Error : ${e.message}`);
    }
  };

  return { sendMessage, txStatus };
}