export type CommandType = {
	name: string;
	desc: string;
	type: number;
	run(): void;
};
