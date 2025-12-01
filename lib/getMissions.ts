import { sanityClient } from "./sanity.client";
import { missionsQuery } from "./sanity.queries";
import type { Mission } from "@/components/mission/MissionDetailCard";
import type { Language } from "@/lib/language";

export async function getMissions(lang: Language): Promise<Mission[]> {
  try {
    const data = await sanityClient.fetch<Mission[] | null>(missionsQuery, { lang });
    return data ?? [];
  } catch (error) {
    console.warn("Failed to fetch missions", error);
    return [];
  }
}
