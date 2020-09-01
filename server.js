const express = require('express');
const { v4: uuid } = require('uuid');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + 'dist'));
app.use(express.json());

app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
})

// Candidates objects are stored in-memory
let candidates = [];

const candidateStates = {
    SUBMITTED: 'submitted',
    IN_REVIEW: 'in review',
    NOT_A_FIT: 'not a fit',
    HIRED: 'hired',
};

const readCandidatesFromFile = async () => {
    const candidatesFromFile = require('./data/candidates.json');

    candidatesFromFile.forEach(item => item.id = uuid());

    candidates.push(...candidatesFromFile);
};

// Routes
app.get('/api/candidates', async (req, res) => {
    return res.json(candidates);
});

app.post('/api/candidates/apply', (req, res) => {

    console.log(req.body);
    const now = new Date();

    const candidate = {
        ...req.body,
        id: uuid(),
        applied_on: `${now.getDay()}.${now.getMonth() + 1}.${now.getFullYear()}`,
        state: candidateStates.SUBMITTED,
    };

    candidates.push(candidate);

    res.json(candidate);
});

app.patch('/api/candidates/:id', (req, res) => {
    const targetCandidate = candidates.find((i) => i.id === req.params.id);

    if (targetCandidate) {
        Object.assign(targetCandidate, req.body);
    };

    res.json({ candidate: targetCandidate });
});

app.listen(PORT, async () => {
    await readCandidatesFromFile();
    console.log(`listening at ${PORT}`);
});