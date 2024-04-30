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
      console.log("Appwrite service :: getPost :: error", error);
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

  async getCart() {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCartCollectionId
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
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
}

const service = new Service();
export default service;
