let account;

const accessToMetamask = async () => {
    if (window.ethereum !== "undefined") {
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            const account = accounts[0];
            console.log("Account accessed:", account);

            ethereum.on('accountsChanged', (accounts) => {
                if (accounts.length === 0) {

                    window.location.href = "../html/metamaskLogin.html";
                }
            });

            return true;
        } catch (error) {
            console.error("Error accessing MetaMask:", error);

            window.location.href = "../html/metamaskLogin.html";
        }
    } else {
        console.error("MetaMask is not installed.");

        window.location.href = "../html/metamaskLogin.html";
    }
};


const accessToContract = async () => {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const ABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "DurianHarvested",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "enum DurianContract.DurianState",
                        "name": "newState",
                        "type": "uint8"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "durianType",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "farmLocation",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weightInGram",
                        "type": "uint256"
                    }
                ],
                "name": "recordHarvestDurian",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "removeDurian",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "companyAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "companyName",
                        "type": "string"
                    },
                    {
                        "internalType": "enum DurianContract.UserRole",
                        "name": "role",
                        "type": "uint8"
                    }
                ],
                "name": "setUser",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferDurianOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "updateSpoiledState",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "authorizedFarmers",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "batchCodes",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "durians",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "durianType",
                        "type": "string"
                    },
                    {
                        "internalType": "enum DurianContract.DurianState",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "weightInGram",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "currentOwner",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "farmLocation",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "arriveAtDistributorTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "arriveAtRetailerTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "addedTimestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "distributorName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "retailerName",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "durianStateTimestamps",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "generateTrackingReport",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "durianType",
                        "type": "string"
                    },
                    {
                        "internalType": "enum DurianContract.DurianState",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "harvestDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "farmLocation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "distributorName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "retailerName",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBatchCodes",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "getDurian",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "batchCode",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "durianType",
                                "type": "string"
                            },
                            {
                                "internalType": "enum DurianContract.DurianState",
                                "name": "state",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "weightInGram",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "currentOwner",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "farmLocation",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtDistributorTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtRetailerTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "addedTimestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "distributorName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "retailerName",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct DurianContract.Durian",
                        "name": "",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "getDurianStateTimestamps",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getSpoiledDurians",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "batchCode",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "durianType",
                                "type": "string"
                            },
                            {
                                "internalType": "enum DurianContract.DurianState",
                                "name": "state",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "weightInGram",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "currentOwner",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "farmLocation",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtDistributorTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtRetailerTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "addedTimestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "distributorName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "retailerName",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct DurianContract.Durian[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getTransactions",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "from",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "to",
                                "type": "address"
                            },
                            {
                                "internalType": "uint256",
                                "name": "durianId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum DurianContract.Action",
                                "name": "action",
                                "type": "uint8"
                            }
                        ],
                        "internalType": "struct DurianContract.Transaction[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "user",
                        "type": "address"
                    }
                ],
                "name": "getUserDurians",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "uint256",
                                "name": "batchCode",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "durianType",
                                "type": "string"
                            },
                            {
                                "internalType": "enum DurianContract.DurianState",
                                "name": "state",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "weightInGram",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "currentOwner",
                                "type": "address"
                            },
                            {
                                "internalType": "string",
                                "name": "farmLocation",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtDistributorTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "arriveAtRetailerTime",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "timestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "addedTimestamp",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "distributorName",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "retailerName",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct DurianContract.Durian[]",
                        "name": "",
                        "type": "tuple[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "batchCode",
                        "type": "uint256"
                    }
                ],
                "name": "isBatchCodeExisted",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    }
                ],
                "name": "isProfileSet",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "transactions",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "durianId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum DurianContract.Action",
                        "name": "action",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "name": "users",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "companyAddress",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "companyName",
                        "type": "string"
                    },
                    {
                        "internalType": "enum DurianContract.UserRole",
                        "name": "role",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum DurianContract.UserState",
                        "name": "state",
                        "type": "uint8"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const Address = "0x1d9Ec2025191e03a5aF711061E48915C84F73DfC";
        window.web3 = new Web3(window.ethereum);
        window.contract = new window.web3.eth.Contract(ABI, Address);
        console.log("Contract accessed successfully:", window.contract);
    } catch (error) {
        console.error("Error accessing contract:", error);
    }
}

