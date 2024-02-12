export interface PresignedUrl {
  url: string;
  realName: string;
  post: {
    fields: Fields;
    url: string;
  };
}

interface Fields {
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
