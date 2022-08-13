import { AppointmentNetworkClient } from "@monobox/appointment-library";

export const apiNetworkClient = new AppointmentNetworkClient(import.meta.env.VITE_API_SERVICE_URL);
