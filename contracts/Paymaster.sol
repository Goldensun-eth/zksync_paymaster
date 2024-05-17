// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "./IPaymaster.sol";

// Can be found here: https://github.com/matter-labs/era-contracts/blob/main/system-contracts/contracts/Constants.sol
// 2^15 + 1
address constant BOOTLOADER_ADDRESS = address(0x8001);

contract Paymaster is IPaymaster {
    // Sponsor a user's transaction
    function validateAndPayForPaymasterTransaction(
        bytes32, // Removed because this is not for production
        bytes32, // Removed because this is not for production
        Transaction calldata _transaction
    ) external payable returns (bytes4 magic, bytes memory context) {
        require(BOOTLOADER_ADDRESS == msg.sender);
        magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC; // Willing to sponsor transaction for the user
        context = "";

        uint paybackValue = _transaction.maxFeePerGas * _transaction.gasLimit;

        // Send the necessary amount of funds onto the bootloader address
        (bool success, ) = BOOTLOADER_ADDRESS.call{value: paybackValue}("");
        require(success);
    }

    // Need to receive funds to sponsor transactions
    receive() external payable {}
}
