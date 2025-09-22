import axios from "axios";
import { protectedApi } from "./api";
import { emailSyncPayload } from "@/types";

export const transactionService = {
  syncTransactions: (payload: emailSyncPayload) => {
    return protectedApi.post(import.meta.env.VITE_API_EMAIL_SYNC_URL, payload);
  },
};
