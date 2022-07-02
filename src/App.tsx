import { Container, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import PickTable from './components/pick-table';
import { PickResult, PickType, Box, BatchResult } from './types';
import PrisonRiddle from './utils/prison-riddle';

function App() {

	const [prisonerCount, setPrisonerCount] = useState(100);
	const [maxAttemptCount, setMaxAttemptCount] = useState(50);

	const [batchTryCount, setBatchTryCount] = useState(100);
	const [batchResult, setBatchResult] = useState(<></>);

	const [result, setResult] = useState([] as any);
	const [selectedPickType, setSelectedPickType] = useState(PickType.RANDOM_PICK);


	const [selectedTab, setSelectedTab] = useState(0);


	const run = () => {
		const tempResult: any[] = [];

		const prisonerResults: PickResult[] = PrisonRiddle.run(prisonerCount, maxAttemptCount, selectedPickType);

		for (let i = 0; i < prisonerResults.length; i++) {
			tempResult.push(
				<>
					<div>
						🙎🏻‍♂️ Prisoner {i + 1}
					</div>
					<div>
						<PickTable picks={prisonerResults[i].picks} />
					</div>
					<br />
				</>
			)
		}
		setResult(tempResult);
	}

	const runBatch = () => {
		const batchResult: BatchResult = PrisonRiddle.runBatch(batchTryCount, prisonerCount, maxAttemptCount, selectedPickType);

		const table: JSX.Element =
			<table>
				<tr>
					<th>Success</th>
					<td>
						{batchResult.successfulRuns}
					</td>
				</tr>
				<tr>
					<th>Fail</th>
					<td>
						{batchResult.failedRuns}
					</td>
				</tr>
				<tr>
					<th>Percent %</th>
					<td>
						{batchResult.percent}%
					</td>
				</tr>
			</table>

		setBatchResult(table);
	}


	const getContentForSelectedTab = () => {
		return <></>
	}



	return (
		<div className="App">
			<button onClick={() => run()}>Run</button>
			<select name="picks" onChange={(e) => setSelectedPickType(e.target.value as PickType)}>
				<option value={PickType.RANDOM_PICK}>Random Pick</option>
				<option value={PickType.LOOP_PICK}>Loop Pick</option>
			</select>

			<input type="number" name="prisonerCount" onChange={(e) => setPrisonerCount(parseInt(e.target.value))} value={prisonerCount} />
			<input type="number" name="maxAttemptCount" onChange={(e) => setMaxAttemptCount(parseInt(e.target.value))} value={maxAttemptCount} />

			<button onClick={() => runBatch()}>Run Batch</button>
			<input type="number" name="batchTryCount" onChange={(e) => setBatchTryCount(parseInt(e.target.value))} value={batchTryCount} />


			<br /><br /><br />
			{batchResult}
			<br />
			{result}


		</div>
	);
}

export default App;
