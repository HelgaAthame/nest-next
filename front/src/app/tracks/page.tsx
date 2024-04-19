import { TrackHeader } from '@/components/TrackHeader';
import { Track } from '@/types/track';
import { Card, Grid, Divider } from '@mui/material';

export const getTracks = async () => {
  const baseUrl = process.env.BASE_URL;
  console.log(baseUrl);
  const res = await fetch(`${baseUrl}/tracks/`);
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
};
export default async function Tracks() {
  const tracks = await getTracks();
  console.log(tracks);
  return (
    <Grid container className="pd">
      <Card className="pd grow backdrop-blur bg-white/50">
        <TrackHeader />
        <Divider />
        123
      </Card>
    </Grid>
  );
}
