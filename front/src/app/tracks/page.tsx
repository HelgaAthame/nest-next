import { TrackHeader } from "@/components/TrackHeader";
import { Track } from "@/types/track";
import {  Card, Grid, Divider } from "@mui/material";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

export const getServerSideProps = (async() => {
  const res = await fetch(`${baseUrl}/tracks`);
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
})satisfies GetServerSideProps<{ data: Track[] }>
export default function Tracks({data}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
  <Grid container className="pd">
    <Card className="pd grow backdrop-blur bg-white/50">
      <TrackHeader/>
      <Divider/>
      123
    </Card>
    </Grid>
  );
}
