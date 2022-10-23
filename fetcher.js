import { banks, timeDepositPages } from './constants.js';

const fetchPages = async (urls) => {
    return await Promise.all(urls.map(async (url) => {
        const fetched = await fetch(url, { method: 'get' });
        const text = await fetched.text();

        return text;
    }));
};

const regexes = {
    [banks.ZA_BANK]: /<tr><td>([0-9]+) months?<\/td><td>([0-9.]+)%<\/td>(?:<td>[0-9.]+%<\/td>)+<\/tr>/g,
    [banks.WELAB_BANK]: /<td class="[^"]*"><center>([0-9]+)-month<center><\/td><td class="[^"]*">([0-9.]+)%<\/td><\/tr>/g,
    [banks.PAOB]: /<td>([0-9]+)-Month<\/td>(?:\\r\\n)?[\s\t\n]*<td>([0-9.]+)%<\/td>/g,
    [banks.PUBLIC_BANK]: /<th(?:\s*(?:[^"]+="[^"]*"))*?>([0-9]+)\sMonths?<\/th><td(?:\s*(?:[^"]+="[^"]*"))*?>([0-9.]+)%<\/td>/g,
};

const beforeTags = {
    [banks.PUBLIC_BANK]: 'Time Deposit Rates of Foreign Currency',
};

const parseText = (text, bank) => {
    const beforeTag = beforeTags[bank];
    const result = (beforeTag ? text.substring(0, text.indexOf(beforeTag)) : text).matchAll(regexes[bank]);

    return new Map(Array.from(result, ([, month, rate]) => ([Number(month), Number(rate)])));
};

export default async () => {
    const bankNames = Object.values(banks);
    const fetched = await fetchPages(bankNames.map((bank) => (timeDepositPages[bank])));
    const result = Object.create(null);

    for (const [index, bankName] of bankNames.entries()) {
        const text = fetched[index];
        result[bankName] = parseText(text, bankName);
    }

    return result;
}
