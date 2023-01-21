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
	sun: (string | null)[];
	mon: (string | null)[];
	tue: (string | null)[];
	wed: (string | null)[];
	thu: (string | null)[];
	fri: (string | null)[];
	sat: (string | null)[];
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
			res.score[weekDayKeys[i] as keyof Score].push(null);
		}
		contributionCalendar.weeks[0].contributionDays.forEach((day, i) => {
			res.score[weekDayKeys[i + startWeekDayIdx] as keyof Score].push(
				day.contributionCount === 0 ? null : this.weekDayToMusicScale(i)
			);
		});
		contributionCalendar.weeks.shift();

		contributionCalendar.weeks.forEach((days) => {
			days.contributionDays.forEach((day, i) => {
				res.score[weekDayKeys[i] as keyof Score].push(
					day.contributionCount === 0 ? null : this.weekDayToMusicScale(i)
				);
			});
		});
		return res;
	}

	weekDayToMusicScale(weekDay: WeekDay): string {
		let res: string;
		switch (weekDay) {
			case WeekDay.sun:
				res = 'C4';
				break;
			case WeekDay.mon:
				res = 'E4';
				break;
			case WeekDay.tue:
				res = 'F4';
				break;
			case WeekDay.wed:
				res = 'G4';
				break;
			case WeekDay.thu:
				res = 'H4';
				break;
			case WeekDay.fri:
				res = 'I4';
				break;
			case WeekDay.sat:
				res = 'J4';
				break;
		}
		return res;
	}
}
