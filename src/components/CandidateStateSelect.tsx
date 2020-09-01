import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { CandidateStates, Candidate } from '../types';

export interface CandidateStateSelectProps {
  candidate: Candidate,
  open: boolean;
  selectedValue?: keyof typeof CandidateStates;
  onClose: (value?: string) => void;
}

const CandidateStateSelect = (props: CandidateStateSelectProps) => {
  const { onClose, selectedValue, open, candidate } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  const states: Array<string> = ['submitted', 'in review', 'not a fit', 'hired'];

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set state for {candidate.fullName}</DialogTitle>
      <List>
        {states.map((state) => (
          <ListItem button onClick={() => handleListItemClick(state)} key={state} data-cy={`state_selector:${state}`}>
            <ListItemText primary={state} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default CandidateStateSelect;
