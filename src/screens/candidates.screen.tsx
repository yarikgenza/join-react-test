import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';

import CandidateCard from '../components/CandidateCard';
import { CandidatesStore } from '../stores';
import { Candidate } from '../types';

const CandidatesScreen = () => {
    const classes = useStyles();

    useEffect(() => {       
        CandidatesStore.fetchList();
    }, []);

    const { candidates } = CandidatesStore;

    return (
        <Container className={classes.container}>
            <List
                aria-labelledby="nested-list-subheader"
                component="nav"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Submitted applications: {candidates.length}
                    </ListSubheader>
                }
                className={classes.list}
            >
                {candidates.map((item: Candidate) => (
                    <CandidateCard candidate={item} key={item.id} />
                ))}
            </List>
        </Container>
    );
};

const useStyles = makeStyles((_theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        margin: 50,
    },
    root: {
        maxWidth: 740,
        width: 600,
        marginBottom: 20,
    },
    toRightCorner: {
        float: 'right',
        marginTop: -20,
    }
}));

export default observer(CandidatesScreen);
