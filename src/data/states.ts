// Define an interface for the structure of a single state option object
interface StateOption {
	value: string
	labelEN: string
	labelES: string
	labelFR: string
}

// Helper function to create a state option object with explicit types
const createStateOption = (
	value: string,
	labelEN: string,
	labelES: string,
	labelFR: string
): StateOption => ({
	value,
	labelEN,
	labelES,
	labelFR,
})

export const stateOptions: StateOption[] = [
	createStateOption('AL', 'Alabama', 'Alabama', 'Alabama'),
	createStateOption('AK', 'Alaska', 'Alaska', 'Alaska'),
	createStateOption('AZ', 'Arizona', 'Arizona', 'Arizona'),
	createStateOption('AR', 'Arkansas', 'Arkansas', 'Arkansas'),
	createStateOption('CA', 'California', 'California', 'Californie'),
	createStateOption('CO', 'Colorado', 'Colorado', 'Colorado'),
	createStateOption('CT', 'Connecticut', 'Connecticut', 'Connecticut'),
	createStateOption('DE', 'Delaware', 'Delaware', 'Delaware'),
	createStateOption('FL', 'Florida', 'Florida', 'Floride'),
	createStateOption('GA', 'Georgia', 'Georgia', 'Géorgie'),
	createStateOption('HI', 'Hawaii', 'Hawái', 'Hawaï'),
	createStateOption('ID', 'Idaho', 'Idaho', 'Idaho'),
	createStateOption('IL', 'Illinois', 'Illinois', 'Illinois'),
	createStateOption('IN', 'Indiana', 'Indiana', 'Indiana'),
	createStateOption('IA', 'Iowa', 'Iowa', 'Iowa'),
	createStateOption('KS', 'Kansas', 'Kansas', 'Kansas'),
	createStateOption('KY', 'Kentucky', 'Kentucky', 'Kentucky'),
	createStateOption('LA', 'Louisiana', 'Luisiana', 'Louisiane'),
	createStateOption('ME', 'Maine', 'Maine', 'Maine'),
	createStateOption('MD', 'Maryland', 'Maryland', 'Maryland'),
	createStateOption('MA', 'Massachusetts', 'Massachusetts', 'Massachusetts'),
	createStateOption('MI', 'Michigan', 'Míchigan', 'Michigan'),
	createStateOption('MN', 'Minnesota', 'Minnesota', 'Minnesota'),
	createStateOption('MS', 'Mississippi', 'Misisipi', 'Mississippi'),
	createStateOption('MO', 'Missouri', 'Misuri', 'Missouri'),
	createStateOption('MT', 'Montana', 'Montana', 'Montana'),
	createStateOption('NE', 'Nebraska', 'Nebraska', 'Nebraska'),
	createStateOption('NV', 'Nevada', 'Nevada', 'Nevada'),
	createStateOption('NH', 'New Hampshire', 'Nuevo Hampshire', 'Nouveau Hampshire'),
	createStateOption('NJ', 'New Jersey', 'Nueva Jersey', 'Nouveau-Jersey'),
	createStateOption('NM', 'New Mexico', 'Nuevo México', 'Nouveau-Mexique'),
	createStateOption('NY', 'New York', 'Nueva York', 'New York'),
	createStateOption('NC', 'North Carolina', 'Carolina del Norte', 'Caroline du Nord'),
	createStateOption('ND', 'North Dakota', 'Dakota del Norte', 'Dakota du Nord'),
	createStateOption('OH', 'Ohio', 'Ohio', 'Ohio'),
	createStateOption('OK', 'Oklahoma', 'Oklahoma', 'Oklahoma'),
	createStateOption('OR', 'Oregon', 'Oregón', 'Oregon'),
	createStateOption('PA', 'Pennsylvania', 'Pensilvania', 'Pennsylvanie'),
	createStateOption('RI', 'Rhode Island', 'Rhode Island', 'Rhode Island'),
	createStateOption('SC', 'South Carolina', 'Carolina del Sur', 'Caroline du Sud'),
	createStateOption('SD', 'South Dakota', 'Dakota del Sur', 'Dakota du Sud'),
	createStateOption('TN', 'Tennessee', 'Tennessee', 'Tennessee'),
	createStateOption('TX', 'Texas', 'Texas', 'Texas'),
	createStateOption('UT', 'Utah', 'Utah', 'Utah'),
	createStateOption('VT', 'Vermont', 'Vermont', 'Vermont'),
	createStateOption('VA', 'Virginia', 'Virginia', 'Virginie'),
	createStateOption('WA', 'Washington', 'Washington', 'Washington'),
	createStateOption('WV', 'West Virginia', 'Virginia Occidental', 'Virginie-Occidentale'),
	createStateOption('WI', 'Wisconsin', 'Wisconsin', 'Wisconsin'),
	createStateOption('WY', 'Wyoming', 'Wyoming', 'Wyoming'),
	createStateOption('AS', 'American Samoa', 'Samoa Americana', 'Samoa américaines'),
	createStateOption('DC', 'District of Columbia', 'Distrito de Columbia', 'District de Columbia'),
	createStateOption(
		'FM',
		'Federated States of Micronesia',
		'Estados Federados de Micronesia',
		'États fédérés de Micronésie'
	),
	createStateOption('GU', 'Guam', 'Guam', 'Guam'),
	createStateOption('MH', 'Marshall Islands', 'Islas Marshall', 'Îles Marshall'),
	createStateOption('MP', 'Marianas Islands', 'Islas Marianas del Norte', 'Îles Mariannes du Nord'),
	createStateOption('PW', 'Palau', 'Palaos', 'Palaos'),
	createStateOption('PR', 'Puerto Rico', 'Puerto Rico', 'Porto Rico'),
	createStateOption('VI', 'Virgin Islands', 'Islas Vírgenes', 'Îles Vierges'),
]
