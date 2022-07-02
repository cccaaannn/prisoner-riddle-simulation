import { useState } from 'react';

import { Box, Container, Divider, Tab, Tabs, Typography } from '@mui/material';

import VisualizeForm from './components/visualize-form';
import BatchForm from './components/batch-from';
import PickTable from './components/pick-table';

import { PickResult, PickType, BatchResult } from './types';
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
					<Box>
						🙎🏻‍♂️ Prisoner {i + 1}
					</Box>
					<Box sx={{ mt: 2 }}>
						<PickTable picks={prisonerResults[i].picks} />
					</Box>
					<Divider sx={{ mt: 2, mb: 2 }} />
				</>
			)
		}

		setBatchResult(<></>);
		setResult(tempResult);
	}

	const runBatch = () => {
		const batchResult: BatchResult = PrisonRiddle.runBatch(batchTryCount, prisonerCount, maxAttemptCount, selectedPickType);

		const table: JSX.Element =
			<table className='batch-table'>
				<tr>
					<th>Attempt</th>
					<td>
						{batchTryCount}
					</td>
				</tr>
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
		setResult([]);
	}


	const getContentForSelectedTab = () => {
		if (selectedTab === 0) {
			return <VisualizeForm
				prisonerCount={prisonerCount}
				setPrisonerCount={setPrisonerCount}
				maxAttemptCount={maxAttemptCount}
				setMaxAttemptCount={setMaxAttemptCount}
				selectedPickType={selectedPickType}
				setSelectedPickType={setSelectedPickType}
				runFunction={run}
			/>
		}
		if (selectedTab === 1) {
			return <BatchForm
				batchTryCount={batchTryCount}
				setBatchTryCount={setBatchTryCount}
				prisonerCount={prisonerCount}
				setPrisonerCount={setPrisonerCount}
				maxAttemptCount={maxAttemptCount}
				setMaxAttemptCount={setMaxAttemptCount}
				selectedPickType={selectedPickType}
				setSelectedPickType={setSelectedPickType}
				runFunction={runBatch}
			/>
		}
	}


	return (
		<>
			<Container component="main" sx={{ mt: 2, p: 2, }}>

				<Typography variant='h3'>Prisoner riddle visualizer</Typography>

				<Tabs value={selectedTab} onChange={(e, value) => setSelectedTab(value)} sx={{ mb: 2 }} >
					<Tab label="Visual" value={0} />
					<Tab label="Batch" value={1} />
				</Tabs>

				{getContentForSelectedTab()}

				<Divider sx={{ mt: 2, mb: 2 }} />

				{batchResult}
			</Container>

			<Box sx={{ mx: { xl: 12, lg: 6, xs: 2 } }}>
				{result}
			</Box>
		</>
	);
}

export default App;
