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
	sun: { note: string | null; velocity: number }[];
	mon: { note: string | null; velocity: number }[];
	tue: { note: string | null; velocity: number }[];
	wed: { note: string | null; velocity: number }[];
	thu: { note: string | null; velocity: number }[];
	fri: { note: string | null; velocity: number }[];
	sat: { note: string | null; velocity: number }[];
};

enum WeekDay {
	sun = 0,
	mon = 1,
	tue = 2,
	wed = 3,
	thu = 4,
	fri = 5,
	sat = 6
}

enum SoundType {
	a = 0,
	b = 1,
	c = 2,
	d = 3,
	e = 4,
	f = 5,
	g = 6
}

enum InstrumentType {
	piano = 0,
	drum = 1,
	guitar = 2,
	base = 3
}

export const weekDayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export default class Music {
	score: Score;
	constructor(score?: Score) {
		this.score = score ?? {
			sun: [],
			mon: [],
			tue: [],
			wed: [],
			thu: [],
			fri: [],
			sat: []
		};
	}

	fromContributionCalendar(contributionCalendar: ContributionCalendar): Music {
		const res = new Music();

		// 最初の配列は何曜日始まりかわからないので何曜日始まりか求めてそれ以外はnillを入れる
		const startWeekDayIdx = 7 - contributionCalendar.weeks[0].contributionDays.length;
		for (let i = 0; i < startWeekDayIdx; i++) {
			res.score[weekDayKeys[i] as keyof Score].push({ note: null, velocity: 0 });
		}
		contributionCalendar.weeks[0].contributionDays.forEach((day, i) => {
			res.score[weekDayKeys[i + startWeekDayIdx] as keyof Score].push({
				note: day.contributionCount === 0 ? null : this.weekDayToSoundType(i),
				velocity: day.contributionCount === 0 ? 0 : 1.1 - 1 / day.contributionCount
			});
		});
		contributionCalendar.weeks.shift();

		contributionCalendar.weeks.forEach((days) => {
			days.contributionDays.forEach((day, i) => {
				res.score[weekDayKeys[i] as keyof Score].push({
					note: day.contributionCount === 0 ? null : this.weekDayToSoundType(i),
					velocity: day.contributionCount === 0 ? 0 : 1.1 - 1 / day.contributionCount
				});
			});
		});
		return res;
	}

	weekDayToSoundType(weekDay: WeekDay): SoundType {
		let res: SoundType;
		switch (weekDay) {
			case WeekDay.sun:
				res = SoundType.a;
				break;
			case WeekDay.mon:
				res = SoundType.b;
				break;
			case WeekDay.tue:
				res = SoundType.c;
				break;
			case WeekDay.wed:
				res = SoundType.d;
				break;
			case WeekDay.thu:
				res = SoundType.e;
				break;
			case WeekDay.fri:
				res = SoundType.f;
				break;
			case WeekDay.sat:
				res = SoundType.g;
				break;
		}
		return res;
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
