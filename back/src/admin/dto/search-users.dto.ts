// src/users/dto/search-users.dto.ts

export class SearchUsersDto {
  // Define your search criteria fields
  // For example, searching by name, email, etc.
  uid: number;
  name?: string;
  sid?: number;
  role?: string[];
}
