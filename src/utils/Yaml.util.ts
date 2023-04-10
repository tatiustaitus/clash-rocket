import YAML from "yaml";
import { ClashMetaProfile } from "../types/ClashMetaProfile.type";

export const parseProfileYaml = (profile: string): ClashMetaProfile => {
  return YAML.parse(profile);
};
