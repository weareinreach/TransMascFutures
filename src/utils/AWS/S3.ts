export const esLintError =
	'esLint was complaining when file only had comments. Delete line when package is installed'
// import AWS from "aws-sdk"

// const { BUCKET_NAME, BUCKET_REGION, IDENTITY_POOL_ID } = process.env

//// SDK Config

// AWS.Config({
// 	region: BUCKET_REGION,
// 	credentials: new AWS.CognitoIdentityCredentials({
// 		IdentityPoolId: IDENTITY_POOL_ID
// 	})
// })

// const s3 = new AWS.S3({
// 	apiVersion: "2006-03-01",
// 	params: { Bucket: BUCKET_NAME }
// })

////

// export const addPhoto = (file: FileList) =>{
// 	if(!file.length) throw new Error("User needs to upload one file")

// 	const image = file[0];

// 	const upload = s3.manageUpload({ params: { Key: "/", Body: image } })

// 	const promise = upload.pomise();

// 	promise.then(
// 		(data) => { return data.Location },
// 		(err) =>  { throw err }
// 	)
// }
