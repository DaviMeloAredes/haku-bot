export type EventType = { name: string; run(args: any): Promise<void> };
