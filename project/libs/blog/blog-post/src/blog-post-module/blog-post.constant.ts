import { SortDirection, SortType } from '@project/shared/core';

export const BlogPostQueryDefaults = {
  PostCountLimit: 25,
  SortDirection: SortDirection.Desc,
  PageCount: 1,
  SortType: SortType.CreatedAt,
} as const;

export const BlogPostResponseMessages = {
  PostCreated: 'The post was created',
  AuthFailed: 'Authentication failed',
  ServerError: 'Internal server error',
  PostFound: 'Post was found',
  PostNotFound: 'Post was not found',
  LikeAdded: 'Like was added',
  LikeDeleted: 'Like was deleted',
  PostDeleted: 'Post was deleted',
  Forbidden: 'Access denied',
  PostUpdated: 'Post was updated',
  ValidationError: 'Validation error',
  CommentCreated: 'Comment was created',
  CommentsFound: 'Comments were found',
  NotificationsSent: 'Notifications were sent',
} as const;
