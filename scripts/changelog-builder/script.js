const fetch = require('node-fetch');
const Buffer = require('buffer').Buffer;
const fs = require('fs');

if (!(process.env.EMAIL && process.env.API_KEY && process.env.RELEASE_VERSION && process.env.PROJECT_VERSION)) {
    console.error('Creating changelog.md failed. Missed required inputs : ' +
        (!process.env.EMAIL ? 'EMAIL,' : '') +
        (!process.env.API_KEY ? 'API_KEY,' : '') +
        (!process.env.RELEASE_VERSION ? 'RELEASE_VERSION,' : '') +
        (!process.env.PROJECT_VERSION ? 'PROJECT_VERSION,' : ''))
    process.exit(1);
}
// # constant
const resultFilePath = './changelog.md';
const projectName = 'angular-template-libraries';

// #=== Script Inputs API & GIT settings
const jiraSubDomain = process.env.SUBDOMAIN || 'openchannel';
const jiraEmail = process.env.EMAIL;
const jiraApiKey = process.env.API_KEY;
const jiraReleaseVersion = process.env.RELEASE_VERSION;
const jiraMaxIssues = 100;
const projectVersion = process.env.PROJECT_VERSION;

// Options for creating file
const filePatternValues = {
    PROJECT_NAME: (issue) => projectName,
    PROJECT_VERSION: (issue) => projectVersion,
    ISSUE_KEY: (issue) => issue ? issue.key : '',
    ISSUE_NAME: (issue) => issue ? issue.fields.summary : '',
    ISSUE_TYPE: (issue) => issue ? issue.fields.issuetype.name : '',
    DATE: (issue) => new Date().toLocaleDateString("en"),
}

// Changelog pattern
const filePatternHeader = "## Release notes - PROJECT_NAME - Version PROJECT_VERSION (DATE)<br>\n"
const filePatternTitle = `### ISSUE_TYPE<br>\n`
const filePatternIssue = `ISSUE_KEY - ISSUE_NAME<br>\n`

function isExistsCurrentVersionInChangelog(changelogFileBuffer) {
    const newChangelogTitle = replacePatternValues(null, filePatternHeader, filePatternValues);
    const oldChangelogTitle = changelogFileBuffer.subarray(0, newChangelogTitle.length).toString();
    return oldChangelogTitle.includes(projectVersion);
}

async function getIssuesFromAPI(jiraSubDomain, jiraEmail, jiraApiKey, jiraFixVersion, maxIssues) {
    console.log(`Gets issues from JIRA for ${jiraFixVersion}`);
    const response = await fetch(`https://${jiraSubDomain}.atlassian.net/rest/api/2/search?jql=fixVersion=${jiraFixVersion}&maxResults=${maxIssues}`,
        {headers: {'Authorization': `Basic ${Buffer.from(`${jiraEmail}:${jiraApiKey}`).toString('base64')}`}}
    );
    if (response.status === 200) {
        return await response.json();
    } else {
        console.error('Can\'t get issues from JIRA.');
        process.exit(1);
    }
}

function sortIssuesByType(issues) {
    return issues.sort(issue => issue.fields.issuetype.name);
}

function buildFile(issuesArray) {
    // header line
    let tempFile = replacePatternValues(null, filePatternHeader, filePatternValues);

    for (let i = 0; i < issuesArray.length;) {
        const issueFirstInGroup = issuesArray[i]
        let issueGroupType = filePatternValues.ISSUE_TYPE(issueFirstInGroup);
        // title line
        tempFile += replacePatternValues(issueFirstInGroup, filePatternTitle, filePatternValues)
        while (i < issuesArray.length) {
            const issue = issuesArray[i];
            if (filePatternValues.ISSUE_TYPE(issue) !== issueGroupType) {
                break;
            }
            // issue line
            tempFile += replacePatternValues(issue, filePatternIssue, filePatternValues);
            i++;
        }
    }
    return tempFile;
}

function replacePatternValues(issueObj, patternStr, values) {
    let tempStr = patternStr;
    Object.keys(values).forEach((key) => {
        tempStr = tempStr.replace(key, values[key](issueObj));
    })
    return tempStr;
}

function createChangelog() {
    const oldChangelogFileBuffer = fs.readFileSync(resultFilePath);
    if(isExistsCurrentVersionInChangelog(oldChangelogFileBuffer)) {
        console.log(`Changelog was not changed, because already includes ${projectVersion} version.`);
        process.exit(0);
    } else {
        getIssuesFromAPI(jiraSubDomain, jiraEmail, jiraApiKey, jiraReleaseVersion, jiraMaxIssues)
            .then(response => sortIssuesByType(response.issues))
            .then(availableIssues => buildFile(availableIssues))
            .then(fileBody => {
                prependFile(resultFilePath, oldChangelogFileBuffer, fileBody, (err) => {
                    if (err) {
                        console.error('Can\'t save file by path :', resultFilePath);
                        process.exit(1);
                    }
                    console.log('Created a new changelog.md:\n' + fileBody);
                })
            })
            .catch((err) => {
                console.error('Unknown error', err);
                process.exit(1);
            });
    }
}

function prependFile(filePath, oldFileBuffer, data, callback) {
    const fd = fs.openSync(filePath, 'w+');
    const buffer = new Buffer(data);

    fs.writeSync(fd, buffer, 0, buffer.length, 0); //write new data
    fs.writeSync(fd, oldFileBuffer, 0, oldFileBuffer.length, buffer.length); //append old data

    fs.close(fd, callback);
}

createChangelog();
