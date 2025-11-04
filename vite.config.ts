import path from "path";
import type { ConfigEnv, UserConfigExport } from "vite";

// Reuse the Excalidraw app's Vite config and set project root to that app
// so Lovable can detect Vite config at the repository root.
// This keeps all aliases/plugins from the nested config intact.
//
// NOTE: We override `root` and ensure `publicDir` resolves correctly from here.
// The nested config handles everything else (plugins, aliases, build options).

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - importing .mts is fine for Vite config runtime
import nestedConfig from "./Desktop/newww/excalidraw-app/vite.config.mts";

export default ((env: ConfigEnv) => {
  const baseCfg =
    typeof nestedConfig === "function"
      ? // call the nested config with current env
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (nestedConfig as any)(env)
      : nestedConfig;

  const cfg: UserConfigExport = {
    // Point Vite to use the Excalidraw app as the project root
    root: path.resolve(__dirname, "Desktop/newww/excalidraw-app"),
    // Ensure public assets resolve correctly from project root
    publicDir: path.resolve(__dirname, "Desktop/newww/public"),
    // Spread the rest of the nested configuration (plugins, resolve aliases, build, etc.)
    ...(baseCfg as object),
  } as UserConfigExport;

  return cfg;
}) as UserConfigExport;
