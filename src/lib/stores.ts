import { derived, writable } from "svelte/store";

export const cities: Record<string, [number, number]> = {
  kathmandu: [27.70169, 85.3206],
  lalitpur: [27.67658, 85.31417]
};

export type City = keyof typeof cities;

export const city = writable<City>("kathmandu");
export const latLng = derived(city, ($city) => cities[$city]);

export const commandMenuOpened = writable(false);
