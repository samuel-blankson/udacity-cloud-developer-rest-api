export const config = {
  // "dev": {
  //   "username": "alxuser",
  //   "password": "rootroot",
  //   "database": "alxdatabase",
  //   "host": "alxdatabase.cl7dfryugjxb.us-east-1.rds.amazonaws.com",
  //   "dialect": "postgres",
  //   "aws_region": "us-east-1",
  //   "aws_profile": "default",
  //   "aws_media_bucket": "alxdatabase"
  // },
  "dev": {
    "username": process.env.POSTGRES_USERNAME,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": "postgres",
    "aws_region": process.env.AWS_REGION,
    "aws_profile": process.env.AWS_PROFILE,
    "aws_media_bucket": process.env.AWS_MEDIA_BUCKET
  },
  "jwt": {
    // "secret": " rootrottorrfjrljnjvldfjvljdfnlcndlcjdlncjnldjcnjncd"
    "secret": process.env.SECRET
  },
  "prod": {
    "username": "",
    "password": "",
    "database": "udagram_prod",
    "host": "",
    "dialect": "postgres"
  }
}
