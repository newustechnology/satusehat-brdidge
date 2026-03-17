import { redisClient } from "./lib/redis";
import { ResourceService } from "./service/resoruce/resource.service";
import { SatuSehatError } from "./types/globalErrorModule";

import dotenv from "dotenv";
dotenv.config();

const resorce = new ResourceService(
  {
    client_id: process.env.CLIENT_ID || "",
    client_secret: process.env.CLIENT_SECRET || "",
    module: "sandbox",
  },
  redisClient,
);

async function locationBy() {
  try {
    const org = await resorce.location.searchLocationBy(
      {
        organization: process.env.ORG_ID || "",
      },
      "organization",
    );

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}
async function locationById() {
  try {
    const org = await resorce.location.getById(
      "9e0d0581-f330-40bb-8e57-8a38b404b28b",
    );

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}

async function practisionerBy() {
  try {
    const org = await resorce.practisioner.searchPractisionerBy(
      {
        nik: "7209061211900001",
      },
      "nik",
    );

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}

async function callEndpoint() {
  try {
    const org = await resorce.callEndpoint(
      "https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1/Practitioner/923e0393-1a90-400c-b4d6-7084727f2b71",
      "GET",
      undefined,
      undefined,
    );

    console.log(org.data);

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}

callEndpoint().finally(() => {
  console.log("Closing Redis connection...");
  redisClient.quit();
});
