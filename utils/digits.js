const numbers = {
    fa: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    ar: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
    en: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
};

/**
 * Validate digit
 * @param digit
 */
export const NotValidDigit = digit => digit === null || digit === false || typeof digit === 'undefined';

/**
 * Converts English digits into asked locale formatted number
 *
 * @param digit
 * @param locale {string}
 * @returns {string}
 */
export const digits = (digit, locale = 'fa') => {
    
    if (NotValidDigit(digit,'fa')) {
        return digit;
    }
    return `${digit}`.replace(/[0123456789]/g, w => numbers[locale][numbers.en.indexOf(w)]).replace(/[۰۱۲۳۴۵۶۷۸۹]/g, w => numbers[locale][numbers.fa.indexOf(w)]).replace(/[٠١٢٣٤٥٦٧٨٩]/g, w => numbers[locale][numbers.ar.indexOf(w)]);
};