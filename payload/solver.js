// payload/solver.js
// Node.js implementation of an Intent Solver (Payload Container)
//
// This sample demonstrates how to process a user's intent and conditions
// to determine the optimal workflow route for executing on-chain actions.
// The output is a JSON object containing proposal instructions.

const readline = require('readline');

/**
 * Validates the input data.
 * Checks that all required fields are present in the input object.
 *
 * @param {Object} input - The payload input object.
 * @throws {Error} If any required field is missing.
 * @returns {Object} The validated input object.
 */
function validateInput(input) {
  // Required fields for Cambrian
  const requiredFields = ['executorPDA', 'apiUrl', 'extraSigners', 'poaName', 'proposalStorageKey'];
  // Additional fields specific to the Intent Solver
  const additionalFields = ['intent', 'conditions'];
  
  for (const field of requiredFields.concat(additionalFields)) {
    if (!(field in input)) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  return input;
}

/**
 * Main processing function for the solver.
 * Determines the optimal execution route based on the user's intent and conditions.
 *
 * @param {Object} input - The validated payload input object.
 * @returns {Object} The payload output object containing proposal instructions.
 */
function processInput(input) {
  // Validate the incoming input
  validateInput(input);

  // Determine the execution route based on intent and conditions
  let chosenRoute = "";
  if (input.intent === "improveUX") {
    // For example, if the 'device' condition is 'mobile', choose RouteA; otherwise, choose RouteB
    if (input.conditions.device && input.conditions.device.toLowerCase() === "mobile") {
      chosenRoute = "RouteA";
    } else {
      chosenRoute = "RouteB";
    }
  } else {
    // Default route for any other intent
    chosenRoute = "DefaultRoute";
  }

  // Generate a combined string from key fields for demonstration
  const combinedData = `${input.poaName}:${input.proposalStorageKey}:${input.intent}:${chosenRoute}`;
  // Encode the combined data as Base64
  const encodedData = Buffer.from(combinedData).toString('base64');

  // Create a sample proposal instruction
  const instruction = {
    accounts: [
      { address: input.executorPDA, role: 3 },      // WRITABLE_SIGNER (0b11)
      { address: "IntentSolverServiceAccount", role: 1 } // WRITABLE (0b01)
    ],
    data: encodedData,
    programmAddress: "IntentSolverProgramAddress"   // Replace with your actual program address
  };

  return {
    proposalInstructions: [instruction]
  };
}

/**
 * Main function to read input, process it, and output the result.
 */
function main() {
  let inputData = '';
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  // Read input line by line from standard input
  rl.on('line', (line) => {
    inputData += line;
  });

  // Once input is complete, parse and process it
  rl.on('close', () => {
    try {
      const payloadInput = JSON.parse(inputData);
      const output = processInput(payloadInput);
      console.log(JSON.stringify(output));
    } catch (err) {
      console.error("Error processing input:", err.message);
      process.exit(1);
    }
  });
}

main();
