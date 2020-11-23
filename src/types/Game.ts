import { FixedLengthArray } from ".";

export interface Game {
  id: string;
  code: string;
  boards: {
    [K: string]: FixedLengthArray<[string, boolean], 9>;
    // Alternative in case the above has issues (version below utilises TypeScript tuples)
    // [K: string]: [
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean],
    //   [string, boolean]
    // ]
  };
}
