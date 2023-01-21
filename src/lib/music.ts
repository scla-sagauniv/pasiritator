export type Contribution = {
	contributionCount: number;
};

export type ContributionDays = {
	contributionDays: Contribution[];
};

export type ContributionCalendar = {
	weeks: ContributionDays[];
};

type Score = {
	sun: (string | null)[];
	mon: (string | null)[];
	tue: (string | null)[];
	wed: (string | null)[];
	thu: (string | null)[];
	fri: (string | null)[];
	sat: (string | null)[];
};

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
		const weekDayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

		// 最初の配列は何曜日始まりかわからないので何曜日始まりか求めてそれ以外はnillを入れる
		const startWeekDayIdx = 7 - contributionCalendar.weeks[0].contributionDays.length;
		for (let i = 0; i < startWeekDayIdx; i++) {
			res.score[weekDayKeys[i] as keyof Score].push(null);
		}
		contributionCalendar.weeks[0].contributionDays.forEach((day, i) => {
			res.score[weekDayKeys[i + startWeekDayIdx] as keyof Score].push(
				// TODO: 音階に変換する関数を通す
				day.contributionCount.toString()
			);
		});
		contributionCalendar.weeks.shift();

		contributionCalendar.weeks.forEach((days) => {
			days.contributionDays.forEach((day, i) => {
				// TODO: 音階に変換する関数を通す
				res.score[weekDayKeys[i] as keyof Score].push(day.contributionCount.toString());
			});
		});
		return res;
	}
}
