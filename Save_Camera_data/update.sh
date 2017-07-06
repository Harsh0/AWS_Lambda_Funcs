rm index.zip
cd lambda
zip ../index.zip -r *
cd ..
aws lambda update-function-code --function-name SaveCameraData --zip-file fileb://index.zip > update.json
