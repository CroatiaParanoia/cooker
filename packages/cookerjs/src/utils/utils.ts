export const isContainer = (value: any): value is Protocol.Container => {
  return value.name && value.children && Array.isArray(value.children);
};

export const notNull = <T>(value: T | null): value is T => {
  return value !== null;
};

const isDynamicConfig = (value: any, key: string) => {
  return typeof value === "object" && value !== null && value[key] && true;
};
export const isDynamicInput = (value: any): value is Protocol.DynamicInput => {
  return isDynamicConfig(value, "$input");
};
export const isDynamicOutput = (
  value: any
): value is Protocol.DynamicOutput => {
  return isDynamicConfig(value, "$output");
};
export const isDynamicStore = (value: any): value is Protocol.DynamicStore => {
  return isDynamicConfig(value, "$store");
};

export const isDynamicField = (value: any) => {
  const rules = [isDynamicOutput, isDynamicInput, isDynamicStore];

  return rules.some((f) => f(value));
};
