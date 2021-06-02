import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Github from './Github';

const App = () => {
  const idQrCode = 'qr-code';
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [size, setSize] = useState(300);
  const [level, setLevel] = useState('L');
  const [render, setRender] = useState('canvas');
  const [value, setValue] = useState('https://');

  const downqrcode = () => {
    const qrcode = document.getElementById(idQrCode);
    const type = 'png';

    let MIME_TYPE = `image/${type}`;
    let imgURL = qrcode.toDataURL(MIME_TYPE);

    let dlLink = document.createElement('a');
    dlLink.download = `image.${type}`;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(
      ':'
    );

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Github />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h2" component="h1" gutterBottom>
              QR Code Generator
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} align="center">
            <TextareaAutosize
              className={classes.textarea}
              rowsMin={10}
              cols={matches === true ? 60 : 40}
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2} align="center">
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl variant="outlined">
                  <InputLabel id="demo-simple-select-outlined-label1">
                    Size
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label1"
                    id="demo-simple-select-outlined1"
                    value={size}
                    onChange={(event) => setSize(event.target.value)}
                    label="Age"
                  >
                    <MenuItem value={100}>100x100</MenuItem>
                    <MenuItem value={200}>200x200</MenuItem>
                    <MenuItem value={300}>300x300</MenuItem>
                    <MenuItem value={400}>400x400</MenuItem>
                    <MenuItem value={500}>500x500</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label2">
                    Level
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label2"
                    id="demo-simple-select-outlined2"
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    label="Age"
                  >
                    <MenuItem value={'L'}>L</MenuItem>
                    <MenuItem value={'M'}>M</MenuItem>
                    <MenuItem value={'Q'}>Q</MenuItem>
                    <MenuItem value={'H'}>H</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label3">
                    Render
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label3"
                    id="demo-simple-select-outlined3"
                    value={render}
                    onChange={(event) => setRender(event.target.value)}
                    label="Age"
                  >
                    <MenuItem value={'canvas'}>CANVAS</MenuItem>
                    <MenuItem value={'svg'}>SVG</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} align="center">
            <QRCode
              id={idQrCode}
              className={classes.qrcode}
              includeMargin={true}
              value={value}
              renderAs={render}
              size={size}
              level={level}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={downqrcode}
            >
              Download
            </Button>
          </Grid>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  textarea: {
    marginTop: theme.spacing(-1),
    marginBottom: theme.spacing(3),
  },
  qrcode: {
    marginTop: theme.spacing(0),
    // margin: theme.spacing(-5),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      Created By{' '}
      <Link color="inherit" href="https://github.com/dedzec">
        Lucas Leal
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default App;
