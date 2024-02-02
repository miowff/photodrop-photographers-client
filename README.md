# Get all photographers albums

Should return array of albums with type:

{
id: string;
title: string;
location: string;
}

# Create new album

Should return album with type:

{
id: string;
title: string;
location: string;
}

# Upload photos

Sends request to backend request

PhotoData {
name: string;
type: string;
}

RequestLinks {
photosData: PhotoData[];
albumId: string;
}

Awaits from backend array of preSigned urls
PresignedUrl {
url: string;
fields: Fields;
}

Fields {
Key: string;
ContentType: string;
bucket: string;
"X-Amz-Algorithm": string;
"X-Amz-Credential": string;
"X-Amz-Date": string;
"X-Amz-Security-Token": string;
Policy: string;
"X-Amz-Signature": string;
}

# Attach users to photo

Sends to backend request with type export interface AttachUsersToPhoto 

{
  albumId: string;
  userPhotoMap: string;
}


# Get Available numbers

awaits from backend array of strings with client numbers
{
   string[]
}