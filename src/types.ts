export interface Box {
    attempt: number,
    boxNumber: number,
    boxContent: number
}

export interface PickResult {
    status: boolean,
    picks: Box[]
}

export interface BatchResult {
    successfulRuns: number,
    failedRuns: number,
    percent: number
}

export enum PickType {
    RANDOM_PICK="RANDOM_PICK",
    LOOP_PICK="LOOP_PICK"
}