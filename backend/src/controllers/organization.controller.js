import organizationModel from "../model/organization.model.js";

export async function createOrganization(req, res) {
  const { name, code } = req.body;

  if (!name || !code) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  const organizationName = name.trim();
  const organizationCode = code.trim().toUpperCase();

  try {
    const existingOrganization = await organizationModel.findOne({
      $or: [{ code: organizationCode }, { name: organizationName }],
    });
    if (existingOrganization) {
      return res.status(400).json({
        success: false,
        message: "Organization already exists.",
      });
    }

    const organization = await organizationModel.create({
      name: organizationName,
      code: organizationCode,
    });

    return res.status(201).json({
      success: true,
      message: "Organization Created Successfully!",
      organization,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
}

export async function getOrganizations(req, res) {
  try {
    const organizations = await organizationModel.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      organizations,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error!",
    });
  }
}
