import { ParseEntry } from 'shell-quote';


export function isStringArray(items: ParseEntry[]): items is string[] {
  for (const item of items) {
    if (typeof item != 'string') {
      return false;
    }
  }

  return true;
}
