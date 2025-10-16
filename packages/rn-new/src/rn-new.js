#!/usr/bin/env node

const args = process.argv.slice(2);
const isAiCommand = args.includes('ai');

if (isAiCommand) {
  // Remove 'ai' from args and pass remaining args to AI interface
  const filteredArgs = args.filter((arg) => arg !== 'ai');
  process.argv = ['node', 'rn-new', ...filteredArgs];

  try {
    require('../lib/ai-interface.js');
  } catch (error) {
    console.error('Error: Could not find AI interface module.');
    console.error('Please ensure create-expo-stack is installed properly.');
    process.exit(1);
  }
} else {
  try {
    require('create-expo-stack/bin/create-expo-stack.js');
  } catch (error) {
    console.error('Error: Could not find create-expo-stack package.');
    console.error('Please ensure create-expo-stack is installed globally.');
    process.exit(1);
  }
}
