import { graphqlClient } from "@/lib/sanity/client";
import { GET_PERSONAL_INFO_QUERY } from "@/queries/personalInfo";

export type Experience = {
  title: string | null;
  description: string | null;
  year: string | null;
};

export type PersonalInfo = {
  professionalSummary: string | null;
  telephone: string | null;
  email: string | null;
  experience: Experience[] | null;
};

export async function fetchPersonalInfo(): Promise<PersonalInfo | null> {
  const data = await graphqlClient.request(GET_PERSONAL_INFO_QUERY) as any;
  const doc = data.allPersonalInfo?.[0];
  if (!doc) return null;

  return {
    professionalSummary: doc.professionalSummary ?? null,
    telephone: doc.telephone ?? null,
    email: doc.email ?? null,
    experience: doc.experience?.map((e: any) => ({
      title: e.title ?? null,
      description: e.description ?? null,
      year: e.year ?? null,
    })) ?? null,
  };
}
