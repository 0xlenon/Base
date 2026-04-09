// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PromptPay
 * @dev Implements x402 micro-payments for AI agents on Base.
 */
contract PromptPay {
    event ThoughtPaid(
        address indexed user,
        address indexed agent,
        uint256 amount,
        bytes32 requestId
    );

    mapping(address => uint256) public balances;

    /**
     * @dev Pay for a single AI response (thought).
     * @param agent The address of the AI agent or its provider.
     * @param requestId A unique identifier for the request (x402 challenge).
     */
    function payForThought(address agent, bytes32 requestId) external payable {
        require(msg.value > 0, "Payment required");
        require(agent != address(0), "Invalid agent address");

        balances[agent] += msg.value;

        emit ThoughtPaid(msg.sender, agent, msg.value, requestId);
    }

    /**
     * @dev Agents can withdraw their accumulated earnings.
     */
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");

        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
    }

    // Function to check contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
