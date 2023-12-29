import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


export const MyPdfViewer = ({ file, open, onClose }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle>Visualizador de PDF</DialogTitle>
      <DialogContent>
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ),
          )}
        </Document>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
};
