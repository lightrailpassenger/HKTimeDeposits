const banks = {
    ZA_BANK: 'ZA Bank',
    WELAB_BANK: 'WeLab Bank',
    PAOB: 'PAOB',
    PUBLIC_BANK: 'Public Bank',
};

const timeDepositPages = {
    [banks.ZA_BANK]: 'https://bank.za.group/en/deposit',
    [banks.WELAB_BANK]: 'https://www.welab.bank/en/feature/gosave_2',
    [banks.PAOB]: 'https://www.paob.com.hk/en/retail-savings.html',
    [banks.PUBLIC_BANK]: 'https://www.publicbank.com.hk/en/usefultools/rates/depositinterestrates',
};

export {
    banks,
    timeDepositPages,
};
