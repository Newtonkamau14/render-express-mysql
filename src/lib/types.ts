import { z } from "zod";
import MessageResponse from "../interfaces/MessageResponse";

export const UserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  password: z.string().min(3),
  qrCode: z.string().nullish(),
  createdAt: z.date().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

export type UserWithId = UserType & { id: number };
export type CreateUserResponse = MessageResponse & { user: UserWithId };
export type GetUsersResponse = { users: UserWithId[] };
export type GetUserWithIdResponse = {
  user: Omit<UserWithId, "qrCode" | "createdAt">;
};

export type UserId = Readonly<{ id: string }>;

export type UpdateUserBody = Omit<UserType, "qrCode" | "createdAt">;

export type UpdateUserResponse = MessageResponse & { userExists: UserType };

export type GetUserQrCodeResponse = MessageResponse & Pick<UserType, "qrCode">;

export type ApiResponse<T> = {
  message: string,
  data: T
}
