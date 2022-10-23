import fetch from './fetcher.js';

const results = await fetch();
const tenors = [...new Set(Object.values(results).flatMap((map) => ([...map.keys()])))].sort((a, b) => (a - b));

console.log(['Bank \\ Month', ...tenors].map((tenor) => (`${tenor}`.padEnd(15, ' '))).join(''));

for (const bank of Object.keys(results).sort()) {
    let line = bank.padEnd(15, ' ');
    const tenorToRateMap = results[bank];

    for (const tenor of tenors) {
        const rate = tenorToRateMap.get(tenor);

        if (rate) {
            line += `${rate}`.padEnd(15, ' ');
        } else {
            line += ''.padEnd(15, ' ');
        }
    }

    console.log(line);
}
