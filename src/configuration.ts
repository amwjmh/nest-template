import { existsSync, readFileSync } from "fs";
import * as yaml from "js-yaml";
import { merge } from "lodash";
import * as path from "path";

const YAML_CONFIG_FILENAME = "bootstrap";
const YAML_CONFIG_SUFFIX = "yaml";

export default () => {
  let config: Record<string, any> = null;
  const configPath = path.resolve(__dirname, "assets", `${YAML_CONFIG_FILENAME}.${YAML_CONFIG_SUFFIX}`);
  if (existsSync(configPath)) {
    config = yaml.load(readFileSync(configPath, "utf-8"));
  }
  const evnConfigPath = path.resolve(__dirname, "assets", `${YAML_CONFIG_FILENAME}-${process.env.NODE_ENV}.${YAML_CONFIG_SUFFIX}`);
  if (existsSync(evnConfigPath)) {
    merge(config, yaml.load(readFileSync(evnConfigPath, "utf-8")));
  }
  return config;
};
