import { CreateTrackSteps } from "@/components/StepWrapper";
import { Grid, Card } from "@mui/material";

export default function AddTrack({ params }: { params: { album_id: string } }) {
  return (
    <Grid container className="pd h-full">
      <Card className="pd grow backdrop-blur bg-white/50 flex flex-col gap-4">
        <h1>Create Track</h1>
        <CreateTrackSteps albumId={params.album_id} />
      </Card>
    </Grid>
  );
}
