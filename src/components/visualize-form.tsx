import { Button, Grid, TextField } from "@mui/material";

import { PickType } from "../types";
import ComboBox from "./combo-box";


interface VisualizeFormType {
    prisonerCount: any,
    setPrisonerCount: any,
    maxAttemptCount: any,
    setMaxAttemptCount: any,
    selectedPickType: any,
    setSelectedPickType: any,
    runFunction: any
}

export default function VisualizeForm({ prisonerCount, setPrisonerCount, maxAttemptCount, setMaxAttemptCount, selectedPickType, setSelectedPickType, runFunction }: VisualizeFormType) {
    return (
        <Grid container spacing={2} >
            <Grid item xs={3} >
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
            <Grid item xs={3} >
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
            <Grid item xs={4} >
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
