// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PeachToken is ERC20 {
    constructor() ERC20("PeachToken", "PEACH") {
        _mint(msg.sender, 2000 * 10 ** decimals());
    }
}