async function addDurian() {
    const batchCode = $("#batchCode").val();
    const durianType = $("#durianType").val();
    const farmLocation = $("#farmLocation").val();
    const weightInGram = $("#weightInGram").val();

    if (!batchCode || !durianType || !farmLocation || !weightInGram) {
        $("#statusMessage").text("Error: All fields are required.");
        return;
    }

    const parsedBatchCode = parseInt(batchCode, 10);
    const parsedWeightInGram = parseInt(weightInGram, 10);

    if (isNaN(parsedBatchCode) || parsedBatchCode <= 0) {
        $("#statusMessage").text("Error: Batch code must be a valid positive integer.");
        return;
    }

    if (isNaN(parsedWeightInGram) || parsedWeightInGram <= 0) {
        $("#statusMessage").text("Error: Weight must be a valid positive integer.");
        return;
    }

    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const user = await window.contract.methods.users(account).call();
        const userRole = parseInt(user.role);

        const isDeleted = await window.contract.methods.isBatchCodeExisted(batchCode).call();
        if (isDeleted) {
            $("#statusMessage").text("This batch code was previously added and cannot be reused.");
            return;
        }

        if (userRole !== 1) {
            const message = "Only authorized farmers are allowed to add durians.";
            const redirectUrl = "";
            await showAlert(message, redirectUrl);
            return;
        }

        const result = await window.contract.methods
            .recordHarvestDurian(parsedBatchCode, durianType, farmLocation, parsedWeightInGram)
            .send({ from: account });


        $("#statusMessage").text("Durian added successfully: " + result.transactionHash);
        console.log("Adding durian with params:", parsedBatchCode, durianType, farmLocation, parsedWeightInGram);

    } catch (error) {
        console.error("Error adding durian:", error);
        $("#statusMessage").text("Error adding durian: " + error.message);
    }
}

let current_AllDurianPage = 1;
const allItemsPerPage = 7;
let allDuriansData = [];

async function fetchAllDurians() {
    try {
        const batchCodes = await window.contract.methods.getBatchCodes().call();
        allDuriansData = [];
        for (const batchCode of batchCodes) {
            try {
                const durian = await window.contract.methods.getDurian(batchCode).call();
                const timestamps = await window.contract.methods.getDurianStateTimestamps(batchCode).call();

                const stateTimestamps = {
                    Harvested: timestamps[0] ? formatDate(timestamps[0]) : "N/A",
                    AtDistributor: timestamps[1] ? formatDate(timestamps[1]) : "N/A",
                    AtRetailer: timestamps[2] ? formatDate(timestamps[2]) : "N/A",
                };

                allDuriansData.push({
                    batchCode: durian.batchCode,
                    durianType: durian.durianType,
                    weightInGram: durian.weightInGram,
                    currentOwner: durian.currentOwner,
                    state: getDurianStateString(parseInt(durian.state)),
                    farmLocation: durian.farmLocation,
                    timestamps: stateTimestamps
                });
            } catch (innerError) {
                console.error(`Error fetching durian with batch code ${batchCode}:`, innerError);
            }
        }

        renderAllDuriansPage(1);
        setupAllDurianPagination();
    } catch (error) {
        console.error("Error fetching all durians:", error);
        document.getElementById("durianList").innerHTML = "<tr><td colspan='9' style='text-align: center;'>Error fetching durians</td></tr>";
    }
}

function renderAllDuriansPage(page) {
    const startIndex = (page - 1) * allItemsPerPage;
    const endIndex = Math.min(startIndex + allItemsPerPage, allDuriansData.length);
    const duriansToDisplay = allDuriansData.slice(startIndex, endIndex);

    const durianList = document.getElementById("durianList");
    durianList.innerHTML = duriansToDisplay.map(durian => `
    <tr>
      <td>${durian.batchCode}</td>
      <td>${durian.durianType}</td>
      <td>${durian.weightInGram}</td>
      <td>${durian.currentOwner}</td>
      <td>${durian.state}</td>
      <td>${durian.farmLocation}</td>
      <td>${durian.timestamps.Harvested}</td>
      <td>${durian.timestamps.AtDistributor}</td>
      <td>${durian.timestamps.AtRetailer}</td>
    </tr>
  `).join('');
}


