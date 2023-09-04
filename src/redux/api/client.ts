import { BASE_API_URL } from '@/constant';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const client = fetchBaseQuery({
  baseUrl: BASE_API_URL,
});
