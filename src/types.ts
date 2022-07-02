export interface RiddleBox {
    attempt: number,
    boxNumber: number,
    boxContent: number
}

export interface PickResult {
    status: boolean,
    picks: RiddleBox[]
}

export interface BatchResult {
    successfulRuns: number,
    failedRuns: number,
    percent: number
}

export enum PickType {
    RANDOM_PICK="RANDOM PICK",
    LOOP_PICK="LOOP PICK"
}