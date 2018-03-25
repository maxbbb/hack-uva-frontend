pragma solidity ^0.4.18;

//@title Multisignature validation of
//@author Amar Singh

//borrowed some logic from Stefan George:
//https://github.com/gnosis/MultiSigWallet/blob/master/contracts/MultiSigWalletWithDailyLimit.sol

contract Validation{
    /*
    *  Events
    */
    event Confirmation(address indexed sender, uint indexed applicationId);
    event Revocation(address indexed sender, uint indexed applicationId);
    event Submission(uint indexed applicationId);

    event LawyerRequirementChange(uint required);
    event ApplicantRequirementChange(uint required);
    event GovWorkerRequirementChange(uint required);

    event ValEvent(uint indexed applicationId);
    event ValidationFailure(uint indexed applicationId);

    event LawyerAddition(address indexed lawyer);
    event ApplicantAddition(address indexed applicant);
    event GovWorkerAddition(address indexed gov_worker);

    event LawyerRemoval(address indexed lawyer);
    event ApplicantRemoval(address indexed applicant);
    event GovWorkerRemoval(address indexed gov_worker);

    mapping(uint => Application) public applications;
    mapping(uint => mapping (address => bool)) public confirmations;

    //this basically stores each of the important sets
    mapping(address => bool) public isLawyer;
    mapping(address => bool) public isApplicant;
    mapping(address => bool) public isGovWorker;

    //these are the three sets (need x from each to confirm an application)
    address[] public lawyers;
    address[] public applicants;
    address[] public gov_workers;

    uint public lawyer_required; //required number of lawyers
    uint public applicant_required; //required number of applicants
    uint public gov_worker_required; //required number of gov_workers
    uint public applicationCount;
    uint constant public MAX_LAWYER_COUNT = 10;
    uint constant public MAX_APPLICANT_COUNT = 10;
    uint constant public MAX_GOV_WORKER_COUNT = 10;

    struct Application {
         bytes32 docHash; //this is for proof of existence
         bool validated; //if validated, it's added to the set
    }

     /*
     * Modifiers
     */
     modifier senderAccount() {
         require(msg.sender == address(this));
         _;
     }

     //to add ----, they shouldn't already be a part of the set
     modifier lawyerDoesNotExist(address lawyer) {
         require(!isLawyer[lawyer]);
         _;
     }

     modifier applicantDoesNotExist(address applicant) {
         require(!isApplicant[applicant]);
         _;
     }

     modifier govWorkerDoesNotExist(address gov_worker) {
         require(!isGovWorker[gov_worker]);
         _;
     }

     //this checks whether they are part of each set and can therefore confirm the applications
     modifier lawyerExists(address lawyer) {
         require(isLawyer[lawyer]);
         _;
     }

     modifier applicantExists(address applicant) {
         require(isApplicant[applicant]);
         _;
     }

     modifier govWorkerExists(address gov_worker) {
         require(isGovWorker[gov_worker]);
         _;
     }

     //if docHash == 0, then it doesn't exist (is this a valid assumption)
     modifier applicationExists(uint applicationId) {
         require(applications[applicationId].docHash != 0);
         _;
     }

     //the confirmed and notConfirmed are the same for all participants
     //so we make 'address participant' a field
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

     modifier Validated(uint applicationId) {
         require(applications[applicationId].validated);
         _;
     }

     //for security/safety purposes (just makes sure the address is valid)
     modifier notNull(address _address) {
         require(_address != 0);
         _;
     }

     modifier validLawyerRequirement(uint lawyerCount, uint _lawyer_required) {
         require(lawyerCount <= MAX_LAWYER_COUNT
           && _lawyer_required <= lawyerCount
           && _lawyer_required != 0
           && lawyerCount != 0);
           _;
     }

     modifier validApplicantRequirement(uint applicantCount, uint _applicant_required) {
         require(applicantCount <= MAX_APPLICANT_COUNT
           && _applicant_required <= applicantCount
           && _applicant_required != 0
           && applicantCount != 0);
           _;
     }

     modifier validGovWorkerRequirement(uint govWorkerCount, uint _gov_worker_required) {
         require(govWorkerCount <= MAX_GOV_WORKER_COUNT
           && _gov_worker_required <= govWorkerCount
           && _gov_worker_required != 0
           && govWorkerCount != 0);
           _;
     }

     /*
     * Public functions
     */
     //@dev Contract constructor sets initial owners and required number of confirmations
     // @params each of the respective lists of addresses
     // @params how many of each participant must confirm in order to validate the application
     function Validation(
       address[] _lawyers,
       address[] _applicants,
       address[] _gov_workers,
       uint _lawyer_required,
       uint _applicant_required,
       uint _gov_worker_required)
         public
         validLawyerRequirement(_lawyers.length, _lawyer_required)
         validApplicantRequirement(_applicants.length, _applicant_required)
         validGovWorkerRequirement(_gov_workers.length, _gov_worker_required)
     {
         uint i;

         for (i = 0; i<_lawyers.length; i++) {
             require(!isLawyer[_lawyers[i]] && _lawyers[i] != 0);
             isLawyer[_lawyers[i]] = true;
         }
         lawyers = _lawyers;
         lawyer_required = _lawyer_required;

         for (i = 0; i<_applicants.length; i++) {
             require(!isApplicant[_applicants[i]] && _applicants[i] != 0);
             isApplicant[_applicants[i]] = true;
         }
         applicants = _applicants;
         applicant_required = _applicant_required;

         for (i = 0; i<_gov_workers.length; i++) {
             require(!isGovWorker[_gov_workers[i]] && _gov_workers[i] != 0);
             isGovWorker[_gov_workers[i]] = true;
         }
         gov_workers = _gov_workers;
         gov_worker_required = _gov_worker_required;
     }

     //this adds a lawyer
     function addLawyer(address lawyer)
         public
         senderAccount
         lawyerDoesNotExist(lawyer)
         notNull(lawyer)
         validLawyerRequirement(lawyers.length + 1, lawyer_required)
     {
         isLawyer[lawyer] = true;
         lawyers.push(lawyer);
         LawyerAddition(lawyer);
     }

     //this removes a lawyer
     function removeLawyer(address lawyer)
         public
         senderAccount
         lawyerExists(lawyer)
     {
         isLawyer[lawyer] = false;
         for (uint i = 0; i<lawyers.length -1; i++) {
             if (lawyers[i] == lawyer) {
                 lawyers[i] == lawyers[lawyers.length - 1];
                 break;
             }
         }
         lawyers.length -= 1;
         if (lawyer_required > lawyers.length) {
             changeLawyerRequirement(lawyers.length);
         }
         LawyerRemoval(lawyer);
     }

     //this replaces a lawyer
     function replaceLawyer(address lawyer, address newLawyer)
         public
         senderAccount
         lawyerExists(lawyer)
         lawyerDoesNotExist(newLawyer)
    {
        for (uint i = 0; i<lawyers.length; i++) {
            if (lawyers[i] == lawyer) {
                lawyers[i] = newLawyer;
                break;
            }
        }
        isLawyer[lawyer] = false;
        isLawyer[newLawyer] = true;
        LawyerRemoval(lawyer);
        LawyerAddition(newLawyer);
    }

    //this adds an applicant
    function addApplicant(address applicant)
        public
        senderAccount
        applicantDoesNotExist(applicant)
        notNull(applicant)
        validApplicantRequirement(applicants.length + 1, applicant_required)
    {
        isApplicant[applicant] = true;
        applicants.push(applicant);
        ApplicantAddition(applicant);
    }

    //this removes an applicant
    function removeApplicant(address applicant)
        public
        senderAccount
        applicantExists(applicant)
    {
        isApplicant[applicant] = false;
        for (uint i = 0; i<applicants.length-1; i++) {
            if (applicants[i] == applicant) {
                applicants[i] == applicants[applicants.length - 1];
                break;
            }
        }
        applicants.length -= 1;
        if (applicant_required > applicants.length) {
            changeApplicantRequirement(applicants.length);
        }
        ApplicantRemoval(applicant);
    }

    //this replaces an applicant
    function replaceApplicant(address applicant, address newApplicant)
        public
        senderAccount
        applicantExists(applicant)
        applicantDoesNotExist(newApplicant)
   {
       for (uint i = 0; i<applicants.length; i++) {
           if (applicants[i] == applicant) {
               applicants[i] = newApplicant;
               break;
           }
       }
       isApplicant[applicant] = false;
       isApplicant[newApplicant] = true;
       ApplicantRemoval(applicant);
       ApplicantAddition(newApplicant);
   }

   //this adds a gov_worker
   function addGovWorker(address gov_worker)
       public
       senderAccount
       govWorkerDoesNotExist(gov_worker)
       notNull(gov_worker)
       validGovWorkerRequirement(gov_workers.length + 1, gov_worker_required)
   {
       isGovWorker[gov_worker] = true;
       gov_workers.push(gov_worker);
       GovWorkerAddition(gov_worker);
   }

   //this removes an applicant
   function removeGovWorker(address gov_worker)
       public
       senderAccount
       govWorkerExists(gov_worker)
   {
       isGovWorker[gov_worker] = false;
       for (uint i = 0; i<gov_workers.length -1; i++) {
           if (gov_workers[i] == gov_worker) {
               gov_workers[i] == gov_workers[gov_workers.length - 1];
               break;
           }
       }
       gov_workers.length -= 1;
       if (gov_worker_required > gov_workers.length) {
           changeGovWorkerRequirement(gov_workers.length);
       }
       GovWorkerRemoval(gov_worker);
   }

   //this replaces an applicant
   function replaceGovWorker(address gov_worker, address new_gov_worker)
       public
       senderAccount
       govWorkerExists(gov_worker)
       govWorkerDoesNotExist(new_gov_worker)
    {
        for (uint i = 0; i<gov_workers.length; i++) {
            if (gov_workers[i] == gov_worker) {
                gov_workers[i] = new_gov_worker;
                break;
            }
        }
        isGovWorker[gov_worker] = false;
        isGovWorker[new_gov_worker] = true;
        GovWorkerRemoval(gov_worker);
        GovWorkerAddition(new_gov_worker);
    }

    //used to change the requirements (specifically when we take out a participant)
    function changeLawyerRequirement(uint _required)
        public
        senderAccount
        validLawyerRequirement(lawyers.length, _required)
    {
        lawyer_required = _required;
        LawyerRequirementChange(_required);
    }

    function changeApplicantRequirement(uint _required)
        public
        senderAccount
        validApplicantRequirement(applicants.length, _required)
    {
        applicant_required = _required;
        ApplicantRequirementChange(_required);
    }

    function changeGovWorkerRequirement(uint _required)
        public
        senderAccount
        validGovWorkerRequirement(gov_workers.length, _required)
    {
        gov_worker_required = _required;
        GovWorkerRequirementChange(_required);
    }

    /*
    * @dev allows an applicant to submit an application
    * @param docHash is the dochash
    */
    function submitApplication(bytes32 docHash)
        public
        applicantExists(msg.sender)
        returns (uint applicationId)
    {
        applicationId = addApplication(docHash);
        applicantConfirmApplication(applicationId);
    }

    /*
    * Confirming Applications
    */
    function lawyerConfirmApplication(uint applicationId)
        public
        lawyerExists(msg.sender)
        applicationExists(applicationId)
        notConfirmed(applicationId, msg.sender)
    {
        confirmations[applicationId][msg.sender] = true;
        Confirmation(msg.sender, applicationId);
        //validateApplication(applicationId);
    }

    function applicantConfirmApplication(uint applicationId)
        public
        applicantExists(msg.sender)
        applicationExists(applicationId)
        notConfirmed(applicationId, msg.sender)
    {
        confirmations[applicationId][msg.sender] = true;
        Confirmation(msg.sender, applicationId);
        //validateApplication(applicationId);
    }

    function govWorkerConfirmApplication(uint applicationId)
        public
        govWorkerExists(msg.sender)
        applicationExists(applicationId)
        notConfirmed(applicationId, msg.sender)
    {
        confirmations[applicationId][msg.sender] = true;
        Confirmation(msg.sender, applicationId);
        //validateApplication(applicationId);
    }

    /*
    * Revoke Confirmations
    */
    function lawyerRevokeConfirmation(uint applicationId)
        public
        lawyerExists(msg.sender)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        confirmations[applicationId][msg.sender] = false;
        Revocation(msg.sender, applicationId);
    }

    function applicantRevokeConfirmation(uint applicationId)
        public
        applicantExists(msg.sender)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        confirmations[applicationId][msg.sender] = false;
        Revocation(msg.sender, applicationId);
    }

    function govWorkerRevokeConfirmation(uint applicationId)
        public
        govWorkerExists(msg.sender)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        confirmations[applicationId][msg.sender] = false;
        Revocation(msg.sender, applicationId);
    }

    //notary should be the only one validating applications
    function lawyerValidateTransaction(uint applicationId)
        public
        lawyerExists(msg.sender)
        confirmed(applicationId, msg.sender)
        notValidated(applicationId)
    {
        if (isConfirmed(applicationId)) {
            Application storage app = applications[applicationId];
            app.validated = true;
            if (app.docHash != 0) {
                ValEvent(applicationId);
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
        uint lawyer_count = 0;
        uint applicant_count = 0;
        uint gov_worker_count = 0;

        bool lawyer_val = false;
        bool applicant_val = false;
        bool gov_worker_val = false;

        uint i; //use this for all 3 for loops

        for (i = 0; i<lawyers.length; i++) {
            if (confirmations[applicationId][lawyers[i]]) {
                lawyer_count += 1;
            }
            if (lawyer_count == lawyer_required) {
                lawyer_val = true;
                break;
            }
        }

        for (i = 0; i<applicants.length; i++) {
            if (confirmations[applicationId][applicants[i]]) {
                applicant_count += 1;
            }
            if (applicant_count == applicant_required) {
                applicant_val = true;
                break;
            }
        }

        for (i = 0; i<gov_workers.length; i++) {
            if (confirmations[applicationId][gov_workers[i]]) {
                gov_worker_count += 1;
            }
            if (gov_worker_count == gov_worker_required) {
                gov_worker_val = true;
                break;
            }
        }

        return (lawyer_val && applicant_val && gov_worker_val);
    }

    /*
    * Internal functions
    */
    //@dev  Adds a new application to the application mapping, if the application does not exist yet
    function addApplication(bytes32 docHash)
        internal
        returns (uint applicationId)
    {
        applicationId = applicationCount;
        applications[applicationId] = Application({
          docHash: docHash,
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
    //@return number of confirmations from lawyers
    function getLawyerConfirmationCount(uint applicationId)
        public
        constant
        returns (uint lawyer_count)
    {
        for (uint i = 0; i<lawyers.length; i++) {
             if (confirmations[applicationId][lawyers[i]]) {
               lawyer_count += 1;
             }
        }
    }

    function getApplicantConfirmationCount(uint applicationId)
        public
        constant
        returns (uint applicant_count)
    {
        for (uint i = 0; i<applicants.length; i++) {
             if (confirmations[applicationId][applicants[i]]) {
               applicant_count += 1;
             }
        }
    }

    function getGovWorkerConfirmationCount(uint applicationId)
        public
        constant
        returns (uint gov_worker_count)
    {
        for (uint i = 0; i<gov_workers.length; i++) {
             if (confirmations[applicationId][gov_workers[i]]) {
               gov_worker_count += 1;
             }
        }
    }

    //@dev returns total number of applications after filers are applied
    //@param pending Include pending applications
    //@param validated Include validated applications
    //@return total number of applications after filters are applied
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

    //@dev returns list of lawyers
    //@return list of lawyer associated addresses
    function getLawyers()
        public
        constant
        returns (address[])
    {
        return lawyers;
    }

    //@dev returns list of applicants
    //@return list of applicant associated addresses
    function getApplicants()
        public
        constant
        returns (address[])
    {
        return applicants;
    }

    //@dev returns list of lawyers
    //@return list of lawyer associated addresses
    function getGovWorkers()
        public
        constant
        returns (address[])
    {
        return gov_workers;
    }

    //@dev returns array with lawyer addresses, which confirmed applications
    //@param applicationId Application ID
    //@param returns array of lawyer addresses
    function getLawyerConfirmations(uint applicationId)
        public
        constant
        returns (address[] _lawyer_confirmations)
    {
        address[] memory confirmationsTemp = new address[](lawyers.length);
        uint count = 0;
        uint i;
        for (i = 0; i<lawyers.length; i++) {
            if (confirmations[applicationId][lawyers[i]]) {
                confirmationsTemp[count] = lawyers[i];
                count += 1;
            }
        }

        _lawyer_confirmations = new address[](count);
        for (i = 0; i<count; i++) {
            _lawyer_confirmations[i] = confirmationsTemp[i];
        }
    }

    //@dev returns array with applicant addresses, which confirmed applications
    //@param applicationId Application ID
    //@param returns array of applicant addresses
    function getApplicantConfirmations(uint applicationId)
        public
        constant
        returns (address[] _applicant_confirmations)
    {
        address[] memory confirmationsTemp = new address[](applicants.length);
        uint count = 0;
        uint i;
        for (i = 0; i<applicants.length; i++) {
            if (confirmations[applicationId][applicants[i]]) {
                confirmationsTemp[count] = applicants[i];
                count += 1;
            }
        }

        _applicant_confirmations = new address[](count);
        for (i = 0; i<count; i++) {
            _applicant_confirmations[i] = confirmationsTemp[i];
        }
    }

    //@dev returns array with gov_worker addresses, which confirmed applicationId
    //@param applicationId Application ID
    //@param returns array of gov_workers addresses
    function getGovWorkerConfirmations(uint applicationId)
        public
        constant
        returns (address[] _gov_worker_confirmations)
    {
        address[] memory confirmationsTemp = new address[](gov_workers.length);
        uint count = 0;
        uint i;
        for (i = 0; i<gov_workers.length; i++) {
            if (confirmations[applicationId][gov_workers[i]]) {
                confirmationsTemp[count] = gov_workers[i];
                count += 1;
            }
        }

        _gov_worker_confirmations = new address[](count);
        for (i = 0; i<count; i++) {
            _gov_worker_confirmations[i] = confirmationsTemp[i];
        }
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
    function() public {revert();}
}
