type Primitive = string | number | boolean | null | undefined;

// Utility type to define a deep partial object
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Primitive ? T[P] : DeepPartial<T[P]>;
};

function isObject(item: any): boolean {
  return item && typeof item === "object" && !Array.isArray(item);
}

function deepMerge<T extends {}>(target: T, source: DeepPartial<T>): T {
  if (!isObject(target) || !isObject(source)) {
    return source as T;
  }

  const output = { ...target } as T;

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key])) {
        if (!(key in target)) {
          (output as any)[key] = source[key];
        } else {
          (output as any)[key] = deepMerge(
            (target as any)[key],
            source[key] as any
          );
        }
      } else {
        (output as any)[key] = source[key];
      }
    }
  }

  return output;
}
export default deepMerge;
