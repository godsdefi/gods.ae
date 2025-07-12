export const UNISWAP_V3_ROUTER_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMinimum",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "exactInput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenIn",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "tokenOut",
        "type": "address"
      },
      {
        "internalType": "uint24",
        "name": "fee",
        "type": "uint24"
      },
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountOutMinimum",
        "type": "uint256"
      }
    ],
    "name": "exactInputSingle",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amountOut",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amountInMaximum",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "path",
        "type": "bytes"
      },
      {
        "internalType": "address",
        "name": "recipient",
        "type": "address"
      }
    ],
    "name": "exactOutput",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amountIn",
        "type": "uint256"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
];