function setupAllDurianPagination() {
    const totalPages = Math.ceil(allDuriansData.length / allItemsPerPage);
    const durianListPagination = document.getElementById('durianListPagination');
    durianListPagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-outline-primary mx-1 ${i === current_AllDurianPage ? 'active' : ''}`;
        button.textContent = i;
        button.onclick = () => changeAllDurianPage(i);
        durianListPagination.appendChild(button);
    }
}

function changeAllDurianPage(page) {
    current_AllDurianPage = page;
    renderAllDuriansPage(page);
    setupAllDurianPagination();
}


// async function updateDurianState(durianId, newState) {
//     try {
//         const accounts = await window.web3.eth.getAccounts();
//         await window.contract.methods.updateDurianState(durianId, newState).send({ from: accounts[0] });
//     } catch (error) {
//         console.error("Error updating durian state:", error);
//         throw error;
//     }
// }

async function loadUserRole() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        const user = await window.contract.methods.users(userAddress).call();
        const role = parseInt(user.role);

        document.getElementById("userRoleNotice").innerText = `${getRoleName(role)}`;
    } catch (error) {
        console.error("Error loading user role:", error);
        document.getElementById("userRoleNotice").innerText = "Error loading role. Please try again.";
    }
}


function getRoleName(role) {
    return ["Unassigned", "Farmer", "Distributor", "Retailer", "Consumer"][role] || "Unknown";
}

function getStateName(state) {
    return ["Harvested", "At Distributor", "At Retailer", "Sold", "Spoiled"][state] || "Unknown";
}

async function loadSpoiledDurians() {
    try {
        const spoiledDurians = await window.contract.methods.getSpoiledDurians().call();
        const spoiledDurianSelect = $('#spoiledDurianSelect');

        spoiledDurianSelect.empty();
        spoiledDurianSelect.append('<option value="">Select a spoiled durian...</option>');


        spoiledDurians.forEach(durian => {
            spoiledDurianSelect.append(`<option value="${durian.batchCode}">${durian.batchCode}</option>`);
        });
    } catch (error) {
        console.error("Error loading spoiled durians:", error);
        $('#deleteStatus').text('Error loading spoiled durians.');
    }
}

// async function deleteSpoiledDurian() {
//     const durianBatchCode = $('#spoiledDurianSelect').val();

//     if (!durianBatchCode || isNaN(durianBatchCode)) {
//         $('#deleteStatus').text('Please select a valid spoiled durian to delete.');
//         return;
//     }

//     try {
//         const batchCode = parseInt(durianBatchCode, 10);

//         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

//         await window.contract.methods.removeDurian(batchCode).send({ from: accounts[0] });

//         $('#deleteStatus').text('Spoiled durian deleted successfully.');
//         loadSpoiledDurians();
//     } catch (error) {
//         if (error.code === 4001) {
          
//             $('#deleteStatus').text('Transaction was cancelled by the user.');
//         } else {
//             console.error("Error deleting spoiled durian:", error);
//             $('#deleteStatus').text('Error deleting spoiled durian.');
//         }
//     }
// }

function getDurianStateString(state) {
    switch (parseInt(state)) {
        case 0: return "Harvested";
        case 1: return "At Distributor";
        case 2: return "At Retailer";
        case 3: return "Sold";
        case 4: return "Spoiled";
        default: return "Unknown";
    }
}

function formatDate(timestamp) {
    if (timestamp == null) return "N/A";
    
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

async function setUserInfo() {
    try {
        const name = document.getElementById("name").value;
        const companyAddress = document.getElementById("companyAddress").value;
        const companyName = document.getElementById("companyName").value;
        const role = parseInt(document.getElementById("role").value);

        if (!name || !companyAddress || !companyName || isNaN(role) || role < 0) {
            document.getElementById("statusMessage").innerText = "Please fill in all fields correctly.";
            return;
        }

        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        await window.contract.methods.setUser(name, userAddress, companyAddress, companyName, role).send({ from: userAddress });

        document.getElementById("statusMessage").innerText = "User information set successfully.";

        setTimeout(() => {
            window.location.href = "profile.html";
        }, 1000);
    } catch (error) {
        console.error("Error setting user information:", error);
        document.getElementById("statusMessage").innerText = "Error setting user information.";
    }
}


async function checkUserProfile() {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        const profileSet = await window.contract.methods.isProfileSet(userAddress).call();

        if (!profileSet) {
            showAlert("You must set up your profile before you can utilize the functions.", "setupProfile.html");
        }
    } catch (error) {
        console.error("Error checking user profile:", error);
        document.getElementById("statusMessage").innerText = "Error checking user profile. Please try again.";
    }
}

async function showAlert(message, redirectUrl) {

    const modalHtml = `
        <div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="alertModalLabel">Notice</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="redirectButton">Okay</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const alertModal = new bootstrap.Modal(document.getElementById("alertModal"));
    alertModal.show();

    document.getElementById("redirectButton").addEventListener("click", () => {
        window.location.href = redirectUrl;
    });
}

function getActionString(action) {
    switch (action) {
        case "0":
            return "Harvested";
        case "1":
            return "Transferred";
        case "2":
            return "Updated State";
        case "3":
            return "Removed";
        default:
            return "Unknown Action";
    }
};

function getRoleString(role) {
    switch (role) {
        case '0':
            return 'Unassigned';
        case '1':
            return 'Farmer';
        case '2':
            return 'Distributor';
        case '3':
            return 'Retailer';
        case '4':
            return 'Consumer';
        default:
            return 'Unknown Role';
    }
}

