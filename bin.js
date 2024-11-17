#!/usr/bin/env bun
import { getScreenResolution } from './module.js';

async function main() {
  try {
    const resolution = await getScreenResolution();
    console.log(resolution);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main();

// vim: set ts=2 sw=2 et
