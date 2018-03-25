pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Multisig.sol";

contract TestMultisig {
     Multisig multisig = Multisig(DeployedAddresses.Multisig());

     uint cero = multisig.getApplicationCount();
     uint expected = 0;

     Assert.equal(cero, expected, "they should both be 0");
}
