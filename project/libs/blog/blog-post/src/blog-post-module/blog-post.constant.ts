import { SortDirection } from '@project/shared/core';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_DIRECTION = SortDirection.Desc;
export const DEFAULT_PAGE_COUNT = 1;

export const BlogPostResponseMessages = {
    PostCreated: 'The post was created',
    AuthFailed: 'Authentication failed',
    ServerError: 'Internal server error',
} as const;