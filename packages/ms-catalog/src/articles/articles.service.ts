import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/Article.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // POST - +1 Article
  create(createArticleDto: Article) {
    const article = this.articleRepository.create(createArticleDto);
    return this.articleRepository.save(article);
  }

  // GET - All Articles
  findAll() {
    return this.articleRepository.find();
  }

  // GET - 1 Article by ID
  findOne(id: string) {
    return this.articleRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // PATCH - 1 Article by ID
  async update(id: string, updateArticleDto: Partial<Article>) {
    await this.articleRepository.update(id, updateArticleDto);
    return this.articleRepository.findOne({
      where: { id: id as unknown as ObjectId },
    });
  }

  // DELETE - 1 Article by ID
  remove(id: string) {
    return this.articleRepository.delete(id);
  }
}
