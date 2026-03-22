export const GET_PERSONAL_INFO_QUERY = `
query GetPersonalInfo {
  allPersonalInfo {
    professionalSummary
    telephone
    email
    experience {
      title
      description
      year
    }
  }
}`;
