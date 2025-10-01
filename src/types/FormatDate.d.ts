export type DateObjReturnType = "string" | "number";

export type DateObj<T extends DateObjReturnType> = {
	day: T extends "string" ? string : number;
	month: T extends "string" ? string : number;
	year: T extends "string" ? string : number;
	hours: T extends "string" ? string : number;
	minutes: T extends "string" ? string : number;
	seconds: T extends "string" ? string : number;
};
