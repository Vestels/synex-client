import fs from 'node:fs';
import path from 'node:path';
import * as glob from 'glob';

const files = glob.sync('./mock-server/data/**/*.json');

export default files.reduce<Record<string, unknown>>((acc, file) => {
  const key = path.basename(file, '.json');
  const content = fs.readFileSync(file, 'utf-8');

  return {
    ...acc,
    [key]: JSON.parse(content),
  };
}, {});
