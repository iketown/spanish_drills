interface Bucket {
  bucket_id: string;
  title: string;
  phrases: {
    [phrase_id: string]: {
      included: boolean;
    };
  };
}
