export enum Attitude {
	Friendly,
	Romantic,
	Neutral,
	Untrusting,
	Professional,
	Dismissive,
	Aggressive,
	Fearful,
}

export type AttitudeString = keyof typeof Attitude;
