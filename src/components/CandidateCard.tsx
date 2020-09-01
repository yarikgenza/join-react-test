import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Candidate } from '../types';
import CandidatesStore from '../stores/candidates.store';

import ApplicationStatus from './ApplicationStatus';
import calculateApplicationScore from '../helpers/calculateApplicationScore';
import CandidateStateSelect from './CandidateStateSelect';

const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
    const classes = useStyles();

    const [menuAnchorEl, setMenuAnchorEl] = useState(null);
    const [showSelector, setSelectorVilibility] = useState(false);
    
    const handleOpenMenu = (event: any) => {
      setMenuAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setMenuAnchorEl(null);
    };

    const onDeleteClick = () => {
      CandidatesStore.removeCandidate(candidate.id);
      handleCloseMenu();
    }

    const onUpdateStatusClick = () => {
      handleCloseMenu();
      setSelectorVilibility(true);
    }

    const handleSelectorClose = (selectedState?: string) => {
      CandidatesStore.updateState(candidate.id as string, selectedState as any);
      setSelectorVilibility(false);
    }
    
    return (
        <Card className={classes.root}
            variant="outlined"
        >
            <CardHeader
                avatar={
                    <Avatar>
                      <PersonOutlineIcon />
                    </Avatar>
                }
                action={[
                    <ApplicationStatus state={candidate.state} />,
                    <IconButton
                        aria-label="settings"
                        aria-haspopup="true"
                        onClick={(e) => handleOpenMenu(e)}
                        data-cy="candidate_card:menu_btn"
                    >
                        <MoreVertIcon />
                    </IconButton>,
                    <Menu
                        anchorEl={menuAnchorEl}
                        open={Boolean(menuAnchorEl)}
                        onClose={handleCloseMenu}
                        keepMounted
                    >
                        <MenuItem
                            onClick={() => onUpdateStatusClick()}
                            data-cy="candidate_card:update_state_btn" 
                        >
                            Update Status
                        </MenuItem>
                        <MenuItem
                            onClick={onDeleteClick}
                            data-cy="candidate_card:delete_btn"
                        >
                            Delete
                        </MenuItem>
                    </Menu>,
                    <CandidateStateSelect
                        open={showSelector}
                        onClose={handleSelectorClose}
                        candidate={candidate}
                    />
                    ]}
                    title={candidate.fullName || 'Anonymous'}
                    subheader={candidate.email || 'Email not specified'}
                    data-cy={`candidate_card:${candidate.fullName}`}
                />
            <CardContent data-cy={`candidate_card_content:${candidate.fullName}`}>
                <Typography variant="body2" color="textSecondary" component="p">
                    Application score: <b>{calculateApplicationScore(candidate)}%</b>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Phone number: {candidate.phone || '-'} 
                </Typography>
                <Typography className={classes.toRightCorner} variant="body2" color="textSecondary" component="p">
                    Applied on {candidate.applied_on}
                </Typography>
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((_theme) => ({
    root: {
        maxWidth: 740,
        width: 600,
        marginBottom: 20,
      },
      toRightCorner: {
        float: 'right',
        marginTop: -20,
      },
}));

export default CandidateCard;
