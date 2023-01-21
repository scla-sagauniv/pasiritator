import {
	ContributionDefinitionType,
	defaultSoundType,
	InstrumentType,
	SoundType,
	WeekDay,
	WeekDayDefinitionType
} from '../constants/musicConst';

export type Contribution = {
	contributionCount: number;
};

export type ContributionDays = {
	contributionDays: Contribution[];
};

export type ContributionCalendar = {
	weeks: ContributionDays[];
};

export type Score = {
	sun: { note: SoundType | null; velocity: number }[];
	mon: { note: SoundType | null; velocity: number }[];
	tue: { note: SoundType | null; velocity: number }[];
	wed: { note: SoundType | null; velocity: number }[];
	thu: { note: SoundType | null; velocity: number }[];
	fri: { note: SoundType | null; velocity: number }[];
	sat: { note: SoundType | null; velocity: number }[];
};

export const weekDayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default class Music {
	score: Score;
	instruments: InstrumentType[];
	constructor(score?: Score, instruments?: InstrumentType[]) {
		this.score = score ?? {
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: []
		};
		this.instruments = instruments ?? new Array<InstrumentType>(7).fill(InstrumentType.piano);
	}

	fromContributionCalendar(
		contributionCalendar: ContributionCalendar,
		weekDay: {
			type: WeekDayDefinitionType;
			value: SoundType[] | InstrumentType[];
		} = { type: WeekDayDefinitionType.sound, value: defaultSoundType },
		contributionCount: {
			type: ContributionDefinitionType;
			value: undefined | SoundType[];
		} = { type: ContributionDefinitionType.velocity, value: undefined },
		optins?: {
			maxCount: number;
		}
	): Music {
		const res = new Music();

		// 最初の配列は何曜日始まりかわからないので何曜日始まりか求めてそれ以外はnillを入れる
		const startWeekDayIdx = 7 - contributionCalendar.weeks[0].contributionDays.length;
		for (let i = 0; i < startWeekDayIdx; i++) {
			res.score[weekDayKeys[i] as keyof Score].push({ note: null, velocity: 0 });
		}
		contributionCalendar.weeks[0].contributionDays.forEach((day, i) => {
			const data = { note: null, velocity: 1 };
			if (weekDay.type === WeekDayDefinitionType.sound) {
				data['note'] =
					day.contributionCount === 0
						? null
						: this.weekDayToSoundType((i + startWeekDayIdx) as WeekDay, weekDay.value);
			} else {
				res.instruments = weekDay.value;
			}
			if (contributionCount.type === ContributionDefinitionType.velocity) {
				data['velocity'] = this.contributionCountToVelocity(day.contributionCount);
			} else {
				data['note'] =
					day.contributionCount === 0
						? null
						: this.contributionCountToSoundType(day.contributionCount, optins?.maxCount);
			}
			res.score[weekDayKeys[i] as keyof Score].push(data);
		});
		contributionCalendar.weeks.shift();

		contributionCalendar.weeks.forEach((days) => {
			days.contributionDays.forEach((day, i) => {
				const data = { note: null, velocity: 1 };
				if (weekDay.type === WeekDayDefinitionType.sound) {
					data['note'] =
						day.contributionCount === 0
							? null
							: this.weekDayToSoundType(i as WeekDay, weekDay.value);
				}
				if (contributionCount.type === ContributionDefinitionType.velocity) {
					data['velocity'] = this.contributionCountToVelocity(day.contributionCount);
				} else {
					data['note'] =
						day.contributionCount === 0
							? null
							: this.contributionCountToSoundType(day.contributionCount, optins?.maxCount);
				}
				res.score[weekDayKeys[i] as keyof Score].push(data);
			});
		});
		return res;
	}

	weekDayToSoundType(weekDay: WeekDay, sounds: SoundType[]): SoundType {
		return sounds[weekDay];
	}

	weekDayToInstrumentType(weekDay: WeekDay, instruments: InstrumentType[]): InstrumentType {
		return instruments[weekDay];
	}

	contributionCountToVelocity(cnt: number): number {
		return cnt === 0 ? 0 : 1.1 - 1 / cnt;
	}

	contributionCountToSoundType(cnt: number, maxCnt = 28): SoundType | null {
		let res: SoundType;
		if (cnt === 0) return null;
		switch (cnt / (maxCnt / 7)) {
			case 0:
				res = SoundType.a;
				break;
			case 1:
				res = SoundType.b;
				break;
			case 2:
				res = SoundType.c;
				break;
			case 3:
				res = SoundType.d;
				break;
			case 4:
				res = SoundType.e;
				break;
			case 5:
				res = SoundType.f;
				break;
			default:
				res = SoundType.g;
				break;
		}
		return res;
	}
}
