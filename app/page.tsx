'use client';
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  IconButton,
  Tooltip,
  Snackbar,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Home() {
  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    const res = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, alias }),
    });
    const data = await res.json();
    if (res.ok) {
      setShortUrl(data.shortUrl);
    } else {
      setError(data.error);
    }
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    }
  };

  return (
      <Container
          maxWidth="sm"
          sx={{
            mt: 8,
            p: 4,
            borderRadius: 3,
            backgroundColor: '#FED2E2',
            color: '#2E2E2E',
            boxShadow: 3,
          }}
      >
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#8F87F1', fontWeight: 'bold' }}>
          URL Shortener
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
              label="Enter URL to be shortened"
              variant="outlined"
              fullWidth
              onChange={(e) => setUrl(e.target.value)}
              required
              value={url}
              sx={{ mb: 2, backgroundColor: 'white' }}
          />
          <TextField
              label="Enter Alias"
              variant="outlined"
              fullWidth
              onChange={(e) => setAlias(e.target.value)}
              required
              value={alias}
              sx={{ mb: 2, backgroundColor: 'white' }}
          />
          <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#8F87F1', ':hover': { backgroundColor: '#C68EFD' } }}
          >
            Shorten URL
          </Button>
        </Box>

        {shortUrl && (
            <Box sx={{ mt: 4 }}>
              <Alert
                  severity="success"
                  icon={false}
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <Box>
                  <strong>Short URL:</strong>{' '}
                  <Link href={shortUrl} target="_blank" rel="noopener" underline="hover" >
                    {shortUrl}
                  </Link>
                </Box>
                <Tooltip title="Copy to clipboard">
                  <IconButton onClick={handleCopy} sx={{ ml: 1 }}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Alert>
            </Box>
        )}

        {error && (
            <Box sx={{ mt: 4 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
        )}

        <Snackbar
            open={copied}
            autoHideDuration={2000}
            onClose={() => setCopied(false)}
            message="Copied to clipboard!"
        />
      </Container>
  );
}
