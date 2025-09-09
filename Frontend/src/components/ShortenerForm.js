import React, { useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { validateURL } from '../utils/validators';
import { logEvent } from '../middleware/logger';

const ShortenerForm = () => {
  const [inputs, setInputs] = useState([{ original: '', shortcode: '', validity: '' }]);
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const handleAdd = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { original: '', shortcode: '', validity: '' }]);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    logEvent('copy_short_url', { shortUrl });
  };

  const handleSubmit = () => {
    const newErrors = inputs.map((entry) =>
      validateURL(entry.original) ? null : 'Invalid URL'
    );
    setErrors(newErrors);

    const validEntries = inputs.filter((entry, i) => !newErrors[i]);
    if (validEntries.length === 0) {
      logEvent('validation_failed', { inputs });
      return;
    }

    logEvent('submit_urls', { validEntries });

    // MOCK shortening logic
    const mockResults = validEntries.map((entry, i) => ({
      original: entry.original,
      shortened: `http://localhost:3000/s/${entry.shortcode || 'mock' + i}`
    }));

    setResults(mockResults);
    logEvent('shorten_success', { mockResults });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Shorten URLs</Typography>

      {inputs.map((entry, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Original URL"
              fullWidth
              value={entry.original}
              onChange={(e) => handleChange(index, 'original', e.target.value)}
              error={!!errors[index]}
              helperText={errors[index]}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Custom Shortcode (optional)"
              fullWidth
              value={entry.shortcode}
              onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Validity (seconds, optional)"
              fullWidth
              value={entry.validity}
              onChange={(e) => handleChange(index, 'validity', e.target.value)}
            />
          </Grid>
        </Grid>
      ))}

      <Button variant="outlined" onClick={handleAdd} disabled={inputs.length >= 5}>
        Add Another URL
      </Button>

      <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
        Shorten
      </Button>

      <Box sx={{ mt: 4 }}>
        {results.map((res, i) => (
          <Grid container key={i} spacing={2} alignItems="center" sx={{ mb: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography>{res.original}</Typography>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Typography>
                <a href={res.shortened} target="_blank" rel="noopener noreferrer">
                  {res.shortened}
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Tooltip title="Copy to clipboard">
                <IconButton onClick={() => handleCopy(res.shortened)}>
                  <ContentCopyIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  );
};

export default ShortenerForm;