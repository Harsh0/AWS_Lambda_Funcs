rm index.zip
cd lambda
zip ../index.zip -r *
cd ..
aws lambda create-function --function-name SaveCameraData1 --description="A simple function" --zip-file=fileb://index.zip --runtime nodejs6.10 --role arn:aws:iam::527500720746:role/service-role/SimpleMicroServicePermission --handler index.handler > publish.json
