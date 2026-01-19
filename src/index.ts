import { redisClient } from "./lib/redis";
import { ResourceService } from "./service/resoruce/resourceService";
import { SatuSehatError } from "./types/globalErrorModule";

const resorce = new ResourceService(
  {
    client_id: "_test_client_id_",
    client_secret: "_test_client_secret_",
    module: "sandbox",
  },
  redisClient,
);

// cek organization
async function cekOrganization() {
  const org = await resorce.organization.serchOrganizationBy({
    partOf: "ed35f0b4-3a9b-440e-878c-dddc2613c431",
  });

  console.log(JSON.stringify(org, null, 2));
}

// cekOrganization();

async function getOrganizationById() {
  try {
    const org = await resorce.organization.getById(
      "ed35f0b4-3a9b-440e-878c-dddc2613c43",
    );

    console.log(JSON.stringify(org, null, 2));
  } catch (error) {
    if (error instanceof SatuSehatError) {
      console.error("Error:", error.message);
    }
  }
}

getOrganizationById();