function getStateString(state) {
    switch (state) {
        case '0':
            return 'Active';
        case '1':
            return 'Deactivated';
        default:
            return 'Unknown State';
    }
}

async function getUserInfo() {
    try {
        if (!window.contract) {
            await accessToContract();
        }
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const userAddress = accounts[0];

        const user = await window.contract.methods.users(userAddress).call();
        document.getElementById("userName").innerText = user.name;
        document.getElementById("userCompanyAddress").innerText = user.companyAddress;
        document.getElementById("userCompanyName").innerText = user.companyName;
        document.getElementById("userRole").innerText = getRoleString(user.role);
        document.getElementById("userState").innerText = getStateString(user.state);

    } catch (error) {
        console.error("Error fetching user information:", error);
    }
}

async function generateQRCode() {
    const batchCode = document.getElementById('batchCodeInput').value;
    if (!batchCode) {
        const message = "Please enter a valid batch code.";
        const redirectUrl = "";
        await showAlert(message, redirectUrl);
        return;
    }

    const isExisting = await window.contract.methods.isBatchCodeExisted(batchCode).call();
        if (!isExisting) {
            const message = "This batch code does not exist.";
            const redirectUrl = "";
            await showAlert(message, redirectUrl);
            return;
        }


    const url = `http://127.0.0.1:5500/src/html/durianQRInfo.html?batchCode=${batchCode}`;

    const qr = new QRious({
        element: document.getElementById('qrCodeCanvas'),
        value: url,
        size: 200
    });

    console.log("Generated URL:", url);
}


async function getDurianInfo() {
    const params = new URLSearchParams(window.location.search);
    const batchCode = params.get('batchCode');

    console.log("Batch Code from URL:", batchCode);

    if (!batchCode) {
        document.getElementById('durianInfo').innerText = "No batch code provided.";
        return;
    }

    try {
        const batchCodeNumber = parseInt(batchCode, 10);
        const durian = await window.contract.methods.getDurian(batchCodeNumber).call();
        const durianState = getDurianStateString(parseInt(durian.state));

        if (durian) {
            document.getElementById('durianInfo').innerHTML = `
              <p><strong>Batch Code:</strong> ${durian.batchCode || "N/A"}</p>
              <p><strong>Durian Type:</strong> ${durian.durianType || "N/A"}</p>
              <p><strong>Current State:</strong> ${durianState || "N/A"}</p>
              <p><strong>Current Owner:</strong> ${durian.currentOwner || "N/A"}</p>
              <p><strong>Farm Location:</strong> ${durian.farmLocation || "N/A"}</p>
              <p><strong>Harvest Date:</strong> ${durian.timestamp ? new Date(durian.timestamp * 1000).toLocaleString() : "N/A"}</p>
              <p><strong>Arrived at Distributor:</strong> ${durian.arriveAtDistributorTime > 0 ? new Date(durian.arriveAtDistributorTime * 1000).toLocaleString() : "N/A"}</p>
              <p><strong>Arrived at Retailer:</strong> ${durian.arriveAtRetailerTime > 0 ? new Date(durian.arriveAtRetailerTime * 1000).toLocaleString() : "N/A"}</p>
            `;

        } else {
            document.getElementById('durianInfo').innerText = "Durian data not found.";
        }
    } catch (error) {
        console.error("Error fetching durian info:", error);
        document.getElementById('durianInfo').innerText = "Error fetching durian data.";
    }
}

async function generateTrackingReport() {
    const batchCode = document.getElementById("batchCodeInput").value;

    if (!batchCode) {
        const message = "Please enter a batch code.";
        const redirectUrl = "";
        await showAlert(message, redirectUrl);
        return;
    }

    try {
        const batchCodeNumber = parseInt(batchCode, 10);

        const isExisting = await window.contract.methods.isBatchCodeExisted(batchCodeNumber).call();
        if (!isExisting) {
            const message = "This batch code does not exist.";
            const redirectUrl = "";
            await showAlert(message, redirectUrl);
            return;
        }

        const durianData = await window.contract.methods.generateTrackingReport(batchCodeNumber).call();

        document.getElementById("reportBatchCode").textContent = durianData[0];
        document.getElementById("reportDurianType").textContent = durianData[1];
        document.getElementById("reportCurrentState").textContent = getDurianStateString(durianData[2]);
        document.getElementById("reportHarvestDate").textContent = new Date(durianData[3] * 1000).toLocaleDateString();
        document.getElementById("reportFarmLocation").textContent = durianData[4];
        document.getElementById("reportDistributor").textContent = durianData[5] || "No distributor involved";
        document.getElementById("reportRetailer").textContent = durianData[6] || "No retailer involved";

        document.getElementById("reportContent").style.display = "block";
        document.getElementById("exportPDFButton").style.display = "inline-block";

    } catch (error) {
        console.error("Error fetching data from blockchain:", error);
        alert("Failed to retrieve data from the blockchain.");
    }
}

