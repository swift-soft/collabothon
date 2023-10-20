import { Database } from "./database.types";

export type RPCResult =
  | {
      error: string;
    }
  | {
      success: boolean;
    };

export type User = Database["public"]["Tables"]["users"]["Row"];
export type UserProfile = Database["public"]["Views"]["user_profile"]["Row"];
