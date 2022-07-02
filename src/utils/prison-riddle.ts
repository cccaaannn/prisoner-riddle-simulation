import { PickResult, PickType, RiddleBox, BatchResult } from "../types";
import { getRandomArray } from "./array-utils";


class PrisonRiddle {

    static randomPick(prisonerNumber: number, boxes: number[], maxAttemptCount: number): PickResult {
        const opened: number[] = [];
        const picks: RiddleBox[] = [];

        let counter = 0;
        while (counter < maxAttemptCount) {
            const num = Math.floor(Math.random() * boxes.length);
            if (opened.includes(num)) {
                continue;
            }
            const boxContent: number = boxes[num];
            opened.push(num);
            picks.push({ boxNumber: num + 1, boxContent: boxContent + 1, attempt: counter + 1 });

            // console.info(`Prisoner: ${prisonerNumber} Picked box: ${num} Box content: ${boxContent} Pick count: ${counter}`);

            counter++;
            if (boxContent === prisonerNumber) {
                return { status: true, picks: picks };
            }
        }
        return { status: false, picks: picks };
    }


    static loopPick(prisonerNumber: number, boxes: number[], maxAttemptCount: number): PickResult {
        let next: number = prisonerNumber;
        const picks: RiddleBox[] = [];
        for (let i = 0; i < maxAttemptCount; i++) {
            const boxContent: number = boxes[next];

            // console.info(`Prisoner: ${prisonerNumber + 1} Picked box: ${next + 1} Box content: ${boxContent + 1} Pick count: ${i}`);
            picks.push({ boxNumber: next + 1, boxContent: boxContent + 1, attempt: i + 1 });

            if (boxContent === prisonerNumber) {
                return { status: true, picks: picks };
            }
            next = boxContent;
        }
        return { status: false, picks: picks };
    }

    static run(prisonerCount: number, maxAttemptCount: number, selectedPickType: PickType): PickResult[] {

        // Get random boxes
        const boxes: number[] = getRandomArray(prisonerCount);

        const results: PickResult[] = [];

        for (let i = 0; i < prisonerCount; i++) {
            let prisonerResult: PickResult;

            if (selectedPickType === PickType.LOOP_PICK) {
                prisonerResult = PrisonRiddle.loopPick(i, boxes, maxAttemptCount);
            }
            else {
                prisonerResult = PrisonRiddle.randomPick(i, boxes, maxAttemptCount);
            }

            results.push(prisonerResult);

            if (!prisonerResult.status) {
                break;
            }
        }

        return results;
    }

    static runBatch(batchTryCount: number, prisonerCount: number, maxAttemptCount: number, selectedPickType: PickType): BatchResult {
        let successfulRuns: number = 0;

        for (let j = 0; j < batchTryCount; j++) {
            const boxes: number[] = getRandomArray(prisonerCount);
            let successFlag: boolean = true;
            for (let i = 0; i < prisonerCount; i++) {
                let prisonerResult: PickResult;

                if (selectedPickType === PickType.LOOP_PICK) {
                    prisonerResult = PrisonRiddle.loopPick(i, boxes, maxAttemptCount);
                }
                else {
                    prisonerResult = PrisonRiddle.randomPick(i, boxes, maxAttemptCount);
                }

                if (!prisonerResult.status) {
                    successFlag = false;
                    break;
                }
            }

            if (successFlag) {
                successfulRuns++;
            }
        }

        return { successfulRuns: successfulRuns, failedRuns: (batchTryCount - successfulRuns), percent: (successfulRuns / batchTryCount) * 100 }
    }

}


export default PrisonRiddle;