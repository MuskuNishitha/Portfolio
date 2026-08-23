import * as adminController from "@/controllers/adminController";
import * as contactController from "@/controllers/contactController";
import * as experienceController from "@/controllers/experienceController";
import * as optimizeController from "@/controllers/optimizeController";
import * as profileController from "@/controllers/profileController";
import * as skillController from "@/controllers/skillController";
import * as workController from "@/controllers/workController";
import adminAuth from "@/middlewares/adminAuth";
import dbConnect from "@/lib/mongodb";
import { runExpressController, runExpressPipeline } from "@/lib/expressAdapter";

function jsonError(message, status = 404) {
  return Response.json({ success: false, message }, { status });
}

function routeFor(path, method) {
  const parts = path.filter(Boolean);
  const key = parts.join("/");
  const id = parts[parts.length - 1];

  if (parts[0] === "contacts") {
    if (key === "contacts" && method === "GET") return [contactController.getAllContacts, {}];
    if ((key === "contacts/new" || key === "contacts/new_gmail") && method === "POST") return [contactController.createContactMail, {}];
    if (key === "contacts/search" && method === "GET") return [contactController.searchContacts, {}];
    if (parts.length === 2) {
      if (method === "GET") return [contactController.getContactById, { id }];
      if (method === "PATCH") return [contactController.updateContactStatus, { id }];
      if (method === "DELETE") return [contactController.deleteContact, { id }];
    }
    return null;
  }
  if (parts[0] === "works") {
    if (key === "works") return method === "GET" ? [workController.getWorks, {}] : method === "POST" ? [workController.createWork, {}] : null;
    if (key === "works/categories/all" && method === "GET") return [workController.getCategories, {}];
    if (key === "works/tech-stacks/all" && method === "GET") return [workController.getTechStacks, {}];
    if (parts[1] === "category" && parts.length === 3 && method === "GET") return [workController.getWorksByCategory, { category: parts[2] }];
    if (parts[1] === "search" && parts.length === 3 && method === "GET") return [workController.searchWorks, { query: parts[2] }];
    if (parts.length === 2) {
      if (method === "GET") return [workController.getWorkById, { id }];
      if (method === "PUT") return [workController.updateWork, { id }];
      if (method === "DELETE") return [workController.deleteWork, { id }];
    }
  }
  if (parts[0] === "skills") {
    if (key === "skills" && method === "GET") return [skillController.getAllSkills, {}];
    if (key === "skills" && method === "POST") return [skillController.createSkillCategory, {}];
    if (key === "skills/categories/list" && method === "GET") return [skillController.getAllCategories, {}];
    if (parts[1] === "category" && parts.length === 3 && method === "GET") return [skillController.getSkillsByCategory, { categoryName: parts[2] }];
    if (parts.length === 2) {
      if (method === "GET") return [skillController.getSkillCategory, { id }];
      if (method === "PUT") return [skillController.updateSkillCategory, { id }];
      if (method === "DELETE") return [skillController.deleteSkillCategory, { id }];
      if (method === "POST") return [skillController.addSkillToCategory, { id }];
    }
    if (parts.length === 4 && parts[2] === "skills") {
      if (method === "PUT") return [skillController.updateSkillInCategory, { categoryId: parts[1], skillId: parts[3] }];
      if (method === "DELETE") return [skillController.deleteSkillFromCategory, { categoryId: parts[1], skillId: parts[3] }];
    }
  }
  if (parts[0] === "profiles") {
    if (key === "profiles") return method === "GET" ? [profileController.getProfiles, {}] : method === "POST" ? [profileController.createProfile, {}] : null;
    if (key === "profiles/main" && method === "GET") return [profileController.getMainProfile, {}];
    if (key === "profiles/search" && method === "GET") return [profileController.searchProfiles, {}];
    if (key === "profiles/stats" && method === "GET") return [profileController.getProfileStats, {}];
    if (key === "profiles/profile") return method === "GET" ? [profileController.getMainProfile, {}] : method === "PUT" ? [profileController.updateMainProfile, {}] : null;
    if (parts.length === 2) {
      if (method === "GET") return [profileController.getProfile, { id }];
      if (method === "PUT") return [profileController.updateProfile, { id }];
      if (method === "PATCH") return [profileController.partialUpdateProfile, { id }];
      if (method === "DELETE") return [profileController.deleteProfile, { id }];
    }
  }
  if (parts[0] === "experiences") {
    if (key === "experiences") return method === "GET" ? [experienceController.getExperiences, {}] : method === "POST" ? [experienceController.createExperience, {}] : null;
    if (key === "experiences/current" && method === "GET") return [experienceController.getCurrentExperiences, {}];
    if (parts[1] === "type" && parts.length === 3 && method === "GET") return [experienceController.getExperiencesByType, { type: parts[2] }];
    if (parts.length === 2) {
      if (method === "GET") return [experienceController.getExperience, { id }];
      if (method === "PUT") return [experienceController.updateExperience, { id }];
      if (method === "DELETE") return [experienceController.deleteExperience, { id }];
    }
  }
  if (parts[0] === "admin") {
    if (key === "admin/register" && method === "POST") return [adminController.registerAdmin, {}];
    if (key === "admin/login" && method === "POST") return [adminController.loginAdmin, {}];
    if (key === "admin/profile") return method === "GET" ? [adminController.getProfile, {}, true] : method === "PUT" ? [adminController.updateProfile, {}, true] : null;
    if (key === "admin/change-password" && method === "PUT") return [adminController.changePassword, {}, true];
    if (key === "admin" && method === "GET") return [adminController.getAllAdmins, {}];
    if (parts.length === 2) {
      if (method === "GET") return [adminController.getAdminById, { id }];
      if (method === "PUT") return [adminController.updateAdmin, { id }];
      if (method === "DELETE") return [adminController.deleteAdmin, { id }];
    }
  }
  if ((key === "optimize/optimize" || key === "optimize") && method === "POST") return [optimizeController.optimizeCode, {}];
  return null;
}

export async function GET(request, context) {
  return dispatch(request, context);
}
export async function POST(request, context) {
  return dispatch(request, context);
}
export async function PUT(request, context) {
  return dispatch(request, context);
}
export async function PATCH(request, context) {
  return dispatch(request, context);
}
export async function DELETE(request, context) {
  return dispatch(request, context);
}

async function dispatch(request, context) {
  const params = await context.params;
  const match = routeFor(params.path || [], request.method);
  if (!match) return jsonError("Route not found", 404);
  const [controller, routeParams, protectedRoute] = match;
  if (controller !== optimizeController.optimizeCode) await dbConnect();
  return protectedRoute
    ? runExpressPipeline([adminAuth], controller, request, routeParams)
    : runExpressController(controller, request, routeParams);
}
