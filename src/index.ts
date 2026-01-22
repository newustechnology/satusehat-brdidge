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

// cek organization
async function cekOrganization() {
  const org = await resorce.organization.serchOrganizationBy({
    partOf: process.env.ORG_ID || "",
  });

  console.log(JSON.stringify(org, null, 2));
}

// cekOrganization();

async function getOrganizationById() {
  try {
    const org = await resorce.organization.getById("");

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}

async function searchPatientBy() {
  try {
    const org = await resorce.patient.searchPatientBy(
      {
        nik: "1234567890123456",
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
async function getPatientById() {
  try {
    const org = await resorce.patient.getById(
      "a1e2de99-afd8-4a5c-96d4-0aa6760f25a9",
    );

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", JSON.stringify(error, null, 2));
    }
  }
}

getPatientById().finally(() => {
  console.log("Closing Redis connection...");
  redisClient.quit();
});
// resorce
//   .callEndpoint("RelatedPerson/a1e2de99-afd8-4a5c-96d4-0aa6760f25a9", "GET")
//   .then((response) => {
//     console.log(JSON.stringify(response.data, null, 2));
//   })
//   .finally(() => {
//     console.log("Closing Redis connection...");
//     redisClient.quit();
//   });
