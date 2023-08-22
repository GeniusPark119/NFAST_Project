import Web3 from "web3";

const nfastAbi = [
                     {
                       "inputs": [
                         {
                           "internalType": "string",
                           "name": "name_",
                           "type": "string"
                         },
                         {
                           "internalType": "string",
                           "name": "symbol_",
                           "type": "string"
                         }
                       ],
                       "stateMutability": "nonpayable",
                       "type": "constructor"
                     },
                     {
                       "anonymous": false,
                       "inputs": [
                         {
                           "indexed": true,
                           "internalType": "address",
                           "name": "owner",
                           "type": "address"
                         },
                         {
                           "indexed": true,
                           "internalType": "address",
                           "name": "approved",
                           "type": "address"
                         },
                         {
                           "indexed": true,
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "Approval",
                       "type": "event"
                     },
                     {
                       "anonymous": false,
                       "inputs": [
                         {
                           "indexed": true,
                           "internalType": "address",
                           "name": "owner",
                           "type": "address"
                         },
                         {
                           "indexed": true,
                           "internalType": "address",
                           "name": "operator",
                           "type": "address"
                         },
                         {
                           "indexed": false,
                           "internalType": "bool",
                           "name": "approved",
                           "type": "bool"
                         }
                       ],
                       "name": "ApprovalForAll",
                       "type": "event"
                     },
                     {
                       "anonymous": false,
                       "inputs": [
                         {
                           "indexed": true,
                           "internalType": "address",
                           "name": "_store",
                           "type": "address"
                         },
                         {
                           "indexed": false,
                           "internalType": "uint256[]",
                           "name": "tokenIds",
                           "type": "uint256[]"
                         }
                       ],
                       "name": "CreateAll",
                       "type": "event"
                     },
                     {
                       "anonymous": false,
                       "inputs": [
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
                           "indexed": true,
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "Transfer",
                       "type": "event"
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "address",
                           "name": "to",
                           "type": "address"
                         },
                         {
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "approve",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "address",
                           "name": "owner",
                           "type": "address"
                         }
                       ],
                       "name": "balanceOf",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getApproved",
                       "outputs": [
                         {
                           "internalType": "address",
                           "name": "",
                           "type": "address"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "address",
                           "name": "owner",
                           "type": "address"
                         },
                         {
                           "internalType": "address",
                           "name": "operator",
                           "type": "address"
                         }
                       ],
                       "name": "isApprovedForAll",
                       "outputs": [
                         {
                           "internalType": "bool",
                           "name": "",
                           "type": "bool"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [],
                       "name": "name",
                       "outputs": [
                         {
                           "internalType": "string",
                           "name": "",
                           "type": "string"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "ownerOf",
                       "outputs": [
                         {
                           "internalType": "address",
                           "name": "",
                           "type": "address"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
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
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "safeTransferFrom",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [
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
                           "name": "tokenId",
                           "type": "uint256"
                         },
                         {
                           "internalType": "bytes",
                           "name": "_data",
                           "type": "bytes"
                         }
                       ],
                       "name": "safeTransferFrom",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "address",
                           "name": "operator",
                           "type": "address"
                         },
                         {
                           "internalType": "bool",
                           "name": "approved",
                           "type": "bool"
                         }
                       ],
                       "name": "setApprovalForAll",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "bytes4",
                           "name": "interfaceId",
                           "type": "bytes4"
                         }
                       ],
                       "name": "supportsInterface",
                       "outputs": [
                         {
                           "internalType": "bool",
                           "name": "",
                           "type": "bool"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [],
                       "name": "symbol",
                       "outputs": [
                         {
                           "internalType": "string",
                           "name": "",
                           "type": "string"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "tokenURI",
                       "outputs": [
                         {
                           "internalType": "string",
                           "name": "",
                           "type": "string"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
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
                           "name": "tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "transferFrom",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [],
                       "name": "current",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "address",
                           "name": "_to",
                           "type": "address"
                         },
                         {
                           "internalType": "string",
                           "name": "_tokenURI",
                           "type": "string"
                         },
                         {
                           "internalType": "address",
                           "name": "_storeAddress",
                           "type": "address"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_date",
                           "type": "uint256"
                         },
                         {
                           "internalType": "bool",
                           "name": "_mealType",
                           "type": "bool"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_startTime",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_endTime",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_price",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_charge",
                           "type": "uint256"
                         }
                       ],
                       "name": "create",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "payable",
                       "type": "function",
                       "payable": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_numTokens",
                           "type": "uint256"
                         },
                         {
                           "internalType": "address",
                           "name": "_to",
                           "type": "address"
                         },
                         {
                           "internalType": "string",
                           "name": "_tokenURI",
                           "type": "string"
                         },
                         {
                           "internalType": "address",
                           "name": "_storeAddress",
                           "type": "address"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_date",
                           "type": "uint256"
                         },
                         {
                           "internalType": "bool",
                           "name": "_mealType",
                           "type": "bool"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_startTime",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_endTime",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_price",
                           "type": "uint256"
                         },
                         {
                           "internalType": "uint256",
                           "name": "_charge",
                           "type": "uint256"
                         }
                       ],
                       "name": "createAll",
                       "outputs": [
                         {
                           "internalType": "uint256[]",
                           "name": "",
                           "type": "uint256[]"
                         }
                       ],
                       "stateMutability": "payable",
                       "type": "function",
                       "payable": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "setIsUse",
                       "outputs": [],
                       "stateMutability": "nonpayable",
                       "type": "function"
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getTokenURI",
                       "outputs": [
                         {
                           "internalType": "string",
                           "name": "",
                           "type": "string"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getIsUse",
                       "outputs": [
                         {
                           "internalType": "bool",
                           "name": "",
                           "type": "bool"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getStoreAddress",
                       "outputs": [
                         {
                           "internalType": "address",
                           "name": "",
                           "type": "address"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getDate",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getStartTime",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getEndTime",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getMealType",
                       "outputs": [
                         {
                           "internalType": "bool",
                           "name": "",
                           "type": "bool"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getPrice",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     },
                     {
                       "inputs": [
                         {
                           "internalType": "uint256",
                           "name": "_tokenId",
                           "type": "uint256"
                         }
                       ],
                       "name": "getCharge",
                       "outputs": [
                         {
                           "internalType": "uint256",
                           "name": "",
                           "type": "uint256"
                         }
                       ],
                       "stateMutability": "view",
                       "type": "function",
                       "constant": true
                     }
                   ];


const saleAbi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_storeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_isStore",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDate",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_currencyAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nftAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_sellerAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_buyer",
				"type": "address"
			}
		],
		"name": "Purchase",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "Refund",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "currencyAddress",
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
		"inputs": [],
		"name": "erc20Contract",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc721Contract",
		"outputs": [
			{
				"internalType": "contract Nfast",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getSaleInfo",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
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
		"inputs": [],
		"name": "nftAddress",
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
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "onERC721Received",
		"outputs": [
			{
				"internalType": "bytes4",
				"name": "",
				"type": "bytes4"
			}
		],
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "purchase",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "refund",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]


const saleFactoryAbi = [
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
				"internalType": "address",
				"name": "_saleContract",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_workId",
				"type": "uint256"
			}
		],
		"name": "NewSale",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
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
		"inputs": [],
		"name": "allSales",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_nftId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_storeAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endTime",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_currencyAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_nftAddress",
				"type": "address"
			}
		],
		"name": "createSale",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
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
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "sales",
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
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const ssafyTokenAbi = [
	{
		"inputs": [
		{
			"internalType": "string",
			"name": "name",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "symbol",
			"type": "string"
		},
		{
			"internalType": "uint8",
			"name": "decimal",
			"type": "uint8"
		}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
		{
			"indexed": true,
			"internalType": "address",
			"name": "previousOwner",
			"type": "address"
		},
		{
			"indexed": true,
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
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
			"internalType": "uint256",
			"name": "value",
			"type": "uint256"
		}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "owner",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		}
		],
		"name": "allowance",
		"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
		],
		"name": "approve",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "account",
			"type": "address"
		}
		],
		"name": "balanceOf",
		"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
		{
			"internalType": "uint8",
			"name": "",
			"type": "uint8"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "subtractedValue",
			"type": "uint256"
		}
		],
		"name": "decreaseAllowance",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "spender",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "addedValue",
			"type": "uint256"
		}
		],
		"name": "increaseAllowance",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
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
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
		{
			"internalType": "string",
			"name": "",
			"type": "string"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
		{
			"internalType": "uint256",
			"name": "",
			"type": "uint256"
		}
		],
		"stateMutability": "view",
		"type": "function",
		"constant": true
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "recipient",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
		],
		"name": "transfer",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "sender",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "recipient",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
		],
		"name": "transferFrom",
		"outputs": [
		{
			"internalType": "bool",
			"name": "",
			"type": "bool"
		}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "address",
			"name": "newOwner",
			"type": "address"
		}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
		{
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
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
			"name": "amount",
			"type": "uint256"
		}
		],
		"name": "forceToTransfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

const NFasTCA = "0xcd511b5E0416fcF35b2a4c6E4F9593D536d2dcCA"

// const saleCA = ""

const saleFactoryCA = "0xd2e2c6Cbf15DF8F7c6516ECa892390Ba2BD2dB3E"

const ssafyTokenCA = "0xFFA5A1Ee9985Ddc27546c205CD4ac6ca7f2F4779"

export const web3 = new web3.eth.Contract(window.ethereum);

export const NFasTContract = new web3.eth.Contract(nfastAbi,NFasTCA);

export const saleFactory = new web3.eth.Contract(saleFactoryAbi,saleFactoryCA);

export const ssafyTokenContract = new web3.eth.Contract(ssafyTokenAbi,ssafyTokenCA);

export const createSaleContract = saleCA => new web3.eth.Contract(saleAbi,saleCA);