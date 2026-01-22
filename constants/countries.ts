export interface Country {
  code: string
  name: string
  flag: string
  dialCode: string
  continent: string
}

// Asian countries - Freelancers MUST be from these countries
export const ASIAN_COUNTRIES: Country[] = [
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫', dialCode: '+93', continent: 'Asia' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲', dialCode: '+374', continent: 'Asia' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿', dialCode: '+994', continent: 'Asia' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭', dialCode: '+973', continent: 'Asia' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', dialCode: '+880', continent: 'Asia' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹', dialCode: '+975', continent: 'Asia' },
  { code: 'BN', name: 'Brunei', flag: '🇧🇳', dialCode: '+673', continent: 'Asia' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭', dialCode: '+855', continent: 'Asia' },
  { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86', continent: 'Asia' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾', dialCode: '+357', continent: 'Asia' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪', dialCode: '+995', continent: 'Asia' },
  { code: 'HK', name: 'Hong Kong', flag: '🇭🇰', dialCode: '+852', continent: 'Asia' },
  { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', continent: 'Asia' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', dialCode: '+62', continent: 'Asia' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷', dialCode: '+98', continent: 'Asia' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶', dialCode: '+964', continent: 'Asia' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', dialCode: '+972', continent: 'Asia' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81', continent: 'Asia' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴', dialCode: '+962', continent: 'Asia' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿', dialCode: '+7', continent: 'Asia' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼', dialCode: '+965', continent: 'Asia' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬', dialCode: '+996', continent: 'Asia' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦', dialCode: '+856', continent: 'Asia' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧', dialCode: '+961', continent: 'Asia' },
  { code: 'MO', name: 'Macau', flag: '🇲🇴', dialCode: '+853', continent: 'Asia' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', dialCode: '+60', continent: 'Asia' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻', dialCode: '+960', continent: 'Asia' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳', dialCode: '+976', continent: 'Asia' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲', dialCode: '+95', continent: 'Asia' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵', dialCode: '+977', continent: 'Asia' },
  { code: 'KP', name: 'North Korea', flag: '🇰🇵', dialCode: '+850', continent: 'Asia' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲', dialCode: '+968', continent: 'Asia' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', dialCode: '+92', continent: 'Asia' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸', dialCode: '+970', continent: 'Asia' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', dialCode: '+63', continent: 'Asia' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', dialCode: '+974', continent: 'Asia' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', continent: 'Asia' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', dialCode: '+65', continent: 'Asia' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82', continent: 'Asia' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰', dialCode: '+94', continent: 'Asia' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾', dialCode: '+963', continent: 'Asia' },
  { code: 'TW', name: 'Taiwan', flag: '🇹🇼', dialCode: '+886', continent: 'Asia' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯', dialCode: '+992', continent: 'Asia' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', dialCode: '+66', continent: 'Asia' },
  { code: 'TL', name: 'Timor-Leste', flag: '🇹🇱', dialCode: '+670', continent: 'Asia' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', dialCode: '+90', continent: 'Asia' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲', dialCode: '+993', continent: 'Asia' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971', continent: 'Asia' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿', dialCode: '+998', continent: 'Asia' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', dialCode: '+84', continent: 'Asia' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪', dialCode: '+967', continent: 'Asia' },
]

// All countries worldwide - Clients can be from any country
export const ALL_COUNTRIES: Country[] = [
  // Africa
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿', dialCode: '+213', continent: 'Africa' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '+244', continent: 'Africa' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯', dialCode: '+229', continent: 'Africa' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', dialCode: '+267', continent: 'Africa' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫', dialCode: '+226', continent: 'Africa' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮', dialCode: '+257', continent: 'Africa' },
  { code: 'CV', name: 'Cabo Verde', flag: '🇨🇻', dialCode: '+238', continent: 'Africa' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', dialCode: '+237', continent: 'Africa' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫', dialCode: '+236', continent: 'Africa' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩', dialCode: '+235', continent: 'Africa' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲', dialCode: '+269', continent: 'Africa' },
  { code: 'CG', name: 'Congo', flag: '🇨🇬', dialCode: '+242', continent: 'Africa' },
  { code: 'CD', name: 'Congo (DRC)', flag: '🇨🇩', dialCode: '+243', continent: 'Africa' },
  { code: 'CI', name: "Cote d'Ivoire", flag: '🇨🇮', dialCode: '+225', continent: 'Africa' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯', dialCode: '+253', continent: 'Africa' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', dialCode: '+20', continent: 'Africa' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶', dialCode: '+240', continent: 'Africa' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷', dialCode: '+291', continent: 'Africa' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', dialCode: '+268', continent: 'Africa' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', dialCode: '+251', continent: 'Africa' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦', dialCode: '+241', continent: 'Africa' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲', dialCode: '+220', continent: 'Africa' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', dialCode: '+233', continent: 'Africa' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳', dialCode: '+224', continent: 'Africa' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼', dialCode: '+245', continent: 'Africa' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254', continent: 'Africa' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸', dialCode: '+266', continent: 'Africa' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷', dialCode: '+231', continent: 'Africa' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾', dialCode: '+218', continent: 'Africa' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬', dialCode: '+261', continent: 'Africa' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', dialCode: '+265', continent: 'Africa' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱', dialCode: '+223', continent: 'Africa' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷', dialCode: '+222', continent: 'Africa' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺', dialCode: '+230', continent: 'Africa' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦', dialCode: '+212', continent: 'Africa' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '+258', continent: 'Africa' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', dialCode: '+264', continent: 'Africa' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪', dialCode: '+227', continent: 'Africa' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234', continent: 'Africa' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', dialCode: '+250', continent: 'Africa' },
  { code: 'ST', name: 'Sao Tome and Principe', flag: '🇸🇹', dialCode: '+239', continent: 'Africa' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', dialCode: '+221', continent: 'Africa' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨', dialCode: '+248', continent: 'Africa' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱', dialCode: '+232', continent: 'Africa' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴', dialCode: '+252', continent: 'Africa' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27', continent: 'Africa' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸', dialCode: '+211', continent: 'Africa' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩', dialCode: '+249', continent: 'Africa' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '+255', continent: 'Africa' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬', dialCode: '+228', continent: 'Africa' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳', dialCode: '+216', continent: 'Africa' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', dialCode: '+256', continent: 'Africa' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', dialCode: '+260', continent: 'Africa' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', dialCode: '+263', continent: 'Africa' },

  // Americas
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬', dialCode: '+1268', continent: 'Americas' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54', continent: 'Americas' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸', dialCode: '+1242', continent: 'Americas' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧', dialCode: '+1246', continent: 'Americas' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿', dialCode: '+501', continent: 'Americas' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴', dialCode: '+591', continent: 'Americas' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', continent: 'Americas' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', continent: 'Americas' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', dialCode: '+56', continent: 'Americas' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57', continent: 'Americas' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷', dialCode: '+506', continent: 'Americas' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺', dialCode: '+53', continent: 'Americas' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲', dialCode: '+1767', continent: 'Americas' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴', dialCode: '+1809', continent: 'Americas' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨', dialCode: '+593', continent: 'Americas' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻', dialCode: '+503', continent: 'Americas' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩', dialCode: '+1473', continent: 'Americas' },
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹', dialCode: '+502', continent: 'Americas' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾', dialCode: '+592', continent: 'Americas' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹', dialCode: '+509', continent: 'Americas' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳', dialCode: '+504', continent: 'Americas' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲', dialCode: '+1876', continent: 'Americas' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', continent: 'Americas' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮', dialCode: '+505', continent: 'Americas' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦', dialCode: '+507', continent: 'Americas' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾', dialCode: '+595', continent: 'Americas' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪', dialCode: '+51', continent: 'Americas' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳', dialCode: '+1869', continent: 'Americas' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨', dialCode: '+1758', continent: 'Americas' },
  { code: 'VC', name: 'Saint Vincent', flag: '🇻🇨', dialCode: '+1784', continent: 'Americas' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷', dialCode: '+597', continent: 'Americas' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹', dialCode: '+1868', continent: 'Americas' },
  { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', continent: 'Americas' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾', dialCode: '+598', continent: 'Americas' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪', dialCode: '+58', continent: 'Americas' },

  // Europe
  { code: 'AL', name: 'Albania', flag: '🇦🇱', dialCode: '+355', continent: 'Europe' },
  { code: 'AD', name: 'Andorra', flag: '🇦🇩', dialCode: '+376', continent: 'Europe' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹', dialCode: '+43', continent: 'Europe' },
  { code: 'BY', name: 'Belarus', flag: '🇧🇾', dialCode: '+375', continent: 'Europe' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪', dialCode: '+32', continent: 'Europe' },
  { code: 'BA', name: 'Bosnia and Herzegovina', flag: '🇧🇦', dialCode: '+387', continent: 'Europe' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬', dialCode: '+359', continent: 'Europe' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷', dialCode: '+385', continent: 'Europe' },
  { code: 'CZ', name: 'Czechia', flag: '🇨🇿', dialCode: '+420', continent: 'Europe' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰', dialCode: '+45', continent: 'Europe' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪', dialCode: '+372', continent: 'Europe' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮', dialCode: '+358', continent: 'Europe' },
  { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', continent: 'Europe' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', continent: 'Europe' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷', dialCode: '+30', continent: 'Europe' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺', dialCode: '+36', continent: 'Europe' },
  { code: 'IS', name: 'Iceland', flag: '🇮🇸', dialCode: '+354', continent: 'Europe' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪', dialCode: '+353', continent: 'Europe' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', continent: 'Europe' },
  { code: 'XK', name: 'Kosovo', flag: '🇽🇰', dialCode: '+383', continent: 'Europe' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻', dialCode: '+371', continent: 'Europe' },
  { code: 'LI', name: 'Liechtenstein', flag: '🇱🇮', dialCode: '+423', continent: 'Europe' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹', dialCode: '+370', continent: 'Europe' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺', dialCode: '+352', continent: 'Europe' },
  { code: 'MT', name: 'Malta', flag: '🇲🇹', dialCode: '+356', continent: 'Europe' },
  { code: 'MD', name: 'Moldova', flag: '🇲🇩', dialCode: '+373', continent: 'Europe' },
  { code: 'MC', name: 'Monaco', flag: '🇲🇨', dialCode: '+377', continent: 'Europe' },
  { code: 'ME', name: 'Montenegro', flag: '🇲🇪', dialCode: '+382', continent: 'Europe' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', dialCode: '+31', continent: 'Europe' },
  { code: 'MK', name: 'North Macedonia', flag: '🇲🇰', dialCode: '+389', continent: 'Europe' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', dialCode: '+47', continent: 'Europe' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', dialCode: '+48', continent: 'Europe' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351', continent: 'Europe' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴', dialCode: '+40', continent: 'Europe' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7', continent: 'Europe' },
  { code: 'SM', name: 'San Marino', flag: '🇸🇲', dialCode: '+378', continent: 'Europe' },
  { code: 'RS', name: 'Serbia', flag: '🇷🇸', dialCode: '+381', continent: 'Europe' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰', dialCode: '+421', continent: 'Europe' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮', dialCode: '+386', continent: 'Europe' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', continent: 'Europe' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', dialCode: '+46', continent: 'Europe' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', dialCode: '+41', continent: 'Europe' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦', dialCode: '+380', continent: 'Europe' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', continent: 'Europe' },
  { code: 'VA', name: 'Vatican City', flag: '🇻🇦', dialCode: '+379', continent: 'Europe' },

  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', continent: 'Oceania' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯', dialCode: '+679', continent: 'Oceania' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮', dialCode: '+686', continent: 'Oceania' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭', dialCode: '+692', continent: 'Oceania' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲', dialCode: '+691', continent: 'Oceania' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷', dialCode: '+674', continent: 'Oceania' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', dialCode: '+64', continent: 'Oceania' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼', dialCode: '+680', continent: 'Oceania' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬', dialCode: '+675', continent: 'Oceania' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸', dialCode: '+685', continent: 'Oceania' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧', dialCode: '+677', continent: 'Oceania' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴', dialCode: '+676', continent: 'Oceania' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻', dialCode: '+688', continent: 'Oceania' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺', dialCode: '+678', continent: 'Oceania' },

  // Asia (include all Asian countries in the worldwide list too)
  ...ASIAN_COUNTRIES,
].sort((a, b) => a.name.localeCompare(b.name))

// Asian country codes set for quick lookup
export const ASIAN_COUNTRY_CODES = new Set(ASIAN_COUNTRIES.map((c) => c.code))

// Helper functions

/**
 * Check if a country code belongs to an Asian country
 */
export function isAsianCountry(countryCode: string): boolean {
  return ASIAN_COUNTRY_CODES.has(countryCode.toUpperCase())
}

/**
 * Get country by code
 */
export function getCountryByCode(code: string): Country | undefined {
  return ALL_COUNTRIES.find((c) => c.code.toUpperCase() === code.toUpperCase())
}

/**
 * Get country by name (case insensitive)
 */
export function getCountryByName(name: string): Country | undefined {
  return ALL_COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase())
}

/**
 * Get Asian countries as dropdown options
 */
export function getAsianCountryOptions(): { value: string; label: string; flag: string }[] {
  return ASIAN_COUNTRIES.map((c) => ({
    value: c.code,
    label: c.name,
    flag: c.flag,
  }))
}

/**
 * Get all countries as dropdown options
 */
export function getAllCountryOptions(): { value: string; label: string; flag: string }[] {
  return ALL_COUNTRIES.map((c) => ({
    value: c.code,
    label: c.name,
    flag: c.flag,
  }))
}

/**
 * Get countries grouped by continent
 */
export function getCountriesByContinent(): Record<string, Country[]> {
  return ALL_COUNTRIES.reduce(
    (acc, country) => {
      if (!acc[country.continent]) {
        acc[country.continent] = []
      }
      acc[country.continent].push(country)
      return acc
    },
    {} as Record<string, Country[]>
  )
}

/**
 * Format country for display (flag + name)
 */
export function formatCountry(code: string): string {
  const country = getCountryByCode(code)
  return country ? `${country.flag} ${country.name}` : code
}

/**
 * Validate that a country code is a valid Asian country (for freelancer registration)
 */
export function validateAsianCountry(countryCode: string): { valid: boolean; error?: string } {
  if (!countryCode) {
    return { valid: false, error: 'Country is required' }
  }

  if (!isAsianCountry(countryCode)) {
    return {
      valid: false,
      error: 'FreelanceAsia is currently available only for freelancers based in Asian countries',
    }
  }

  return { valid: true }
}
