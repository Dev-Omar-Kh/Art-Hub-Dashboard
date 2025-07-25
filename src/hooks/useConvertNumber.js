export default function Numbers (number, lang, raw = false) {

    if (raw) {
        return Number(number).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { useGrouping: false })
    }

    return Number(number).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')

};