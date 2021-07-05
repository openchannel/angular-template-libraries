const fetch = require('node-fetch');
const Buffer = require('buffer').Buffer;
const fs = require('fs')

if (!(process.env.EMAIL && process.env.API_KEY && process.env.RELEASE_VERSION && process.env.PACKAGE_VERSION)) {
    console.error('Creating changelog.md failed. Missed required inputs : ' +
        (!process.env.EMAIL ? 'EMAIL,' : '') +
        (!process.env.API_KEY ? 'API_KEY,' : '') +
        (!process.env.RELEASE_VERSION ? 'RELEASE_VERSION,' : '') +
        (!process.env.PACKAGE_VERSION ? 'PACKAGE_VERSION,' : ''))
    process.exit(1);
}

// #=== Script Inputs API & GIT settings
const jiraSubDomain = process.env.SUBDOMAIN || 'openchannel';
const jiraEmail = process.env.EMAIL;
const jiraApiKey = process.env.API_KEY;
const jiraReleaseVersion = process.env.RELEASE_VERSION;
const jiraMaxIssues = 100;
const packageVersion = process.env.PACKAGE_VERSION;
const gitRepoName = process.env.GIT_REPOSITORY_NAME || 'Project'
const resultFilePath = process.env.RESULT_FILE_PATH || '../../changelog.md';

// Options for creating file
const filePatternValues = {
    PROJECT_NAME: (issue) => gitRepoName,
    PACKAGE_VERSION: (issue) => packageVersion,
    ISSUE_KEY: (issue) => issue ? issue.key : '',
    ISSUE_NAME: (issue) => issue ? issue.fields.summary : '',
    ISSUE_TYPE: (issue) => issue ? issue.fields.issuetype.name : '',
}
const filePatternHeader = "## Release notes - PROJECT_NAME - Version PACKAGE_VERSION<br>\n"
const filePatternTitle = `### ISSUE_TYPE<br>\n`
const filePatternIssue = `ISSUE_KEY - ISSUE_NAME<br>\n`


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

getIssuesFromAPI(jiraSubDomain, jiraEmail, jiraApiKey, jiraReleaseVersion, jiraMaxIssues)
    .then(response => sortIssuesByType(response.issues))
    .then(availableIssues => buildFile(availableIssues))
    .then(fileBody => {
        fs.writeFile(resultFilePath, fileBody, (err) => {
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
