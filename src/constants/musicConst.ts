export const WeekDay = {
	sun: 0,
	mon: 1,
	tue: 2,
	wed: 3,
	thu: 4,
	fri: 5,
	sat: 6
} as const;
export type WeekDay = (typeof WeekDay)[keyof typeof WeekDay];

export const SoundType = {
	a: 0,
	b: 1,
	c: 2,
	d: 3,
	e: 4,
	f: 5,
	g: 6
};
export type SoundType = (typeof SoundType)[keyof typeof SoundType];

export const PianoSoundType = ['C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'] as const;
export const BaseSoundType = ['C4', 'D4', 'E4', 'F4', 'G4', 'H4', 'I4'] as const;
export const DramSoundType = ['C4', 'D4', 'E4', 'C4', 'D4', 'E4', 'C4'] as const;

export const InstrumentType = {
	piano: 0,
	drum: 1,
	guitar: 2,
	base: 3
};
export type InstrumentType = (typeof InstrumentType)[keyof typeof InstrumentType];

export const defaultSoundType: SoundType[] = [0, 1, 2, 3, 4, 5, 6];

export const WeekDayDefinitionType = {
	sound: 'SoundType',
	instrument: 'InstrumentType'
};
export type WeekDayDefinitionType =
	(typeof WeekDayDefinitionType)[keyof typeof WeekDayDefinitionType];

export const ContributionDefinitionType = {
	sound: 'SoundType',
	velocity: 'Velocity'
};
export type ContributionDefinitionType =
	(typeof ContributionDefinitionType)[keyof typeof ContributionDefinitionType];
