// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract IdentityVerifier {

    mapping (address => bool) private verifiedUsers;

    event userVerified(address indexed user);

    function verifireUser(address user) external {
        require(user != address(0) , "Invalid user address");
        require(!verifiedUsers[user] , "user already verified"); 

        verifiedUsers[user] = true;
        emit userVerified(user);
    }

    function isVerifide(address user) external view returns(bool){
        return verifiedUsers[user];
    }

}