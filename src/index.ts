import { redisClient } from "./lib/redis";
import { ResourceService } from "./service/resoruce/resourceService";
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
      console.error("Error:", error.toJSON());
    }
  }
}

getOrganizationById();
