import React from "react"
import ReactFlagsSelect from 'react-flags-select';
import locales from '../constants/locales';
import { navigate } from "gatsby"
import './language-selector.scss';

const countryFlags = Object.entries(locales).map(([,locale]) => locale.flag);
const customLabels = {}
Object.entries(locales).forEach(([,locale]) => {
  customLabels[locale.flag] = locale.locale
})

export const getCurrentLocaleFromPath = (path) => {
  const localesEntries = Object.entries(locales)
  
  let currentLocale = localesEntries.filter(([,locale]) => locale.default)[0][1];
  
  if (!path) return currentLocale

  localesEntries.forEach(([,locale]) => {
    if (path.includes(locale.path)) {
      currentLocale = locale
    }
  })
  return currentLocale
}

const onSelectFlag = (path, newCountry) => {
  const currentLocale = getCurrentLocaleFromPath(path);
  const newLocale = locales[customLabels[newCountry]];

  const newPath = path.replace(currentLocale.path, newLocale.path)

  navigate(newPath)
}

const getFlagFromLanguageCode = (path) => {
  return getCurrentLocaleFromPath(path).flag
}

export default ({ path }) => <ReactFlagsSelect
  className="language-selector"
  defaultCountry={getFlagFromLanguageCode(path)}
  placeholder="Language"
  countries={countryFlags}
  customLabels={customLabels}
  onSelect={(newCountry) => onSelectFlag(path, newCountry)}
/>
