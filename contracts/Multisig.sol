pragma solidity ^0.4.18;

//borrowed some logic from Stefan George:
//https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWalletWithDailyLimit.sol

contract Multisig {
    event Confirmation(address indexed sender, uint indexed applicationId);
    event Revocation(address indexed sender, uint indexed applicationId);
    event Submission(uint indexed applicationId);

    event Validated(uint indexed applicationId);
    event ValidationFailure(uint indexed applicationId);

    address public lawyer;
    address public applicant;
    address public gov_worker;

    mapping(uint => Application) public applications;
    mapping(uint => mapping (address => bool)) public confirmations;

    uint public applicationCount;

    struct Application {
        bytes32 docHash;
        string theAddress;
        bool validated;
    }

    modifier senderAccount() {
        require(msg.sender == address(this));
        _;
    }

    modifier confirmed(uint applicationId, address participant) {
        require(confirmations[applicationId][participant]);
        _;
    }

    modifier notConfirmed(uint applicationId, address participant) {
        require(!confirmations[applicationId][participant]);
        _;
    }

    modifier notValidated(uint applicationId) {
        require(!applications[applicationId].validated);
        _;
    }

    modifier Valid(uint applicationId) {
        require(applications[applicationId].validated);
        _;
    }

    //for security/safety purposes (just make sure the address is valid)
    modifier notNull(address _address) {
        require(_address != 0);
        _;
    }

    modifier isLawyer(address __lawyer) {
        require(lawyer == __lawyer);
        _;
    }

    modifier isApplicant(address __applicant) {
        require(applicant == __applicant);
        _;
    }

    modifier isGovWorker(address __gov_worker) {
        require(gov_worker == __gov_worker);
        _;
    }

    //I wonder if the error is here, if this doesn't work, check this line
    modifier applicationExists(uint applicationId) {
        require(applications[applicationId].docHash != 0);
        _;
    }

    //@dev instantiate the multisig with one lawyer, applicant, gov_worker
    //@params _lawyer is the lawyer
    //@params _applicant is the applicant
    //@params _gov_worker is the gov_worker
    function MultiSig(
      address _lawyer,
      address _applicant,
      address _gov_worker)
      public
      notNull(_lawyer)
      notNull(_applicant)
      notNull(_gov_worker)
    {
        lawyer = _lawyer;
        applicant = _applicant;
        gov_worker = _gov_worker;
    }

    //@dev replace the lawyer with the authorization of the current lawyer
    //@param newLawyer is the new lawyer that will replace the current lawyer
    function replaceLawyer(address newLawyer)
        public
        isLawyer(msg.sender)
    {
        lawyer = newLawyer;
    }

    //@dev replace the applicant with the authorization of the current applicant
    //@param newApplicant is the new applicant that will replace the current applicant
    function replaceApplicant(address newApplicant)
        public
        isApplicant(msg.sender)
    {
        applicant = newApplicant;
    }

    //@dev replace the gov_worker with the authorization of the current gov_worker
    //@param new_gov_worker is the new government worker that will replace the current govt worker
    function replaceGovWorker(address new_gov_worker)
        public
        isGovWorker(msg.sender)
    {
        gov_worker = new_gov_worker;
    }

    /*
    * @dev allows an applicant to submit an application
    * @param docHash is the docHash
    * @param theAddress is the address
    */

    function submitApplication(bytes32 _docHash, string _theAddress)
        public
        isApplicant(msg.sender)
        returns (uint applicationId)
    {
        applicationId = addApplication(_docHash, _theAddress);
        confirmApplication(applicationId);
    }

    function confirmApplication(uint applicationId)
        public
        applicationExists(applicationId)
        notConfirmed(applicationId, msg.sender)
    {
        confirmations[applicationId][msg.sender] = true;
        Confirmation(msg.sender, applicationId);
    }

    function revokeConfirmation(uint applicationId)
        public
        applicationExists(applicationId)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        confirmations[applicationId][msg.sender] = false;
        Revocation(msg.sender, applicationId);
    }

    //only the notary can validate transactions
    //and they can only do this after all involved parties have confirmed it
    function validateTransaction(uint applicationId)
        public
        isLawyer(msg.sender)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        if (isConfirmed(applicationId)) {
            Application storage app = applications[applicationId];
            app.validated = true;
            if (app.docHash != 0) {
                Validated(applicationId);
            }
            else {
                ValidationFailure(applicationId);
                app.validated = false;
            }
        }
    }

    /*
    * Handling Confirmations
    */
    function isConfirmed(uint applicationId)
        public
        constant
        returns (bool)
    {
        if (confirmations[applicationId][lawyer]
          && confirmations[applicationId][applicant]
          && confirmations[applicationId][gov_worker])
        {
            return true;
        }
        return false;
    }

    /*
    * Internal functions
    */
    function addApplication(bytes32 __docHash, string __theAddress)
        internal
        returns (uint applicationId)
    {
        applicationId = applicationCount;
        applications[applicationId] = Application({
          docHash: __docHash,
          theAddress: __theAddress,
          validated: false
          });
        applicationCount += 1;
        Submission(applicationId);
    }

    /*
    * Web3 call functions
    */

    //@dev Returns the confirmations for a given application
    //@param applicationId application ID
    //@returns number of confirmations
    function getConfirmations(uint applicationId)
        public
        constant
        returns (uint confirmation_count)
    {
        if (confirmations[applicationId][lawyer]) {
            confirmation_count += 1;
        }
        if (confirmations[applicationId][applicant]) {
            confirmation_count += 1;
        }
        if (confirmations[applicationId][gov_worker]) {
            confirmation_count += 1;
        }
    }

    function getApplicationCount(bool pending, bool validated)
        public
        constant
        returns (uint count)
    {
        for (uint i = 0; i<applicationCount; i++) {
            if (pending && !applications[i].validated
              || validated && applications[i].validated) {
                  count += 1;
              }
        }
    }

    function getLawyer()
        public
        constant
        returns (address)
    {
        return lawyer;
    }

    function getApplicant()
        public
        constant
        returns (address)
    {
        return applicant;
    }

    function getGovWorker()
        public
        constant
        returns (address)
    {
        return gov_worker;
    }

    //@dev Returns list of applicationIds in defined range
    //@param from Index start position of application array
    //@param to Index end position of application array
    //@param pending Include pending applications
    //@param executed Include executed applications
    //@return Returns array of application applicationIds
    function getApplicationIds(uint from, uint to, bool pending, bool _validated)
        public
        constant
        returns(uint[] _applicationIds)
    {
        uint[] memory applicationIdsTemp = new uint[](applicationCount);
        uint count = 0;
        uint i;
        for (i = 0; i<applicationCount; i++) {
            if (pending && !applications[i].validated
              || _validated && applications[i].validated) {
                  applicationIdsTemp[count] = i;
                  count += 1;
              }
        }
        _applicationIds = new uint[](to - from);
        for(i = from; i<to; i++) {
            _applicationIds[to - from] = applicationIdsTemp[i];
        }
    }

    //this prevents reentrancy attacks, etc
    //also nobody should be able to send ether to this contract
    function() public{revert();}
}
