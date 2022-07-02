import { RiddleBox } from "../types";


interface PickTableType {
    picks: RiddleBox[]
}

function PickTable({ picks }: PickTableType) {

    const visualizePickTable = () => {
        let attemptsRow: JSX.Element[] = [<th>Attempt</th>];
        let boxNumberRow: JSX.Element[] = [<th>Box number</th>];
        let boxContentRow: JSX.Element[] = [<th>Box content</th>];

        for (let i = 0; i < picks.length; i++) {
            attemptsRow.push(<td key={"attempt-" + i}>{picks[i].attempt}</td>)
            boxNumberRow.push(<td key={"boxNumber-" + i}>{picks[i].boxNumber}</td>)
            boxContentRow.push(<td key={"boxContent-" + i}>{picks[i].boxContent}</td>)
        }

        const table: JSX.Element =
            <table>
                <tr>{attemptsRow}</tr>
                <tr>{boxNumberRow}</tr>
                <tr>{boxContentRow}</tr>
            </table>

        return table;
    }

    return (
        <>
            {visualizePickTable()}
        </>
    )

}

export default PickTable;