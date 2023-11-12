import fs from 'fs/promises';

function randInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max - min + 1));
}

async function getDataFromFile(file: string): Promise<string[]> {
  const data = await fs.readFile(file, { encoding: 'utf-8' });

  return data.split('\n');
}

export { randInt, getDataFromFile };
