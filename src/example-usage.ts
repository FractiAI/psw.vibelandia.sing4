/**
 * Example Usage of Irreducible Seed:Edge Execution Engine
 * 
 * Demonstrates immediate command execution with auto-generated code
 */

import { SeedEdgeExecutionEngine } from './seed-edge-execution-engine';

// ============================================================================
// EXAMPLE 1: Simple File Operation
// ============================================================================

async function example1_FileOperation() {
  console.log('=== Example 1: File Operation ===');
  
  const engine = new SeedEdgeExecutionEngine();
  
  // Command: Create a file
  const result = await engine.execute('create-file', {
    target: 'example-output.md',
    content: '# Example Output\n\nCreated via Seed:Edge execution system.'
  });
  
  console.log('Seed:', result.seed);
  console.log('Edge:', result.edge);
  console.log('Code Generated:', result.code.substring(0, 200) + '...');
  console.log('Executed:', result.executed);
  console.log('');
}

// ============================================================================
// EXAMPLE 2: Data Processing
// ============================================================================

async function example2_DataProcessing() {
  console.log('=== Example 2: Data Processing ===');
  
  const engine = new SeedEdgeExecutionEngine();
  
  // Command: Process data
  const result = await engine.execute('process-data', {
    data: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  });
  
  console.log('Seed:', result.seed);
  console.log('Edge:', result.edge);
  console.log('Result:', result.result);
  console.log('Executed:', result.executed);
  console.log('');
}

// ============================================================================
// EXAMPLE 3: System Command
// ============================================================================

async function example3_SystemCommand() {
  console.log('=== Example 3: System Command ===');
  
  const engine = new SeedEdgeExecutionEngine();
  
  // Command: System command
  const result = await engine.execute('system-command', {
    command: 'echo "Hello from Seed:Edge execution"'
  });
  
  console.log('Seed:', result.seed);
  console.log('Edge:', result.edge);
  console.log('Code Generated:', result.code.substring(0, 200) + '...');
  console.log('Executed:', result.executed);
  console.log('');
}

// ============================================================================
// EXAMPLE 4: API Call
// ============================================================================

async function example4_ApiCall() {
  console.log('=== Example 4: API Call ===');
  
  const engine = new SeedEdgeExecutionEngine();
  
  // Command: API call
  const result = await engine.execute('api-call', {
    url: 'https://api.example.com/data',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  console.log('Seed:', result.seed);
  console.log('Edge:', result.edge);
  console.log('Code Generated:', result.code.substring(0, 200) + '...');
  console.log('Executed:', result.executed);
  console.log('');
}

// ============================================================================
// EXAMPLE 5: Generic Command
// ============================================================================

async function example5_GenericCommand() {
  console.log('=== Example 5: Generic Command ===');
  
  const engine = new SeedEdgeExecutionEngine();
  
  // Command: Any generic command
  const result = await engine.execute('custom-operation', {
    operation: 'transform',
    input: 'some data',
    transform: 'uppercase'
  });
  
  console.log('Seed:', result.seed);
  console.log('Edge:', result.edge);
  console.log('Result:', result.result);
  console.log('Executed:', result.executed);
  console.log('');
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('🌱 Irreducible Seed:Edge Execution Engine Examples');
  console.log('Seed = Octave 0 = 0');
  console.log('Edge = Current Self-Aware Experience in Vibeverse');
  console.log('');
  
  await example1_FileOperation();
  await example2_DataProcessing();
  await example3_SystemCommand();
  await example4_ApiCall();
  await example5_GenericCommand();
  
  console.log('✅ All examples completed');
  console.log('');
  console.log('The irreducible seed allows any command to be executed');
  console.log('immediately with code generated automatically for each call.');
}

// Run examples
if (require.main === module) {
  main().catch(console.error);
}

export { main as runExamples };
