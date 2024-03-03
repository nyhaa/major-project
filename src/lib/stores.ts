import { derived, writable } from "svelte/store";

export const cities = ["kathmandu"]

export const city = writable("kathmandu");
export const commandMenuOpened = writable(false);
