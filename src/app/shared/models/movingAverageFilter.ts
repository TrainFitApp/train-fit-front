export class MovingAverageFilter {
  private data: number[];
  private length: number;

  constructor(length: number) {
    this.data = [];
    this.length = length;
  }

  update(value: number): number {
    this.data.push(value);
    if (this.data.length > this.length) {
      this.data.shift();
    }
    const sum = this.data.reduce((acc, val) => acc + val, 0);
    return sum / this.data.length;
  }
}