async function exportReportAsPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const logo = '../assets/images/logos/TraceMyDurian.png';
    doc.addImage(logo, 'PNG', 10, 4, 30, 30); 
    doc.setFontSize(16);
    doc.text("Durian Tracking Report", 70, 25); 
    doc.setLineWidth(0.5);
    doc.line(10, 30, 200, 30); 
    
    const tableData = [
        ["Batch Code", document.getElementById("reportBatchCode").textContent],
        ["Durian Type", document.getElementById("reportDurianType").textContent],
        ["Current State", document.getElementById("reportCurrentState").textContent],
        ["Harvest Date", document.getElementById("reportHarvestDate").textContent],
        ["Farm Location", document.getElementById("reportFarmLocation").textContent],
        ["Distributor", document.getElementById("reportDistributor").textContent],
        ["Retailer", document.getElementById("reportRetailer").textContent]
    ];

    doc.autoTable({
        head: [['Description', 'Details']],
        body: tableData,
        startY: 40,
        margin: { top: 10, left: 10, bottom: 10, right: 10 },
        styles: {
            font: 'helvetica',
            fontSize: 10,
            cellPadding: 4,
            halign: 'left',
        },
        columnStyles: {
            0: { cellWidth: 'auto' },
            1: { cellWidth: 80 },
        },
    });

    const now = new Date();
    const dateFormatted = now.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;  
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const timeFormatted = `${hours}:${minutes} ${ampm}`;

    doc.setFontSize(10);
    doc.text(`Date Time: ${dateFormatted} ${timeFormatted} `, 10, doc.internal.pageSize.height - 30);

    doc.setFontSize(8);
    doc.text("Generated by the Durian Tracking System", 10, doc.internal.pageSize.height - 20);
    doc.text("Visit us at: www.tracemydurian.com", 10, doc.internal.pageSize.height - 10);

    doc.save("durian_tracking_report.pdf");
}

async function fetchDurianDataStatisic() {
    try {
        const durianIds = await contract.methods.getBatchCodes().call();
        const harvestedDurian = [];
        const spoiledDurian = [];
        const soldDurian = [];
        const atDistributorDurian = [];
        const atRetailerDurian = [];

        for (let i = 0; i < durianIds.length; i++) {
            const durian = await contract.methods.getDurian(durianIds[i]).call();

            const currentMonth = new Date().getMonth();

            console.log(currentMonth);
            if (durian.state == 0) { // Harvested
                harvestedDurian.push(currentMonth);
            } else if (durian.state == 4) { // Spoiled
                spoiledDurian.push(currentMonth);
            } else if (durian.state == 3) { // Sold
                soldDurian.push(currentMonth);
            } else if (durian.state == 1) { // At Distributor
                atDistributorDurian.push(currentMonth);
            } else if (durian.state == 2) { // At Retailer
                atRetailerDurian.push(currentMonth);
            }
        }

        const monthlyData = groupByMonth(harvestedDurian, spoiledDurian, soldDurian, atDistributorDurian, atRetailerDurian);
        const rotatedData = rotateDataByCurrentMonth(monthlyData);

        drawChart(rotatedData);
    } catch (error) {
        console.error("Error fetching data from contract: ", error);
    }
}

function groupByMonth(harvested, spoiled, sold, atDistributor, atRetailer) {
    const monthlyData = {
        harvested: Array(12).fill(0),
        spoiled: Array(12).fill(0),
        sold: Array(12).fill(0),
        atDistributor: Array(12).fill(0),
        atRetailer: Array(12).fill(0)
    };

    harvested.forEach(month => monthlyData.harvested[month]++);
    spoiled.forEach(month => monthlyData.spoiled[month]++);
    sold.forEach(month => monthlyData.sold[month]++);
    atDistributor.forEach(month => monthlyData.atDistributor[month]++);
    atRetailer.forEach(month => monthlyData.atRetailer[month]++);

    return monthlyData;
}


function rotateDataByCurrentMonth(data) {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const labelsWithYears = generateMonthLabelsWithYears(currentMonth, currentYear);

    const rotatedData = {
        harvested: rotateArray(data.harvested, currentMonth),
        spoiled: rotateArray(data.spoiled, currentMonth),
        sold: rotateArray(data.sold, currentMonth),
        atDistributor: rotateArray(data.atDistributor, currentMonth),
        atRetailer: rotateArray(data.atRetailer, currentMonth),
        labels: rotateArray(labelsWithYears, currentMonth)
    };

    return rotatedData;
}

