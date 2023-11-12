import path from 'path';
import { getDataFromFile, randInt } from './utils';

const FIRSTNAMES_FILE = 'firstnames.txt';
const LASTNAMES_FILE = 'lastnames.txt';

const publicDir = path.join(process.cwd(), 'public');
const firstnamePath = path.join(publicDir, FIRSTNAMES_FILE);
const lastnamePath = path.join(publicDir, LASTNAMES_FILE);

async function generateDriver(): Promise<string> {
  const firstnames = await getDataFromFile(firstnamePath);
  const lastnames = await getDataFromFile(lastnamePath);
  const fname = firstnames[randInt(0, firstnames.length - 1)];
  const lname = lastnames[randInt(0, lastnames.length - 1)];
  return `${fname.toUpperCase()} ${lname.toUpperCase()}`;
}

function generatePlate(region: string) {
  let plate = region;
  for (let i = 0; i < 2; i++) {
    const code = randInt(65, 90);
    plate += String.fromCharCode(code);
  }
  const digits = randInt(100, 999);
  return `${plate} ${digits}`;
}

export default async function generate(region: string) {
  const driver = await generateDriver();
  const plate = generatePlate(region);

  return {
    driver,
    plate,
  };
}
