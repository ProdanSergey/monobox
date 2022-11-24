import { AppointmentNetworkClient } from "@monobox/appointment-frontend";

export const networkService = new AppointmentNetworkClient(import.meta.env.VITE_API_SERVICE_URL);
