import * as path from "path";
const getPath = (name: string, folder: string): string => {
  const _name = name || "";
  const _folder = folder || "";
  if (!folder) return _name;
  return path.join(_name, _folder);
};

export default getPath;
