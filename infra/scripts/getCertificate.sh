#!/bin/bash

#=== Script Inputs
REGION=$1
SUBDOMAIN=$2 
#================= 

aws acm --region $REGION list-certificates | jq -r '[.CertificateSummaryList | unique | .[] | select( .DomainName == "'$SUBDOMAIN'" or .DomainName[1:] == ".'${SUBDOMAIN#*.}'")][0] | .CertificateArn'
