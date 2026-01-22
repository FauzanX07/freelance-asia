'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  ASIAN_COUNTRIES,
  ALL_COUNTRIES,
  type Country,
  getCountryByCode,
} from '@/constants/countries'

interface CountrySelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  error?: string
  asianOnly?: boolean // If true, only show Asian countries (for freelancer registration)
  disabled?: boolean
  className?: string
}

const CountrySelect = ({
  value,
  onChange,
  placeholder = 'Select country',
  label,
  error,
  asianOnly = false,
  disabled = false,
  className,
}: CountrySelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const countries = asianOnly ? ASIAN_COUNTRIES : ALL_COUNTRIES
  const selectedCountry = value ? getCountryByCode(value) : null

  const filteredCountries = React.useMemo(() => {
    if (!searchQuery) return countries
    const query = searchQuery.toLowerCase()
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.code.toLowerCase().includes(query)
    )
  }, [countries, searchQuery])

  // Group countries by continent for all countries view
  const groupedCountries = React.useMemo(() => {
    if (asianOnly) return null

    const groups: Record<string, Country[]> = {}
    filteredCountries.forEach((country) => {
      if (!groups[country.continent]) {
        groups[country.continent] = []
      }
      groups[country.continent].push(country)
    })
    return groups
  }, [filteredCountries, asianOnly])

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (country: Country) => {
    onChange?.(country.code)
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-secondary-700">{label}</label>
      )}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-lg border border-secondary-300 bg-white px-3 py-2 text-sm',
          'focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
          isOpen && 'border-primary-500 ring-2 ring-primary-500/20'
        )}
      >
        {selectedCountry ? (
          <span className="flex items-center gap-2">
            <span className="text-lg">{selectedCountry.flag}</span>
            <span>{selectedCountry.name}</span>
          </span>
        ) : (
          <span className="text-secondary-400">{placeholder}</span>
        )}
        <ChevronsUpDown className="h-4 w-4 opacity-50" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-secondary-200 bg-white shadow-dropdown">
          {/* Search input */}
          <div className="border-b border-secondary-200 p-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search countries..."
                className="w-full rounded-md border border-secondary-200 py-1.5 pl-8 pr-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Country list */}
          <div className="max-h-60 overflow-auto p-1">
            {asianOnly ? (
              // Flat list for Asian countries
              filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <CountryOption
                    key={country.code}
                    country={country}
                    isSelected={value === country.code}
                    onSelect={handleSelect}
                  />
                ))
              ) : (
                <p className="p-2 text-center text-sm text-secondary-500">No countries found</p>
              )
            ) : (
              // Grouped by continent for all countries
              groupedCountries &&
              Object.entries(groupedCountries).map(([continent, countries]) => (
                <div key={continent}>
                  <div className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-secondary-400">
                    {continent}
                  </div>
                  {countries.map((country) => (
                    <CountryOption
                      key={country.code}
                      country={country}
                      isSelected={value === country.code}
                      onSelect={handleSelect}
                    />
                  ))}
                </div>
              ))
            )}
          </div>

          {asianOnly && (
            <div className="border-t border-secondary-200 p-2">
              <p className="text-xs text-secondary-500">
                FreelanceAsia is currently available for freelancers based in Asian countries only.
              </p>
            </div>
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  )
}

interface CountryOptionProps {
  country: Country
  isSelected: boolean
  onSelect: (country: Country) => void
}

const CountryOption = ({ country, isSelected, onSelect }: CountryOptionProps) => (
  <button
    type="button"
    onClick={() => onSelect(country)}
    className={cn(
      'flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm',
      'hover:bg-secondary-100',
      isSelected && 'bg-primary-50 text-primary-700'
    )}
  >
    <span className="text-lg">{country.flag}</span>
    <span className="flex-1 text-left">{country.name}</span>
    {isSelected && <Check className="h-4 w-4 text-primary-500" />}
  </button>
)

// Simple country display component
interface CountryDisplayProps {
  code: string
  showFlag?: boolean
  showName?: boolean
  className?: string
}

const CountryDisplay = ({
  code,
  showFlag = true,
  showName = true,
  className,
}: CountryDisplayProps) => {
  const country = getCountryByCode(code)

  if (!country) return null

  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      {showFlag && <span>{country.flag}</span>}
      {showName && <span>{country.name}</span>}
    </span>
  )
}

export { CountrySelect, CountryDisplay }
