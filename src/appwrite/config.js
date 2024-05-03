import conf from "../conf/conf.js";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getProduct(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getProduct :: error", error);
      return false;
    }
  }

  async getProducts(queries = [Query.equal("status", "available")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async findMany(userId, productid) {
    // console.log("userId, productid", userId, productid);
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        [Query.equal("userId", userId), Query.equal("productid", productid)]
      );
    } catch (error) {
      console.log("Appwrite service :: findMany :: error", error);
      return false;
    }
  }

  async getCart(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        [Query.equal("userId", userId), Query.equal("ordered", false)]
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;
    }
  }

  async getAddresses(userId) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteAddressesCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("Appwrite service :: getAddresses :: error", error);
      return false;
    }
  }

  async getAddress(id) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAddressesCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getAddress :: error", error);
      return false;
    }
  }
  async addToCart({ productid, userId, quantity }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        ID.unique(),
        {
          userId: userId,
          productid: productid,
          product: productid,
          quantity: quantity,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: addToCart :: error", error);
    }
  }

  async addOrder({ userId, cartTotal, addressId, cartsId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteOrdersCollectionId,
        ID.unique(),
        {
          userId: userId,
          cartTotal: cartTotal,
          addressId: addressId,
          cartsId: cartsId,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: addToCart :: error", error);
    }
  }

  async addAddress({
    houseFloor,
    building,
    landmark,
    city,
    pincode,
    state,
    userId,
  }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAddressesCollectionId,
        ID.unique(),
        {
          houseFloor,
          building,
          landmark,
          city,
          pincode,
          state,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: addAddress :: error", error);
    }
  }

  async updateToCart(documentId, { quantity }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        documentId,
        {
          quantity,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: updateToCart :: error", error);
    }
  }

  async updateCartOrderStatus(documentId) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        documentId,
        {
          ordered: true,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: updateCart Order Status :: error", error);
    }
  }

  async updateAddress(
    documentId,
    { houseFloor, building, landmark, city, pincode, state, userId }
  ) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAddressesCollectionId,
        documentId,
        {
          houseFloor,
          building,
          landmark,
          city,
          pincode,
          state,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite sevice :: updateAddress :: error", error);
    }
  }

  async deleteAddress(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteAddressesCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite sevice :: appwrite Address :: error", error);
    }
  }

  async delete(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite sevice :: delete cart product :: error", error);
    }
  }

  async deleteAll(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwrite service :: deleteAll :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
