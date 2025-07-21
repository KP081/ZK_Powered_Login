import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";
dotenv.config();

export default buildModule("crossChainSenderModule" , (m) => {
    const endpoint = m.getParameter("layerZeroEndpoint" , process.env.LAYERZERO_ENDPOINT);
    const crossChainSender = m.contract("CrossChainSender" , [endpoint]);

    return {crossChainSender};
});