rm index.zip
cd lambda
zip –X –r ../index.zip *
cd ..
aws lambda update-function-code --function-name AWS_IOT_to_DynamoDB_update --zip-file fileb://index.zip
