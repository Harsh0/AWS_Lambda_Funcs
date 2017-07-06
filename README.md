# AWS_Lambda_Funcs
Some proof of concept Lambda function to take quick reference
To install aws command line "pip install awscli"
To configure aws "aws configure"
To list all s3 buckets "aws s3 ls"
To make s3 bucket "aws s3 mb s3://bucket-name"
To copy local file to s3 bucket "aws s3 cp filename.extension s3://bucket-name/filename_in_bucket.extension"
To zip all .js file into one file "zip -r filename.zip \*.js"
To update lambda function using .zip file "aws lambda update-function-code --zip-file=fileb://filename.zip --function-name lambda_function_name" ,we will get one JSON
To update the handler in zip file for lambda "aws lambda update-function-configuration --function-name lambda_function_name --handler custom_file.handler"
