import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("IdentityVerifireModule" , (m) => {
    const identityVerifier = m.contract("IdentityVerifier",[]);
    return {identityVerifier};
});