// frontend/index.js
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as backend_idl, canisterId as backend_id } from "declarations/backend";

const agent = new HttpAgent();
const backend = Actor.createActor(backend_idl, { agent, canisterId: backend_id });

document.getElementById("addTaxPayerForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const tid = document.getElementById("tid").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    loadTaxPayers();
});

document.getElementById("searchButton").addEventListener("click", async () => {
    const tid = document.getElementById("searchTID").value;
    const result = await backend.searchTaxPayerByTID(tid);
    const searchResultDiv = document.getElementById("searchResult");
    if (result) {
        searchResultDiv.innerText = `Found: ${result.firstName} ${result.lastName}, ${result.address}`;
    } else {
        searchResultDiv.innerText = "No TaxPayer found with that TID.";
    }
});

async function loadTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    const taxPayerList = document.getElementById("taxPayerList");
    taxPayerList.innerHTML = "";
    taxPayers.forEach(taxPayer => {
        const li = document.createElement("li");
        li.innerText = `${taxPayer.tid}: ${taxPayer.firstName} ${taxPayer.lastName}, ${taxPayer.address}`;
        taxPayerList.appendChild(li);
    });
}

loadTaxPayers();