function generateMonthLabelsWithYears(currentMonth, currentYear) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const labelsWithYears = months.map((month, index) =>
        `${month} ${currentYear + (index < currentMonth ? 1 : 0)}`
    );
    return labelsWithYears;
}

function rotateArray(array, index) {
    return array.slice(index).concat(array.slice(0, index));
}

function drawChart(data) {
    const ctx = document.getElementById('durianChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Harvested',
                    data: data.harvested,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Spoiled',
                    data: data.spoiled,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Sold',
                    data: data.sold,
                    backgroundColor: 'rgba(255, 159, 64, 0.5)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                },
                {
                    label: 'At Distributor',
                    data: data.atDistributor,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                },
                {
                    label: 'At Retailer',
                    data: data.atRetailer,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

async function handleOwnershipTransfer() {
    const batchCode = document.getElementById('batchCodeInput').value;
    const newOwner = document.getElementById('newOwnerInput').value;
    const statusElement = document.getElementById('transferStatus');

    const batchCodeNumber = parseInt(batchCode, 10);
    if (!batchCodeNumber || !newOwner) {
        statusElement.textContent = "Please provide both batch code and new owner address.";
        statusElement.style.color = "red";
        return;
    }

    if (!web3.utils.isAddress(newOwner)) {
        statusElement.textContent = "Invalid Ethereum address for the new owner.";
        statusElement.style.color = "red";
        return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const currentAccount = accounts[0];

    if (newOwner.toLowerCase() === currentAccount.toLowerCase()) {
        statusElement.textContent = "You cannot transfer ownership to yourself.";
        statusElement.style.color = "red";
        return;
    }

    try {
        const durian = await window.contract.methods.getDurian(batchCodeNumber).call();

        if (durian.currentOwner.toLowerCase() !== currentAccount.toLowerCase()) {
            statusElement.textContent = "You do not own the specified durian batch.";
            statusElement.style.color = "red";
            return;
        }

        const currentTime = Math.floor(Date.now() / 1000); 
        const batchAddTime = durian.addedTimestamp; 

        if (currentTime - batchAddTime < 60) {
            let remainingTime = 60 - (currentTime - batchAddTime);
            statusElement.textContent = `You must wait ${remainingTime} seconds before transferring ownership.`;
            statusElement.style.color = "orange";
            
            const countdownInterval = setInterval(() => {
                remainingTime -= 1;
                statusElement.textContent = `You must wait ${remainingTime} seconds before transferring ownership.`;
                if (remainingTime <= 0) {
                    clearInterval(countdownInterval);
                    statusElement.textContent = "You can now transfer ownership.";
                    statusElement.style.color = "green";
                }
            }, 1000);

            return;
        }

        showConfirmationAlert(
            `Are you sure you want to transfer ownership of durian batch ${batchCodeNumber} to ${newOwner}?`,
            async () => {
                try {
                    statusElement.textContent = "Processing transaction...";
                    statusElement.style.color = "blue";

                    const tx = await window.contract.methods.transferDurianOwnership(batchCodeNumber, newOwner).send({
                        from: currentAccount, gas: 400000 
                    });

                    if (tx.status) {
                        statusElement.textContent = `Ownership of durian batch ${batchCodeNumber} successfully transferred to ${newOwner}.`;
                        statusElement.style.color = "green";
                        console.log("Transaction successful:", tx);
                    } else {
                        statusElement.textContent = `Transaction failed. Please try again.`;
                        statusElement.style.color = "red";
                        console.error("Transaction failed:", tx);
                    }
                } catch (error) {
                    console.error("Error during ownership transfer:", error);
                    statusElement.textContent = `Error: ${error.message || "An unexpected error occurred."}`;
                    statusElement.style.color = "red";
                }
            }
        );
    } catch (error) {
        console.error("Error retrieving durian:", error);
        statusElement.textContent = `Error: ${error.message || "An unexpected error occurred."}`;
        statusElement.style.color = "red";
    }
}


async function BatchCodeDropdown() {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    const currentAccount = accounts[0];

    try {

        const userDurians = await window.contract.methods.getUserDurians(currentAccount).call();

        const batchCodeInput = document.getElementById('batchCodeInput');
        batchCodeInput.innerHTML = '<option value="">Select a durian batch code</option>';

        if (userDurians.length === 0) {
            batchCodeInput.innerHTML += '<option value="">No durians found</option>';
            return;
        }

        userDurians.forEach(durian => {
            const option = document.createElement('option');
            option.value = durian.batchCode;
            option.textContent = durian.batchCode;
            batchCodeInput.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching user durians:", error);
    }
}

async function showConfirmationAlert(message, callback) {
    const existingModal = document.getElementById('confirmationModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modalHtml = `
        <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmationModalLabel">Confirmation</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ${message}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-primary m-1" id="confirmButton">Confirm</button>
                        <button type="button" class="btn btn-outline-danger m-1" data-bs-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);

    const confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));
    confirmationModal.show();

    document.getElementById("confirmButton").addEventListener("click", () => {
        callback();
        confirmationModal.hide();
    });
}

let current_OwnedPage = 1;
const ownedItemsPerPage = 8;
let ownedDuriansData = [];

async function displayOwnedDurians() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentAccount = accounts[0];
        ownedDuriansData = await window.contract.methods.getUserDurians(currentAccount).call();

        if (ownedDuriansData.length === 0) {
            document.getElementById('durianList').innerHTML = '<tr><td colspan="6" class="text-center">No durians found.</td></tr>';
            document.getElementById('paginationControls').innerHTML = '';
            return;
        }

        renderOwnedPage(1);
        setupOwnedPagination();
    } catch (error) {
        console.error("Error displaying owned durians:", error);
        alert("Error displaying durians: " + error.message);
    }
}

function renderOwnedPage(page) {
    const startIndex = (page - 1) * ownedItemsPerPage;
    const endIndex = Math.min(startIndex + ownedItemsPerPage, ownedDuriansData.length);
    const duriansToDisplay = ownedDuriansData.slice(startIndex, endIndex);

    const durianList = document.getElementById("durianList");
    durianList.innerHTML = duriansToDisplay.map(durian => `
    <tr>
      <td>${durian.batchCode}</td>
      <td>${durian.durianType}</td>
      <td>${getDurianStateString(parseInt(durian.state))}</td>
      <td>${formatDate(durian.timestamp)}</td>
      <td>
        ${parseInt(durian.state) === 4
            ? '<button class="btn btn-info" disabled>Spoiled</button>'
            : `<button class="btn btn-outline-danger" onclick="markAsSpoiled('${durian.batchCode}')">Mark as Spoiled</button>`
        }
      </td>
    </tr>
  `).join('');
}

function setupOwnedPagination() {
    const totalPages = Math.ceil(ownedDuriansData.length / ownedItemsPerPage);
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-outline-primary mx-1 ${i === current_OwnedPage ? 'active' : ''}`;
        button.textContent = i;
        button.onclick = () => changeOwnedPage(i);
        paginationControls.appendChild(button);
    }
}

function changeOwnedPage(page) {
    current_OwnedPage = page;
    renderOwnedPage(page);
    setupOwnedPagination();
}

async function markAsSpoiled(batchCode) {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentAccount = accounts[0];

        await showConfirmationAlert(
            `Are you sure you want to mark durian batch ${batchCode} as spoiled?`,
            async () => {
                try {
                    await window.contract.methods.updateSpoiledState(batchCode).send({ from: currentAccount });
                    const message = `Durian batch ${batchCode} has been marked as spoiled.`;
                    const redirectUrl = "";
                    await showAlert(message, redirectUrl);
                    displayOwnedDurians();
                } catch (error) {
                    console.error("Error marking durian as spoiled:", error);
                    alert("Error marking durian as spoiled: " + error.message);
                }
            }
        );
    } catch (error) {
        console.error("Error marking durian as spoiled:", error);
        alert("Error marking durian as spoiled: " + error.message);
    }
}

let transaction_CurrentPage = 1;
const transactionRecordsPerPage = 10;
let paginatedTransactions = [];
let currentUserTransaction;

async function loadTransactions() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        currentUserTransaction = accounts[0].toLowerCase();

        const transactions = await window.contract.methods.getTransactions().call();
        const userTransactions = transactions.filter(
            tx =>
                tx.from.toLowerCase() === currentUserTransaction ||
                tx.to.toLowerCase() === currentUserTransaction
        );

        paginatedTransactions = userTransactions;

        const durianData = {};
        for (const tx of userTransactions) {
            const durian = await window.contract.methods.getDurian(tx.durianId).call();
            durianData[tx.durianId] = durian;
        }

        setupTransactionPagination(userTransactions.length);
        renderTransactionTable(transaction_CurrentPage, userTransactions, durianData);
    } catch (error) {
        console.error("Error loading transactions:", error);
    }
}
async function renderTransactionTable(page) {
    const startIndex = (page - 1) * transactionRecordsPerPage;
    const endIndex = Math.min(startIndex + transactionRecordsPerPage, paginatedTransactions.length);
    const tableBody = document.getElementById("transactionsTable");
    tableBody.innerHTML = "";

    if (paginatedTransactions.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">No transactions found.</td></tr>';
        return;
    }

    for (let i = startIndex; i < endIndex; i++) {
        const tx = paginatedTransactions[i];
        const durian = await window.contract.methods.getDurian(tx.durianId).call();
        const actionString = getActionString(tx.action);
        const toDisplay = tx.to.toLowerCase() === currentUserTransaction ? "Own Account" : tx.to;

        const row = `
          <tr>
            <td>${i + 1}</td>
            <td>${toDisplay}</td>
            <td>${durian.batchCode}</td>
            <td>${actionString}</td>
            <td>${new Date(tx.timestamp * 1000).toLocaleString()}</td>
          </tr>`;
        tableBody.innerHTML += row;
    }
}

function setupTransactionPagination(totalRecords) {
    const paginationContainer = document.getElementById("transactionPagination");
    paginationContainer.innerHTML = "";

    const transactionTotalPages = Math.ceil(totalRecords / transactionRecordsPerPage);

    for (let i = 1; i <= transactionTotalPages; i++) {
        const button = document.createElement('button');
        button.className = `btn btn-outline-primary mx-1 ${i === transaction_CurrentPage ? 'active' : ''}`;
        button.textContent = i;
        button.onclick = () => changeTransactionPage(i);
        paginationContainer.appendChild(button);
    }

}

function changeTransactionPage(page) {
    const totalPages = Math.ceil(paginatedTransactions.length / transactionRecordsPerPage);

    if (page < 1 || page > totalPages) {
        return;
    }
    transaction_CurrentPage = page;
    setupTransactionPagination(paginatedTransactions.length);
    renderTransactionTable(page);
}

async function displayUserSummary() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const currentAccount = accounts[0];
        document.getElementById("accountAddress").innerText = currentAccount;

        const user = await window.contract.methods.users(currentAccount).call();
        document.getElementById("accountRole").innerText = capitalizeFirstLetter(getRoleString(user.role));

        const ownedDurians = await window.contract.methods.getUserDurians(currentAccount).call();
        document.getElementById("totalDuriansOwned").innerText = ownedDurians.length;


    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data: " + error.message);
    }
}

async function displayRecentTransactions() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const currentAccount = accounts[0];
    const transactions = await window.contract.methods.getTransactions().call();
    const currentDate = new Date();
    const startDate = new Date(currentDate);
    startDate.setHours(0, 0, 0, 0);
    const startTime = Math.floor(startDate.getTime() / 1000); 

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 2); 
    const endTime = Math.floor(endDate.getTime() / 1000); 

    const recentTransactions = transactions.filter(tx =>
        (tx.timestamp >= startTime && tx.timestamp <= endTime) &&
        (tx.from.toLowerCase() === currentAccount.toLowerCase() ||
            tx.to.toLowerCase() === currentAccount.toLowerCase())
    );

    const transactionsList = document.getElementById("recentTransactions");
    transactionsList.innerHTML = recentTransactions.length
        ? recentTransactions.map((tx, index) =>
            `<tr>
            <td class="border-bottom-0"><h6 class="fw-semibold mb-0 text-center">${index + 1}</h6></td>
            <td class="border-bottom-0">
            <h6 class="fw-semibold mb-1">${tx.from}</h6>
            </td>
            <td class="border-bottom-0">
            <h6 class="fw-semibold mb-1">${tx.to}</h6>
            </td>
            <td class="border-bottom-0">
            <h6 class="fw-semibold mb-1">${formatDate(tx.timestamp)}</h6>
            </td>
            </tr>
            `).join("")
        : ` 
            <tr>
            <td class="border-bottom-0" colspan="4">
            <h6 class="fw-semibold mb-0">No transactions in the current 2 days window</h6>
            </td>
            </tr>
        `;

    const currentYear = new Date().getFullYear();
    const transactionsThisYear = transactions.filter(tx => {
        const txDate = new Date(tx.timestamp * 1000);
        return txDate.getFullYear() === currentYear &&
            (tx.from.toLowerCase() === currentAccount.toLowerCase() || tx.to.toLowerCase() === currentAccount.toLowerCase());
    });

    document.getElementById("totalTransactionsYear").innerText = transactionsThisYear.length;
    document.getElementById("timeRange").innerText =
        `Showing transactions from ${formatDate(startTime)} to ${formatDate(endTime)}`;
}

function startTransactionUpdate() {
    displayRecentTransactions();
    setInterval(() => {
        displayRecentTransactions();
    }, 2 * 24 * 60 * 60 * 1000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
