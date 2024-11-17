import { exec } from 'bun';

async function getScreenResolution() {
  try {
    await exec('which wayland-info');
    // Wayland detected
    return await getWaylandGeometry();
  } catch {
    // X11 (or other)
    return await getX11Geometry();
  }
}

async function getWaylandGeometry() {
  try {
    const proc = Bun.spawn(["gdbus", "call", "--session", "--dest", "org.gnome.Mutter.DisplayConfig",
                            "--object-path", "/org/gnome/Mutter/DisplayConfig",
                            "--method", "org.gnome.Mutter.DisplayConfig.GetCurrentState"]);
    const stdout = await new Response(proc.stdout).text();

    const data = JSON.parse(stdout.split("(", 2)[1].split(")", 2)[0]);
    for (const monitor of data[1]) {
      if (monitor[4]) { // is_primary
        return `${monitor[2][0]}x${monitor[2][1]}`;
      }
    }
  } catch (error) {
    console.error("Error getting Wayland screen geometry:", error);
  }
  return "Unable to determine Wayland screen geometry";
}

async function getX11Geometry() {
  try {
    const proc = Bun.spawn(["xrandr"]);
    const stdout = await new Response(proc.stdout).text();
    const lines = stdout.split('\n');
    for (const line of lines) {
      if (line.includes(" connected")) {
        const parts = line.split(' ');
        if (parts.length > 2 && parts[2].includes('x')) {
          return parts[2];
        }
      }
    }
  } catch (error) {
    console.error("Error getting X11 screen geometry:", error);
  }
  return "Unable to determine X11 screen geometry";
}

export { getScreenResolution };

// if !module.parent
if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const geometry = await getScreenResolution();
    console.log(`Screen geometry: ${geometry}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

// vim: set ts=2 sw=2 et
