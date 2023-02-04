import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import { renderCountriesList, createInfoCountries } from './markup';
import { inputField, countryList, countryInfo } from './refs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const cleanField = field => {
  field.innerHTML = '';
};

const onInputFormType = event => {
  const dataInput = event.target.value.trim();

  if (!dataInput) {
    cleanField(countryList);
    cleanField(countryInfo);
    return;
  }
  fetchCountries(dataInput)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      createResult(data);
    })
    .catch(error => {
      cleanField(countryList);
      cleanField(countryInfo);
      Notify.failure('Oops, there is no country with that name');
    });
};
const createResult = country => {
  if (country.length === 1) {
    cleanField(countryList);
    countryInfo.innerHTML = createInfoCountries(country);
  } else {
    cleanField(countryInfo);
    countryList.innerHTML = renderCountriesList(country);
  }
};
inputField.addEventListener('input', debounce(onInputFormType, DEBOUNCE_DELAY));
