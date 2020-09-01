import React from 'react';
import Chip from '@material-ui/core/Chip';

import { CandidateStates } from '../types';

const ApplicationStatus = ({ state }: { state?: keyof typeof CandidateStates }) => {
    const getChipColor = (state: string) => {
        if (state === CandidateStates.IN_REVIEW) return 'primary';
        if (state === CandidateStates.NOT_A_FIT) return 'secondary';
        return 'default';
    }

    return (
        <Chip
            label={state}
            color={getChipColor(state as string)}
        />
    )
}

export default ApplicationStatus;