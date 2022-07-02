import { Button, Grid, TextField } from "@mui/material";

import { PickType } from "../types";
import ComboBox from "./combo-box";


interface BatchFormType {
    batchTryCount: any,
    setBatchTryCount: any,
    prisonerCount: any,
    setPrisonerCount: any,
    maxAttemptCount: any,
    setMaxAttemptCount: any,
    selectedPickType: any,
    setSelectedPickType: any,
    runFunction: any
}

export default function BatchForm({ batchTryCount, setBatchTryCount, prisonerCount, setPrisonerCount, maxAttemptCount, setMaxAttemptCount, selectedPickType, setSelectedPickType, runFunction }: BatchFormType) {
    return (
        <Grid container spacing={2} >
            <Grid item xs={3} >
                <TextField
                    value={batchTryCount}
                    onChange={(e) => setBatchTryCount(e.target.value)}

                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    id="batch-count"
                    label="Batch Count"
                    name="batch-count"
                />
            </Grid>
            <Grid item xs={2} >
                <TextField
                    value={prisonerCount}
                    onChange={(e) => setPrisonerCount(e.target.value)}

                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    id="prisoner-count"
                    label="Prisoner Count"
                    name="prisoner-count"
                />
            </Grid>
            <Grid item xs={2} >
                <TextField
                    value={maxAttemptCount}
                    onChange={(e) => setMaxAttemptCount(e.target.value)}

                    margin="normal"
                    type="number"
                    required
                    fullWidth
                    id="max-attempt-count"
                    label="Max Attempt Count"
                    name="max-attempt-count"
                />
            </Grid>
            <Grid item xs={3} >
                <ComboBox name="Pick type" inputsList={[PickType.RANDOM_PICK, PickType.LOOP_PICK]} selected={selectedPickType} setSelected={setSelectedPickType} />
            </Grid>
            <Grid item xs={2} >
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={() => runFunction()}
                    sx={{ mt: 2, padding: 2 }}
                >
                    Run
                </Button>
            </Grid>
        </Grid>
    )
}
