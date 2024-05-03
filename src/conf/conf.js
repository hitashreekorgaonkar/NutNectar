const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteAddressesCollectionId: String(
    import.meta.env.VITE_APPWRITE_ADDRESSES_COLLECTION_ID
  ),
  appwriteCartCollectionId: String(
    import.meta.env.VITE_APPWRITE_CART_COLLECTION_ID
  ),
  appwriteOrdersCollectionId: String(
    import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  appwriteSecretKey: String(import.meta.env.VITE_APPWRITE_SECRET_KEY),
};

export default conf;
