import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const StatsPage = () => {
  const mockStats = [
    { original: 'https://example.com', accessCount: 12 },
    { original: 'https://openai.com', accessCount: 7 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>URL Access Statistics</Typography>
      {mockStats.map((item, i) => (
        <Grid container key={i} spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography>Original: {item.original}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Accessed: {item.accessCount} times</Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default StatsPage;