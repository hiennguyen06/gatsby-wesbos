const formatter = Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
});

const formatMoney = cents => {
    return formatter.format(cents / 100);
}

export default formatMoney