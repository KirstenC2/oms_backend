// src/users/dto/user-search.dto.ts
// If you already have a User entity/interface that includes id and name, you can use that.
// Otherwise, define a lightweight DTO for search results.
export class UserSearchDto {
  id: string;
  name: string;
  // Potentially other identifying info like email
  email?: string;
}