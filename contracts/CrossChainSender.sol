// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IlayerZeroEndpoint {
    function send(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata _payload,
        address payable _refundAddress,
        address _paymaster,
        bytes calldata _adapterParams
    ) external payable;
}

contract CrossChainSender {

    address public owner;
    IlayerZeroEndpoint public endpoint;

    event massageSent(uint16 dstChainId , bytes destination , bytes payload);

    modifier onlyOwner {
        require(msg.sender == owner , "not authorized");
        _;
    }

    constructor(address _endpoint) {
        require(_endpoint != address(0) , "invalid endpoint");
        endpoint = IlayerZeroEndpoint(_endpoint);
        owner = msg.sender;

    }

    function sendCrossChain(
        uint16 dstChainId,
        bytes calldata destination,
        bytes calldata payload,
        bytes calldata adapterParams
    ) external payable onlyOwner{

        endpoint.send{value : msg.value}(
            dstChainId,
            destination,
            payload,
            payable(msg.sender),
            address(0),
            adapterParams
        );

        emit massageSent(dstChainId , destination , payload);
    }
}