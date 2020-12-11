import fs from 'fs';
import path from 'path';

const addSymbols = async (amount: number, symbol: string): Promise<string> => {
  const arr: string[] = [];

  arr.length = amount;
  arr.fill(symbol);

  return arr.join('');
};

const symbolsFactory = async (total: number, streams: number): Promise<string> => {
  const stack = [];

  let i = 0;

  while (i < streams) {
    stack.push(addSymbols(total / streams, '$'));

    i++
  }

  const res = await Promise.all(stack);

  return res.reduce((acc: string, curr: string) => {
    return acc + curr;
  });
};

const makeFile = async (size: number): Promise<void> => {
  console.time('1');
  const fileContent = await symbolsFactory(size, size / 10000);

  console.log('string created for');
  console.timeEnd('1')

  console.time('2');
  await fs.writeFile(
    path.join(__dirname, '', 'example.txt'),
    fileContent,
    err => {
      if (
        err
      ) {
        throw err;
      }
    }
  );

  console.log('file created for');
  console.timeEnd('2');
};

makeFile(1000000000);
