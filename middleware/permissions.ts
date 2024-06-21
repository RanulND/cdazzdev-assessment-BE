import { Response } from "express";
import { errorResponse } from "../utils/responses";
import { UserRequest, authUser } from "../utils/types/userRequest";

interface Permissons {
    ADMIN:  Array<string>,
    USER:  Array<string>
}
export const permissions: Permissons = {
    ADMIN: [],
    USER: [],
};

exports.authorize = (permission: string) => {
    return (req: UserRequest, res: Response, next: () => {}) => {
        try {
            const user = req.userData as authUser
            const role = user.role;
            if ((permissions as any)[role].includes(permission)) {
                next();
            } else {
                return errorResponse(res, "Permission Denied", 403);
            }
        } catch (_) {
            return errorResponse(res, "Permission Denied", 403);
        }
    };
};
