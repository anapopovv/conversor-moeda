async function fetchExchangeRates() {
  const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
  const data = await response.json();
  return data.rates;
}

function fillCountrySelects(rates) {
  const countrySelects = document.querySelectorAll('select');
  const countries = Object.keys(rates);
  countries.forEach(country => {
    countrySelects.forEach(select => {
      const option = document.createElement('option');
      option.value = country;
      option.text = `${country} - ${rates[country]}`;
      select.add(option);
    });
  });
}

function convertCurrency() {
  const amount = document.getElementById('amount').value;
  const fromCountry = document.getElementById('fromCountrySelect').value;
  const toCountry = document.getElementById('toCountrySelect').value;
  const rate = parseFloat(document.getElementById('toCountrySelect').selectedOptions[0].label.split('-')[1]);
  const result = (amount * rate).toFixed(2);
  document.getElementById('result').value = result;
}

document.getElementById('convertBtn').addEventListener('click', convertCurrency);
document.getElementById('changeOrderBtn').addEventListener('click', () => {
  const fromSelect = document.getElementById('fromCountrySelect');
  const toSelect = document.getElementById('toCountrySelect');
  const tempValue = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = tempValue;
});

window.onload = async () => {
  const rates = await fetchExchangeRates();
  fillCountrySelects(rates);
};