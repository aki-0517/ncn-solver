// payload/solver.js
// Node.js で実装されたサンプルソルバー（ペイロードコンテナ）

const readline = require('readline');

function processInput(input) {
  // TPayloadInput の例:
  // {
  //   executorPDA: string,
  //   apiUrl: string,
  //   extraSigners: Array<string>,
  //   poaName: string,
  //   proposalStorageKey: string
  // }
  // ここでは、単純にサンプルの提案指示を返します。
  return {
    proposalInstructions: [
      {
        accounts: [
          { address: "Account1", role: 3 }, // WRITABLE_SIGNER（0b11）
          { address: "Account2", role: 1 }  // WRITABLE（0b01）
        ],
        data: "Base58EncodedData",
        programmAddress: "ProgramAddressExample"
      }
    ]
  };
}

function main() {
  let inputData = '';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) => {
    inputData += line;
  });

  rl.on('close', () => {
    try {
      const payloadInput = JSON.parse(inputData);
      const result = processInput(payloadInput);
      console.log(JSON.stringify(result));
    } catch (error) {
      console.error("Error processing input:", error);
      process.exit(1);
    }
  });
}

main();
