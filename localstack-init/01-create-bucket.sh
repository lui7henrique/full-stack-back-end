#!/bin/bash
set -eo pipefail

echo "Creating S3 bucket: product-images"
awslocal s3api create-bucket --bucket product-images --region us-east-1 