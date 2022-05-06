interface Bucket {
  id: string;
  title: string;
  bucket_id: string;
  phrases: {
    [phrase_id: string]: {
      included: boolean;
    };
  };
}
