// Should be researched more thouroughly - https://github.com/microsoft/TypeScript/issues/26223
export interface FixedLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

export * from "./Game";
export * from "./School";
export * from "./Teacher";
