import Func "mo:base/Func";
import Text "mo:base/Text";

// backend/main.mo
import Array "mo:base/Array";
import Iter "mo:base/Iter";

actor {

  // Define a record type for TaxPayer
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Stable variable to store TaxPayer records
  stable var taxPayers: [TaxPayer] = [];

  // Function to add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text): async () {
    let newTaxPayer: TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers := Array.append(taxPayers, [newTaxPayer]);
  };

  // Query function to retrieve all TaxPayer records
  public query func getAllTaxPayers(): async [TaxPayer] {
    return taxPayers;
  };

  // Query function to search for a TaxPayer by TID
  public query func searchTaxPayerByTID(tid: Text): async ?TaxPayer {
    return Array.find<TaxPayer>(taxPayers, func (taxPayer) {
      taxPayer.tid == tid
    });
  };
}
