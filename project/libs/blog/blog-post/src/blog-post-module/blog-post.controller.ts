import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    UseInterceptors
  } from '@nestjs/common';
  import { PostContentRequestTransform } from './interceptors/post-content-request-transform.interceptor';
  import { fillDto } from '@project/helpers';  
  import { BlogPostService } from './blog-post.service';
  import { BlogPostRdo } from './rdo/blog-post.rdo';
  import { BlogPostQuery } from './blog-post.query';
  import { BlogPostWithPaginationRdo } from './rdo/blog-post-with-pagination.rdo';
  import { CreatePostDto } from './dto/create-post.dto';
  import { UpdatePostDto } from './dto/update-post.dto';
  import {
    BlogCommentService,
    CommentRdo,
    CreateCommentDto,
  } from '@project/blog-comment';
  import { ApiResponse, ApiTags } from '@nestjs/swagger';
  import { BlogPostResponseMessages } from './blog-post.constant';
  
  @ApiTags('posts')
  @Controller('posts')
  export class BlogPostController {
    constructor(private readonly blogPostService: BlogPostService, private readonly blogCommentService: BlogCommentService) {}
  
    @Get('/:id')
    public async show(@Param('id') id: string) {
      const post = await this.blogPostService.getPost(id);
      return fillDto(BlogPostRdo, post.toPOJO());
    }
  
    @Get('/')
    public async index(@Query() query: BlogPostQuery) {
      const postsWithPagination = await this.blogPostService.getAllPosts(query);
      const result = {
        ...postsWithPagination,
        entities: postsWithPagination.entities.map((post) => post.toPOJO()),
      };
      return fillDto(BlogPostWithPaginationRdo, result);
    }
  
    @ApiResponse({
      type: BlogPostRdo,
      status: HttpStatus.CREATED,
      description: BlogPostResponseMessages.PostCreated,
    })
    @ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: BlogPostResponseMessages.AuthFailed,
    })
    @ApiResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: BlogPostResponseMessages.ServerError,
    })
    @Post('/')
    @UseInterceptors(PostContentRequestTransform)
    public async create(@Body() dto: CreatePostDto) {
      const newPost = await this.blogPostService.createPost(dto);
      return fillDto(BlogPostRdo, newPost.toPOJO());
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param('id') id: string) {
      await this.blogPostService.deletePost(id);
    }
  
    @Patch('/:id')
    @UseInterceptors(PostContentRequestTransform)
    public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
      const updatedPost = await this.blogPostService.updatePost(id, dto);
      return fillDto(BlogPostRdo, updatedPost.toPOJO());
    }

    @Post('/:postId/comments')
    public async createComment(
      @Param('postId') postId: string,
      @Body() dto: CreateCommentDto
    ) {
      const newComment = await this.blogCommentService.createComment(postId, dto);
      return fillDto(CommentRdo, newComment.toPOJO());
    }
  }