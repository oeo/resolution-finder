# resolution-finder

A simple tool to determine screen geometry in both Wayland and X11 environments.

## Description

`resolution-finder` is a Bun-based utility that detects and reports the primary screen's resolution. It works in both Wayland and X11 desktop environments.

## Installation

```bash
bun install -g resolution-finder
```

## Usage

As a command-line tool:

```bash
resolution-finder
```

As a module in your Bun project:

```javascript
import { getScreenResolution } from 'resolution-finder';

const resolution = await getScreenResolution();
console.log(resolution);
```

## Requirements

- Bun runtime (version 0.5.0 or higher)
- Linux environment with either Wayland or X11

## Output

The tool returns the screen resolution in the format "widthxheight" (e.g., "1920x1080").

