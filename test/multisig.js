var Multisig = artifacts.require("./Multisig.sol");

contract('Multisig', function(accounts) {
    it("it should replace the lawyer account", function() {
      var multisig;

      var law_account = accounts[0];
      var applicant_account = accounts[1];
      var gov_applicant = accounts[2];

      var new_law_account = accounts[3];

      var fake_address = "123 San Juan Drive";
      var hashCode;
      hashCode = function(fake_address){
        return fake_address.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
      }

      return Multisig.deployed().then(function(instance) {
        multisig = instance;
        return law_account.replaceLawyer(accounts[3]);
      }).then(function(balance) {
        var appid = applicant_account.submitApplication(hashCode, fake_address)
        asset.equal(multisig.getApplicationCount(true, true), 1, "1 is now the number of submitted applications");
      });
    });
});
