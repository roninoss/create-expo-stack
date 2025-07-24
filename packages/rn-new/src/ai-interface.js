#!/usr/bin/env node

const readline = require('readline');
const { spawn } = require('child_process');

class AIInterface {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: true
    });
  }

  async showWelcome() {
    console.log('\n🤖 AI-Powered React Native Project Generator');
    console.log('━'.repeat(50));
    console.log("\nDescribe your project and I'll create it for you!");
    console.log('\nExample: "Create an Expo app with Nativewind and Supabase. I want file-based routing and tabs."\n');
  }

  async getMultilineInput() {
    return new Promise((resolve) => {
      console.log('📝 Describe your project (press Enter to submit):');
      console.log('');
      process.stdout.write('> ');

      let input = '';
      let firstLine = true;

      const handleLine = (line) => {
        if (firstLine && line.trim() === '') {
          // Empty first line, continue waiting
          process.stdout.write('> ');
          return;
        }

        if (firstLine) {
          firstLine = false;
          input = line;
          this.rl.removeListener('line', handleLine);
          resolve(input.trim());
        }
      };

      this.rl.on('line', handleLine);
    });
  }

  parseNaturalLanguage(input) {
    const options = {};
    const lowerInput = input.toLowerCase();

    // Extract project name from input
    const nameMatch = input.match(/(?:name(?:d)?|call(?:ed)?)\s+["']?([^"'\s,\.!?]+)["']?/i);
    if (nameMatch) {
      options.projectName = nameMatch[1];
    }

    // Styling libraries
    if (lowerInput.includes('nativewind') || lowerInput.includes('native wind')) {
      options.nativewind = true;
    } else if (lowerInput.includes('tamagui')) {
      options.tamagui = true;
    } else if (lowerInput.includes('unistyles')) {
      options.unistyles = true;
    } else if (lowerInput.includes('restyle')) {
      options.restyle = true;
    }

    // Navigation
    if (
      lowerInput.includes('expo router') ||
      lowerInput.includes('file-based routing') ||
      lowerInput.includes('file based routing')
    ) {
      options.expoRouter = true;
    } else if (lowerInput.includes('react navigation') || lowerInput.includes('react-navigation')) {
      options.reactNavigation = true;
    }

    // Navigation types
    if (lowerInput.includes('tabs') && !lowerInput.includes('drawer')) {
      options.tabs = true;
    } else if (lowerInput.includes('drawer') && lowerInput.includes('tabs')) {
      options['drawer+tabs'] = true;
    }

    // Authentication
    if (lowerInput.includes('supabase')) {
      options.supabase = true;
    } else if (lowerInput.includes('firebase')) {
      options.firebase = true;
    }

    // State management
    if (lowerInput.includes('zustand')) {
      options.zustand = true;
    }

    // Other features
    if (
      lowerInput.includes('i18n') ||
      lowerInput.includes('internationalization') ||
      lowerInput.includes('translation')
    ) {
      options.i18next = true;
    }

    return options;
  }

  buildCommand(options, projectName) {
    let command = 'npx';
    let args = ['create-expo-stack@latest'];

    // Add project name
    if (projectName || options.projectName) {
      args.push(projectName || options.projectName);
    }

    // Add all the flags
    Object.keys(options).forEach((key) => {
      if (key !== 'projectName' && options[key]) {
        args.push(`--${key}`);
      }
    });

    return { command, args };
  }

  async executeCommand(command, args) {
    console.log('\n🚀 Creating your project...');
    console.log(`Running: ${command} ${args.join(' ')}\n`);

    return new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        stdio: 'inherit',
        shell: true
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });

      child.on('error', reject);
    });
  }

  async run() {
    try {
      // Check if running in test mode with provided input
      const testInput = process.env.AI_TEST_INPUT;

      if (testInput) {
        // Test mode - don't show interactive interface
        console.log('🧠 Analyzing test input:', testInput);

        const options = this.parseNaturalLanguage(testInput);

        // Show what was detected
        console.log('\n📋 Detected configuration:');
        if (options.projectName) console.log(`  • Project name: ${options.projectName}`);
        if (options.nativewind) console.log('  • Styling: NativeWind (Tailwind CSS)');
        if (options.tamagui) console.log('  • Styling: Tamagui');
        if (options.unistyles) console.log('  • Styling: Unistyles');
        if (options.restyle) console.log('  • Styling: Restyle');
        if (options.expoRouter) console.log('  • Navigation: Expo Router (file-based)');
        if (options.reactNavigation) console.log('  • Navigation: React Navigation');
        if (options.tabs) console.log('  • Navigation type: Tabs');
        if (options['drawer+tabs']) console.log('  • Navigation type: Drawer + Tabs');
        if (options.supabase) console.log('  • Authentication: Supabase');
        if (options.firebase) console.log('  • Authentication: Firebase');
        if (options.zustand) console.log('  • State management: Zustand');
        if (options.i18next) console.log('  • Internationalization: i18next');

        const { command, args } = this.buildCommand(options);
        console.log('\n🚀 Would execute:', command, args.join(' '));
        console.log('\n✅ Test completed successfully! 🎉');

        return;
      }

      await this.showWelcome();

      const input = await this.getMultilineInput();

      if (!input.trim()) {
        console.log('\n❌ No input provided. Exiting...');
        process.exit(0);
      }

      console.log('\n🧠 Analyzing your requirements...');

      const options = this.parseNaturalLanguage(input);

      // Show what was detected
      console.log('\n📋 Detected configuration:');
      if (options.projectName) console.log(`  • Project name: ${options.projectName}`);
      if (options.nativewind) console.log('  • Styling: NativeWind (Tailwind CSS)');
      if (options.tamagui) console.log('  • Styling: Tamagui');
      if (options.unistyles) console.log('  • Styling: Unistyles');
      if (options.restyle) console.log('  • Styling: Restyle');
      if (options.expoRouter) console.log('  • Navigation: Expo Router (file-based)');
      if (options.reactNavigation) console.log('  • Navigation: React Navigation');
      if (options.tabs) console.log('  • Navigation type: Tabs');
      if (options['drawer+tabs']) console.log('  • Navigation type: Drawer + Tabs');
      if (options.supabase) console.log('  • Authentication: Supabase');
      if (options.firebase) console.log('  • Authentication: Firebase');
      if (options.zustand) console.log('  • State management: Zustand');
      if (options.i18next) console.log('  • Internationalization: i18next');

      const { command, args } = this.buildCommand(options);

      await this.executeCommand(command, args);

      console.log('\n✅ Project created successfully! 🎉');
    } catch (error) {
      console.error('\n❌ Error:', error.message);
      process.exit(1);
    } finally {
      this.rl.close();
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  console.log('\n\n👋 Goodbye!');
  process.exit(0);
});

// Run the AI interface
const aiInterface = new AIInterface();
aiInterface.run();
