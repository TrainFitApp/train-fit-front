import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expected',
})
export class ExpectedPipe implements PipeTransform {
  public transform(expected: number[], type: string): string {
    if (!expected || expected.length === 0) return '';

    const firstExpected = expected[0] !== null && expected[0] !== undefined;
    const secondExpected = expected[1] !== null && expected[1] !== undefined;

    const first = expected[0] === -1 ? 'FALLO' : expected[0];
    const second = expected[1] === -1 ? 'FALLO' : expected[1];

    if (firstExpected && secondExpected) {
      const hasFail = expected[0] === -1 || expected[1] === -1;
      return hasFail ? `${first}-${second}` : `${first}-${second} ${type}`;
    } else if (firstExpected && !secondExpected) {
      const hasFail = expected[0] === -1;
      return hasFail ? `${first}` : `${first} ${type}`;
    } else if (!firstExpected && secondExpected) {
      const hasFail = expected[1] === -1;
      return hasFail ? `${second}` : `${second} ${type}`;
    } else return '';
  }
}
