export const removeDuplicatesFromStringArray = (array: Array<string>) => [...new Set(array)];


export const removeDuplicatesFromObjectArray = (
  array: Array<Record<string, unknown>>
) =>
  array.filter((value, index) => {
    const _value = JSON.stringify(value);
    return (
      index ===
      array.findIndex((obj) => {
        return JSON.stringify(obj) === _value;
      })
    );
  });
