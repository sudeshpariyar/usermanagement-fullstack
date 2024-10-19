import { IAuthUser, RolesEnum } from "../types/auth.types";
import axiosInstance from "../utils/axiosInstance";

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization =
      "Bearer " + accessToken;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const getSession = () => {
  return localStorage.getItem("accessToken");
};

export const allAccessRolles = [
  RolesEnum.ADMIN,
  RolesEnum.ADMIN,
  RolesEnum.MANAGER,
  RolesEnum.USER,
];

export const managerAccessRoles = [
  RolesEnum.OWNER,
  RolesEnum.ADMIN,
  RolesEnum.MANAGER,
];

export const adminAccessRoles = [RolesEnum.OWNER, RolesEnum.ADMIN];
export const ownerAccessRoles = [RolesEnum.OWNER];

export const allowedRolesForUpdateArray = (
  loggedInUser?: IAuthUser
): string[] => {
  return loggedInUser?.roles.includes(RolesEnum.OWNER)
    ? [RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER]
    : [RolesEnum.MANAGER, RolesEnum.USER];
};

export const isAuthorizedForUpdateRole = (
  loggedInUser: string,
  selectedUserRole: string
) => {
  let result = true;
  if (
    loggedInUser === RolesEnum.OWNER &&
    selectedUserRole === RolesEnum.OWNER
  ) {
    result = false;
  } else if (
    loggedInUser === RolesEnum.ADMIN &&
    (selectedUserRole === RolesEnum.OWNER ||
      selectedUserRole === RolesEnum.ADMIN)
  ) {
    result = false;
  }
  return result;
};
