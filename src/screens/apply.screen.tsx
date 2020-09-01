import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import { CandidatesStore } from '../stores';

interface CandidateProfile {
    fullName?: string,
    email?: string,
    password?: string,
    phone?: string,
};

const ApplyScreen = () => {
    const classes = useStyles();
    const history = useHistory();

    const [isLoading, setLoadingState] = useState(false);

    const [values, setValues] = useState<CandidateProfile>({
        fullName: '',
        email: '',
        password: '',
        phone: '',
    });

    const onSubmitClick = async () => {
        setLoadingState(true);
        await CandidatesStore.apply(values);
        history.push('/candidates');
    }

    const handleInputChange = (e: React.ChangeEvent): void => {
        const { name, value } = e.target as HTMLInputElement;
        setValues({ ...values, [name]: value });
    };
    
    return (
        <Container className={classes.container}>
            <Paper className={classes.formWrapper}>

            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <form className={classes.form} noValidate autoComplete="off">

                <Typography variant="h4" data-cy="apply_screen:form_title" >Apply to position</Typography>
    
                <div className={classes.formItem}>
                    <TextField
                        onChange={handleInputChange}
                        variant="outlined"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={values.fullName}
                        data-cy="apply_screen:form:fullName"
                    />
                </div>
    
                <div className={classes.formItem}>
                    <TextField
                        onChange={handleInputChange}
                        value={values.email}
                        name="email"
                        variant="outlined" fullWidth id="standard-disabled" label="Email"
                        data-cy="apply_screen:form:email"
                    />
                </div>
    
                <div className={classes.formItem}>
                    <TextField
                        onChange={handleInputChange}
                        value={values.password}
                        variant="outlined"
                        name="password"
                        label="Password"
                        type="password"
                        fullWidth
                        data-cy="apply_screen:form:password"
                    />
                </div>
                <div className={classes.formItem}>
                    <TextField
                        onChange={handleInputChange}
                        value={values.phone}
                        variant="outlined"
                        name="phone"
                        label="Phone"
                        fullWidth
                        data-cy="apply_screen:form:phone"
                    />
                </div>
                <div className={classes.formItem}>
                    <Button onClick={onSubmitClick} variant="contained" fullWidth color="primary" data-cy="apply_screen:form:submit">
                        Submit
                    </Button>
                </div>
    
            </form>
            )}
        </Paper>
        </Container>
    );
};

const useStyles = makeStyles((_theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formWrapper: {
        marginTop: 50,
    },
    form: {
        margin: 40,
        marginTop: 20,
    },
    formItem: {
        marginTop: 25,
    },
}));

export default ApplyScreen;
