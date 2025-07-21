import "./App.css";
import { useIdentityVerifier } from "./useIdentityVerifier.js";
import { useCrossChainSender } from "./useCrossChainSender.js";
import { ethers } from "ethers";

function App() {
  const { verifyUsers, status } = useIdentityVerifier(
    import.meta.env.VITE_IDENTITY_CONTRACT
  );
  const { sendMessage, txStatus } = useCrossChainSender(
    import.meta.env.VITE_CROSSCHAIN_CONTRACT
  );

  const handleSendMessage = () => {
    const dstChainId = 300;
    const destination = ethers.zeroPadValue(
      import.meta.env.VITE_IDENTITY_CONTRACT,
      32
    );
    const payload = "0x68656c6c6f";
    const adapterParams = "0x";

    sendMessage(dstChainId, destination, payload, adapterParams);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <div className="bg-white shadow-md rounded-xl p-6 w-96 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">
          ZK-Powered Cross-Chain DApp
        </h1>

        <button
          onClick={verifyUsers}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Verify User
        </button>
        <p className="text-sm text-gray-600">{status}</p>

        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Send Cross-Chain
        </button>
        <p className="text-sm text-gray-600">{txStatus}</p>
      </div>
    </div>
  );
}

export default App;
