function renderCountriesList(country) {
  return country
    .map(({ name, flags }) => {
      return `<li>
           <img class = "country-img" src="${flags.png}" alt="${name.official}" width=70 height=40>
          <p class ="country-name">${name.official}</p>
          </li>`;
    })
    .join('');
}
const createInfoCountries = country => {
  return country.map(({ name, capital, population, flags, languages }) => {
    return `
    <img src="${flags.png}" alt="${name.official}" width=200 heigth=160>
        <h1 class="country"> ${name.official}</h1>
        <p class="country-info">Capital: ${capital}</p>
        <p class="country-info">Population: ${population}</p>
        <p class="country-info">Languages: ${Object.values(languages)}</p>
      `;
  });
};
export { renderCountriesList, createInfoCountries };
